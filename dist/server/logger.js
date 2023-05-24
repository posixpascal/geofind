"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
// create pino logger
const logger = (0, pino_1.default)({
    browser: {
        transmit: {
            level: "info",
            send: (level, logEvent) => {
                const msg = logEvent.messages[0];
                const headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    type: "application/json",
                };
                let blob = new Blob([JSON.stringify({ msg, level })], headers);
                navigator.sendBeacon(`/log`, blob);
            },
        },
    },
    level: "debug",
    base: {
        env: process.env.NODE_ENV,
    },
});
exports.default = logger;
