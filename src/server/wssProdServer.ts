import dotenv from "dotenv";
import {createContext} from "./context";
import {appRouter} from "./routers/_app";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import http from "http";
import next from "next";
import {parse} from "url";
import ws from "ws";
import ee from "@/server/eventEmitter";
import {USER_CONNECTED, USER_DISCONNECTED} from "@/server/constants/events";

dotenv.config({
  path: "../.env",
});

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const proto = req.headers["x-forwarded-proto"];
    if (proto && proto === "http") {
      // redirect to ssl
      res.writeHead(303, {
        location: `https://` + req.headers.host + (req.headers.url ?? ""),
      });
      res.end();
      return;
    }
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });
  const wss = new ws.Server({ server });
  const handler = applyWSSHandler({ wss, router: appRouter, createContext });

  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
  });
  server.listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );

  wss.on("connection", (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ee.emit(USER_CONNECTED, wss.clients.size);
    (process as any).wssClientsSize = wss.clients.size;
    ws.once("close", () => {
      ee.emit(USER_DISCONNECTED, wss.clients.size);
      (process as any).wssClientsSize = wss.clients.size;
      console.log(`➖➖ Connection (${wss.clients.size})`);
    });
  });
});
