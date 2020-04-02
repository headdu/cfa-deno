import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket
} from "https://deno.land/std/ws/mod.ts";
import Connection from "./Connection.ts";


const conns = []
/** websocket echo server */
const port = Deno.args[0] || "8080";
console.log(`websocket server is running on :${port}`);
for await (const req of serve(`:${port}`)) {
  const { headers, conn } = req;
  acceptWebSocket({
    conn,
    headers,
    bufReader: req.r,
    bufWriter: req.w
  })
    .then(
      async (sock: WebSocket): Promise<void> => {
        console.log("socket connected!");
        new Connection(sock);
      }
    )
    .catch((err: Error): void => {
      console.error(`failed to accept websocket: ${err}`);
    });
}
