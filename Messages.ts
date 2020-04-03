export interface CreateMessage {
  type:
    | "create"
    | "createSuccess"
    | "joinSuccess"
    | "joinError"
    | "sync"
    | "ping"
    | "shareConfig";
}

export interface JoinMessage {
  type: 'join';
  uuid: string;
}

export interface Message {type: string}

/*
  {"type":"create"}
  {"type":"join", "uuid":""}
*/