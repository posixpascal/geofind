"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// @ts-ignore
const env_1 = require("./env");
// @ts-ignore
const client_1 = require("@prisma/client");
const prismaGlobal = global;
exports.prisma = prismaGlobal.prisma || new client_1.PrismaClient();
// {
//     log:
//         env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
// }
if (env_1.env.NODE_ENV !== "production") {
    prismaGlobal.prisma = exports.prisma;
}
