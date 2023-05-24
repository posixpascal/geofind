"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpcReact = exports.trpcMsw = void 0;
const msw_trpc_1 = require("msw-trpc");
const react_query_1 = require("@trpc/react-query");
const superjson_1 = __importDefault(require("superjson"));
exports.trpcMsw = (0, msw_trpc_1.createTRPCMsw)({
    transformer: {
        input: superjson_1.default,
        output: superjson_1.default,
    },
});
exports.trpcReact = (0, react_query_1.createTRPCReact)({});
