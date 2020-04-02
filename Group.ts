import { WebSocket } from "https://deno.land/std/ws/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts";

export default class Group {
  public uuid: string
  private memberCons: WebSocket[] = []
  private adminCon: WebSocket

  constructor(adminCon: WebSocket) {
    this.uuid = v4.generate()
    this.adminCon = adminCon
  }

  public getUuid() {
    return this.uuid
  }

  public addMember(conn: WebSocket) {
    this.memberCons = [...this.memberCons, conn]
  }

  public broadcast(message: string) { 
    this.memberCons.forEach((con) => {
      con.send(message)
    })
    this.adminCon.send(message)
  }
}