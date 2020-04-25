import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import pogo from "https://deno.land/x/pogo/main.js";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import Connection from "./Connection.ts";
import routes from "./routes/index.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const port = Number.parseInt(Deno.args[0]) || 8080;
const conns : {[key: string]: Connection} = {};
async function handleWebsocket(req: ServerRequest) {
  const { headers, conn, url } = req;
  var baseURL = "http://" + headers.get('host') + "/";
  const reqURL = new URL(url, baseURL)
  const reqUuid = reqURL.searchParams.get('uuid')

  try {
    const websocket = await acceptWebSocket({
      conn,
      headers,
      bufReader: req.r,
      bufWriter: req.w,
    });

    if (reqUuid && conns[reqUuid]) {
      console.log('Connection exists', reqUuid)
      conns[reqUuid].setCon(websocket)
    } else {
      console.log("New Connection");
      const newUuid = v4.generate()
      console.log("socket connected!");
      conns[newUuid] = new Connection(newUuid);
      conns[newUuid].setCon(websocket);
    }
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
