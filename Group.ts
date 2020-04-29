import { WebSocket } from "https://deno.land/std@v0.41.0/ws/mod.ts";
import Timer from "./lib/Timer.ts";
let counter = 1;
export default class Group {
  public uuid: string;
  private memberCons: WebSocket[] = [];
  private adminCon: WebSocket;
  private currentTimer?: Timer;
  private leaderBoard: {[key: string]: {name: string, score: number}} = {}

  constructor(adminCon: WebSocket) {
    this.uuid = ++counter + "";
    this.adminCon = adminCon;
  }

  public getUuid() {
    return this.uuid;
  }

  public addMember(conn: WebSocket) {
    this.memberCons = [...this.memberCons, conn];
    this.broadcast(
      JSON.stringify({
        type: "addMember",
        members: this.memberCons.length,
      })
    );

    this.syncExistingConfig(conn)

  }

  public broadcast(message: string) {
    this.memberCons.forEach((con) => {
      con.send(message);
    });
    this.adminCon.send(message);

    const parsedMessage = JSON.parse(message)

    if (parsedMessage.type === 'config') {
      if (this.currentTimer?.status !== 'COMPLETE') {
        this.currentTimer?.end()
      }
      console.log('Starting new Timer')
      this.currentTimer = new Timer(parsedMessage.config)
    }
  }

  public resyncAfterAdminReconnect(config: any, currentRound: number) {
    // this.config = config;
    // this.currentRound = currentRound;
    // this.lastSyncDate = new Date().toISOString();
  }

  public async close() {
    const message = JSON.stringify({ type: "closeGroup" });
    await this.memberCons.forEach(async (con) => {
      await con.send(message);
    });
    this.memberCons = [];
    delete this.adminCon;
    delete this.uuid;
  }

  public leave(leavingCon: WebSocket) {
    this.memberCons = this.memberCons.filter((con) => con !== leavingCon);
    this.broadcast(
      JSON.stringify({
        type: "leaveMember",
        members: this.memberCons.length,
      })
    );
  }

  public assumeLeadership(newAdmin: WebSocket) {
    this.adminCon = newAdmin
    
    this.syncExistingConfig(newAdmin)
    
  }

  public updateLeaderboard(uuid: string, name: string, score: number) {
    this.leaderBoard[uuid] = {name, score}
    this.broadcast(this.getLeaderboardMessage())
  }

  public getLeaderboardMessage() {
    return JSON.stringify({
      type: "currentLeaderboard",
      leaderboard: Object.values(this.leaderBoard)
    })
  }

  public clearLeaderboard() {
    this.leaderBoard = {}
    this.broadcast(this.getLeaderboardMessage())
  }

  private syncExistingConfig(conn: WebSocket) {
    if (this.currentTimer && this.currentTimer.status === 'ONGOING') {
      const infoToSend = {
        type: "syncExistingConfig",
        ...this.currentTimer.getCurrentState(),
        members: this.memberCons.length,
        currentDate: Date.now(),
      };
      console.log(JSON.stringify(infoToSend))
      conn.send(
        JSON.stringify(infoToSend)
      );
    }
  }
}
