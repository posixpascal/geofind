import {protectedProcedure, router} from "../trpc";
import {z} from "zod";
import {prisma} from "@/server/prisma";

export const feedbackRouter = router({
    list: protectedProcedure.input(z.object({
        skip: z.number().default(0)
    })).query(async ({ctx, input}) => {
        const feedbacks = await prisma.feedback.findMany({
            take: 10,
            skip: input.skip,
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return feedbacks;
    }),
    create: protectedProcedure.input(
        z.object({
            message: z.string(),
            mood: z.string(),
            isPublic: z.boolean().default(false)
        })
    ).mutation(async ({ctx, input }) => {
        const feedback = await prisma.feedback.create({
            data: {
                userId: ctx.session.user.id!,
                message: input.message,
                isPublic: input.isPublic,
                isSolved: false,
                mood: input.mood,
                votes: {}
            }
        });

        return feedback;
    }),
    vote: protectedProcedure.input(
        z.object({
            feedbackId: z.string().cuid(),
        })
    ).mutation(async ({ctx, input}) => {
        const userId = ctx.session.user.id!;
        const {feedbackId} = input;
        const vote = await prisma.feedbackVote.create({
            data: {
                feedbackId,
                userId
            }
        });

        return vote;
    })
});
