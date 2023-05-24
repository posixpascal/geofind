"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.mergeRouters = exports.middleware = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const superjson_1 = __importDefault(require("superjson"));
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = server_1.initTRPC.context().create({
    errorFormatter({ shape }) {
        return shape;
    },
    transformer: superjson_1.default,
});
// Base router and procedure helpers
/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
exports.router = t.router;
/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
exports.publicProcedure = t.procedure;
/**
 * @see https://trpc.io/docs/v10/middlewares
 */
exports.middleware = t.middleware;
/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
exports.mergeRouters = t.mergeRouters;
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});
/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
exports.protectedProcedure = t.procedure.use(enforceUserIsAuthed);
