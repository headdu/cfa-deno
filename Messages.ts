export interface CreateMessage {
  type:
    | "create"
    | "createSuccess"
    | "joinSuccess"
    | "joinError"
    | "sync"
    | "ping"
    | "shareConfig"
    | "addMember"
    | "leaveMember";
  name?: string;
}

export interface ScoreMessage {
  type: "updateLeaderboard";
  score: number;
}

export interface JoinMessage {
  type: "join";
  uuid: string;
  name?: string;
}

export interface ResyncMessage {
  type: "resyncAfterAdminReconnect";
  config: any;
  currentRound: number;
}

export interface Message {
  type: string;
}

/*
  {"type":"create"}
  {"type":"join", "uuid":""}
*/
