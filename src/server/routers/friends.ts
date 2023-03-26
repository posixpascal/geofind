import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { verifyAchievement } from "@/server/services/achievements";
import {AchievementMedal, AchievementType} from "@prisma/client";

export const friendsRouter = router({
  list: protectedProcedure.query(async ({ctx}) => {
    const user = ctx.session.user!.id;

  }),
});
