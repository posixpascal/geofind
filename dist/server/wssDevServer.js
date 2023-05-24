"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const _app_1 = require("./routers/_app");
const ws_1 = require("@trpc/server/adapters/ws");
const node_fetch_1 = __importDefault(require("node-fetch"));
const ws_2 = __importDefault(require("ws"));
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
if (!global.fetch) {
    global.fetch = node_fetch_1.default;
}
const wss = new ws_2.default.Server({
    port: 3001,
});
const handler = (0, ws_1.applyWSSHandler)({ wss, router: _app_1.appRouter, createContext: context_1.createContext });
wss.on("connection", (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    eventEmitter_1.default.emit(events_1.USER_CONNECTED, wss.clients.size);
    process.wssClientsSize = wss.clients.size;
    ws.once("close", () => {
        eventEmitter_1.default.emit(events_1.USER_DISCONNECTED, wss.clients.size);
        process.wssClientsSize = wss.clients.size;
        console.log(`➖➖ Connection (${wss.clients.size})`);
    });
});
console.log("✅ WebSocket Server listening on ws://localhost:3001");
process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
    wss.close();
});
