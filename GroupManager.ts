import Group from "./Group.ts";
import { WebSocket } from "./deps.ts"
class GroupManager {
  private groupMap = new Map<string, Group>();

  public createNewGroup(con: WebSocket): string {
    const newGroup = new Group(con);
    const uuid = newGroup.getUuid();
    this.groupMap.set(uuid, newGroup);
    return uuid;
  }

  public joinGroup(uuid: string, con: WebSocket) {
    if (this.groupMap.has(uuid)) {
      const groupToJoin = this.groupMap.get(uuid);
      groupToJoin?.addMember(con);
      return true;
    }
    return false;
  }

  public broadcast(groupUuid: string, message: string) {
    if (this.groupMap.has(groupUuid)) {
      this.groupMap.get(groupUuid)?.broadcast(message);
    }
  }

  public async closeGroup(uuid: string) {
    console.log("Closing group", uuid);
    try {
      await this.groupMap.get(uuid)?.close();
      this.groupMap.delete(uuid);

      console.log(this.groupMap.has(uuid), this.groupMap.get(uuid));
    } catch (err) {
      console.log(err);
    }
  }

  public leaveGroup(uuid: string, conn: WebSocket) {
    this.groupMap.get(uuid)?.leave(conn);
  }

  public assumeLeadership(uuid: string, conn: WebSocket) {
    if (this.groupMap.has(uuid)) {
      console.log("Assuming leadership of", uuid);
      this.groupMap.get(uuid)?.assumeLeadership(conn);
      return true;
    }
    return false;
  }

  public resyncAfterAdminReconnect(
    uuid: string,
    config: any,
    currentRound: number
  ) {
    if (this.groupMap.has(uuid)) {
      this.groupMap.get(uuid)?.resyncAfterAdminReconnect(config, currentRound);
    }
  }

  public updateLeaderboard(groupUuid: string, uuid: string, name: string, score: number) {
    this.groupMap.get(groupUuid)?.updateLeaderboard(uuid, name, score)
  }

  public clearGroupLeaderboard(groupUuid: string) {
    this.groupMap.get(groupUuid)?.clearLeaderboard();
  }
}

export default new GroupManager