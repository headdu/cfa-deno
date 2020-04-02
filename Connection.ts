import {
  WebSocket,
  isWebSocketPingEvent,
  isWebSocketCloseEvent
} from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { CreateMessage, JoinMessage } from "./Messages.ts";
import GroupManager from "./GroupManager.ts";

export default class Connection {
  public uuid: string;
  private con: WebSocket;
  private myGroup?: string;

  constructor(con: WebSocket) {
    this.uuid = v4.generate();
    this.con = con;
    this.manageMessages();
  }

  private createGroup() {
    this.myGroup = GroupManager.createNewGroup(this.con);
  }

  private joinGroup(uuid: string) {
    return GroupManager.joinGroup(uuid, this.con);
  }

  private broadcast(message: string) {
    if (this.myGroup) {
      GroupManager.broadcast(this.myGroup, message);
    }
  }

  private async manageMessages() {
    const it = this.con.receive();

    while (true) {
      try {
        const { done, value } = await it.next();
        if (done) {
          break;
        }
        const ev = value;
        if (typeof ev === "string") {
          const obj: JoinMessage | CreateMessage = JSON.parse(ev);
          let response = {};
          if (obj.type) {
            switch (obj.type) {
              case "create":
                this.createGroup();
                response = {
                  type: "createSuccess",
                  uuid: this.myGroup
                };
                break;
              case "join":
                const result = this.joinGroup(obj.uuid);
                if (result) {
                  response = { type: "joinSuccess", uuid: obj.uuid };
                } else {
                  response = { type: "joinError" };
                }
                break;
              default:
                this.broadcast(ev);
                break;
            }
          }
          await this.con.send(JSON.stringify(response))
        } else if (isWebSocketPingEvent(ev)) {
          const [, body] = ev;
          // ping
          console.log("ws:Ping", body);
        } else if (isWebSocketCloseEvent(ev)) {
          // close
          const { code, reason } = ev;
          console.log("ws:Close", code, reason);
        }
      } catch (e) {
        console.error(`failed to receive frame: ${e}`);
        await this.con.close(1000).catch(console.error);
      }
    }
  }
}
