import { createContext } from "./context";
import { appRouter } from "./routers/_app";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import fetch from "node-fetch";
import ws from "ws";
import ee from "@/server/eventEmitter";
import { USER_CONNECTED, USER_DISCONNECTED } from "@/server/constants/events";

if (!global.fetch) {
  (global as any).fetch = fetch;
}
const wss = new ws.Server({
  port: 3001,
});
const handler = applyWSSHandler({ wss, router: appRouter, createContext });

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
console.log("✅ WebSocket Server listening on ws://localhost:3001");

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
