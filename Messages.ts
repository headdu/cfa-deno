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
    | "leaveMember"
}

export interface JoinMessage {
  type: 'join';
  uuid: string;
  name?: string;
}

export interface Message {type: string}

/*
  {"type":"create"}
  {"type":"join", "uuid":""}
*/