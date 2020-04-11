import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import pogo from "https://deno.land/x/pogo/main.js";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import Connection from "./Connection.ts";
import routes from "./routes/index.ts"
import { config } from "https://deno.land/x/dotenv/dotenv.ts";




const port = Number.parseInt(Deno.args[0]) || 8080;

const conns = [];
const server = pogo.server({ port });

server.route(routes);

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
    conns.push(new Connection(websocket));
  } catch (err) {
    console.error(`failed to accept websocket: ${err}`);
  }
}

async function start() {
  const serverr = serve({
    hostname: "localhost",
    port: port,
  });
  server.raw = serverr;
  for await (const request of serverr) {
    if (acceptable(request)) {
      await handleWebsocket(request);
    }
    server.respond(request);
  }
}
console.log(config().TEST);
await start();
