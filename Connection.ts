import {
  WebSocket,
  isWebSocketPingEvent,
  isWebSocketCloseEvent,
} from "./deps.ts";
import { CreateMessage, JoinMessage, ResyncMessage, ScoreMessage } from "./Messages.ts";
import GroupManager from "./GroupManager.ts";

export default class Connection {
  private uuid: string;
  private con?: WebSocket;
  private myGroup?: string;
  private isAdmin = false;
  private closeGroupTimeout?: number;
  private leaveGroupTimeout?: number;
  private name = 'UNKNOWN'

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  public setCon(con: WebSocket) {
    if (this.closeGroupTimeout) {
      clearTimeout(this.closeGroupTimeout);
      this.closeGroupTimeout = undefined;
    }
    if (this.leaveGroupTimeout) {
      clearTimeout(this.leaveGroupTimeout);
      this.leaveGroupTimeout = undefined;
    }
    this.con = con;
    this.manageMessages();
    this.sendConnectionUuid();
    if (this.myGroup) {
      if (this.isAdmin) {
        if (GroupManager.assumeLeadership(this.myGroup, con)) {
          this.con.send(
            JSON.stringify({
              type: "assumeLeadershipSuccess",
              uuid: this.myGroup,
            })
          );
        }
      } else {
        if (this.joinGroup(this.myGroup)){
          this.con.send(
            JSON.stringify({
              type: "joinSuccess",
              uuid: this.myGroup,
            })
          );
        };
      }
    }
  }

  private createGroup() {
    if (this.con) {
      this.myGroup = GroupManager.createNewGroup(this.con);
    }
  }

  private joinGroup(uuid: string) {
    if (this.con) {
      this.myGroup = uuid;
      return GroupManager.joinGroup(uuid, this.con);
    }
  }

  private broadcast(message: string) {
    if (this.myGroup && this.isAdmin) {
      GroupManager.broadcast(this.myGroup, message);
    }
  }

  private async sendConnectionUuid() {
    if (this.con) {
      await this.con.send(JSON.stringify({ type: "myId", uuid: this.uuid }));
    }
  }

  private tentativelyCloseGroup() {
    console.log("Marking group for closing");
    this.closeGroupTimeout = setTimeout(() => {
      if (this.myGroup) {
        console.log("Closing group after 20 seconds", this.myGroup);
        GroupManager.closeGroup(this.myGroup);
        this.myGroup = "";
      }
    }, 20000);
  }

  private tentativelyLeaveGroup() {
    this.leaveGroupTimeout = setTimeout(() => {
      if (this.myGroup) {
        this.myGroup = "";
      }
    }, 19000);
  }

  private async manageMessages() {
    if (this.con) {
      const it = this.con.receive();

      while (true) {
        try {
          const { done, value } = await it.next();
          if (done) {
            break;
          }
          const ev = value;
          if (typeof ev === "string") {
            const obj:
              | JoinMessage
              | CreateMessage
              | ResyncMessage
              | ScoreMessage = JSON.parse(ev);
            let response = null;
            if (obj.type) {
              switch (obj.type) {
                case "create":
                  this.createGroup();
                  response = {
                    type: "createSuccess",
                    uuid: this.myGroup,
                  };
                  this.isAdmin = true;
                  if (obj.name) {
                    this.name = obj.name
                  }
                  break;
                case "join":
                  const result = this.joinGroup(obj.uuid);
                  if (obj.name) {
                    this.name = obj.name;
                  }
                  if (result) {
                    response = {
                      type: "joinSuccess",
                      uuid: obj.uuid,
                    };
                    this.myGroup = obj.uuid;
                  } else {
                    response = { type: "joinError" };
                  }
                  break;
                case "ping":
                  response = {
                    type: "pong",
                  };
                  break;
                case "resyncAfterAdminReconnect":
                  if (this.myGroup) {
                    GroupManager.resyncAfterAdminReconnect(
                      this.myGroup,
                      obj.config,
                      obj.currentRound
                    );
                  }
                  break;
                case "updateLeaderboard":
                  if (this.myGroup) {
                    GroupManager.updateLeaderboard(
                      this.myGroup,
                      this.uuid,
                      this.name,
                      (obj as ScoreMessage).score
                    )
                  }
                  break;
                case "clearLeaderboard": {
                  if (this.myGroup) {
                    GroupManager.clearGroupLeaderboard(this.myGroup)
                  }
                  break;
                }
                case "closeGroup": {
                  if (this.myGroup) {
                    GroupManager.closeGroup(this.myGroup)
                    this.myGroup = undefined;
                  }
                  break;
                }
                case "userLeaveGroup": {
                  if (this.myGroup) {
                    GroupManager.leaveGroup(this.myGroup, this.con)
                    this.myGroup = undefined;
                  }
                  break;
                }
                default:
                  this.broadcast(ev);
                  break;
              }
            }
            if (response) {
              await this.con.send(JSON.stringify(response));
            }
          } else if (isWebSocketPingEvent(ev)) {
            const [, body] = ev;
            // ping
            console.log("ws:Ping", body);
          } else if (isWebSocketCloseEvent(ev)) {
            const { code, reason } = ev;
            console.log("closing", code, reason);
            if (this.isAdmin && this.myGroup) {
              this.tentativelyCloseGroup();
            } else if (this.myGroup && !this.isAdmin) {
              GroupManager.leaveGroup(this.myGroup, this.con);
              this.tentativelyLeaveGroup();
            }
            break;
          }
        } catch (e) {
          console.error(`failed to receive frame: ${e}`);
          await this.con.close(1000).catch(console.error);
          break;
        }
      }
    }
  }
}
