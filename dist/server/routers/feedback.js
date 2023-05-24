"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("@/server/prisma");
exports.feedbackRouter = (0, trpc_1.router)({
    list: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        skip: zod_1.z.number().default(0),
    }))
        .query(async ({ ctx, input }) => {
        const feedbacks = await prisma_1.prisma.feedback.findMany({
            take: 10,
            skip: input.skip,
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return feedbacks;
    }),
    create: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        message: zod_1.z.string(),
        mood: zod_1.z.string(),
        isPublic: zod_1.z.boolean().default(false),
    }))
        .mutation(async ({ ctx, input }) => {
        const feedback = await prisma_1.prisma.feedback.create({
            data: {
                userId: ctx.session.user.id,
                message: input.message,
                isPublic: input.isPublic,
                isSolved: false,
                mood: input.mood,
                votes: {},
            },
        });
        return feedback;
    }),
    vote: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        feedbackId: zod_1.z.string().cuid(),
    }))
        .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const { feedbackId } = input;
        const vote = await prisma_1.prisma.feedbackVote.create({
            data: {
                feedbackId,
                userId,
            },
        });
        return vote;
    }),
});
