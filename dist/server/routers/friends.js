"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("@/server/prisma");
exports.friendsRouter = (0, trpc_1.router)({
    list: trpc_1.protectedProcedure.query(async ({ ctx, }) => {
        const userId = ctx.session.user.id;
        const following = await prisma_1.prisma.follows.findMany({
            where: {
                followerId: userId,
            },
            include: {
                following: {
                    select: {
                        experience: true,
                        name: true,
                        image: true,
                        friendCode: true,
                    },
                },
            },
        });
        return following; // TODO: type
    }),
    add: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        followingId: zod_1.z.string().cuid(),
    }))
        .mutation(async ({ ctx, input }) => {
        const followerId = ctx.session.user.id;
        const { followingId } = input;
        return await prisma_1.prisma.follows.create({
            data: {
                followerId,
                followingId,
            },
        });
    }),
    lookup: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string().optional(),
        friendCode: zod_1.z.string().optional(),
    }))
        .query(async ({ ctx, input }) => {
        const { name, friendCode } = input;
        const query = {
            where: {},
            select: {
                id: true,
                experience: true,
                name: true,
                friendCode: true,
                image: true,
            },
            take: 20,
        };
        if (name) {
            query.where.name = {
                contains: name,
            };
        }
        if (friendCode) {
            query.where.friendCode = parseInt(friendCode);
        }
        return await prisma_1.prisma.user.findMany(query);
    }),
});
