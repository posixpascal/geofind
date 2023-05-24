"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentUser = void 0;
const trpc_1 = require("@/utils/trpc");
const useCurrentUser = () => {
    const user = trpc_1.trpc.session.user.useQuery();
    return { user };
};
exports.useCurrentUser = useCurrentUser;
