import Group from "./Group.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";
class GroupManager {
  private groupMap = new Map<string, Group>()

  public createNewGroup(con: WebSocket): string {
    const newGroup = new Group(con)
    const uuid = newGroup.getUuid();
    this.groupMap.set(uuid, newGroup)
    return uuid
  }

  public joinGroup(uuid: string, con: WebSocket) {
    if (this.groupMap.has(uuid)) {
      const groupToJoin = this.groupMap.get(uuid);
      groupToJoin?.addMember(con)
      return true
    }
    return false
  }

  public broadcast(groupUuid: string, message: string) {
    if (this.groupMap.has(groupUuid)) {
      this.groupMap.get(groupUuid)?.broadcast(message);
    }
  }

  public closeGroup(uuid: string) {
    this.groupMap.get(uuid)?.close()
  }

  
  public leaveGroup(uuid: string, conn: WebSocket) {
    this.groupMap.get(uuid)?.leave(conn)
  }
}

export default new GroupManager