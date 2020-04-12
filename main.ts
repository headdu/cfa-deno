import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import pogo from "https://deno.land/x/pogo/main.js";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import Connection from "./Connection.ts";
import routes from "./routes/index.ts";

const port = Number.parseInt(Deno.args[0]) || 8080;

async function handleWebsocket(req: ServerRequest) {
  const { headers, conn } = req;
  console.log("socket request received");
  try {
    const websocket = await acceptWebSocket({
      conn,
      headers,
      bufReader: req.r,
      bufWriter: req.w,
    });
    console.log("socket connected!");
    new Connection(websocket);
  } catch (err) {
    console.error(`failed to accept websocket: ${err}`);
  }
}

console.log(Deno.env()["TEST"]);

console.log("Port provided", port);
const serverr = serve({
  port: port,
  hostname: "0.0.0.0",
});

const conns = [];
const server = pogo.server({ port, hostname: "0.0.0.0" })

server.route(routes);
server.raw = serverr;
async function start() {
  for await (const request of serverr) {
    if (acceptable(request)) {
      await handleWebsocket(request);
    } else {
      server.respond(request);
    }
  }
}

start();
