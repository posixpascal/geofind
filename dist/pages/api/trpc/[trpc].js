"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpcNext = __importStar(require("@trpc/server/adapters/next"));
const context_1 = require("@/server/context");
const _app_1 = require("@/server/routers/_app");
exports.default = trpcNext.createNextApiHandler({
    router: _app_1.appRouter,
    /**
     * @link https://trpc.io/docs/context
     */
    createContext: context_1.createContext,
    /**
     * @link https://trpc.io/docs/error-handling
     */
    onError({ error }) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
            // send to bug reporting
            console.error("Something went wrong", error);
        }
    },
    /**
     * Enable query batching
     */
    batching: {
        enabled: true,
    },
});
