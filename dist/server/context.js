"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const react_1 = require("next-auth/react");
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
const createContext = async (opts) => {
    var _a, _b;
    const session = await (0, react_1.getSession)(opts);
    console.log("createContext for", (_b = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "unknown user");
    return {
        session,
    };
};
exports.createContext = createContext;
