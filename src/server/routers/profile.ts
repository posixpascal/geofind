import {protectedProcedure, publicProcedure, router} from "../trpc";
import {prisma} from "@/server/prisma";
import { z } from "zod";

export const profileRouter = router({
    all: publicProcedure.query(async () => {

    }),

    experiences: protectedProcedure
        .input(z.object({}))
        .query(async ({ctx}): Promise<{ experience: number, createdAt: Date }[]> => {
            const userId = ctx.session.user.id!;
            return await prisma.dailyExperience.findMany({
                where: {
                    userId
                },
                orderBy: {
                    experience: "desc"
                },
                take: 30,
                select: {
                    experience: true,
                    createdAt: true
                }
            });
        })
});
