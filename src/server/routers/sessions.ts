import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { prisma } from "@/server/prisma";
import ee from "@/server/eventEmitter";
import { EXPERIENCE_UPDATED } from "@/server/constants/events";
import { Experience } from "@/server/constants/exp";

export const sessionRouter = router({
  experience: protectedProcedure.subscription(({ ctx }) => {
    return observable<{ total: number; trail: Experience[] }>((emit) => {
      const onUpdated = async (trail: Experience[]) => {
        const user = await prisma.user.findFirst({
          select: {
            experience: true,
          },
          where: {
            id: ctx.session.user.id,
          },
        });

        emit.next({
          total: user!.experience,
          trail,
        });
      };

      onUpdated([]);

      ee.on(EXPERIENCE_UPDATED, onUpdated);
      return () => {
        ee.off(EXPERIENCE_UPDATED, onUpdated);
      };
    });
  }),
  user: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session && ctx.session!.user) {
      return {
        ...ctx.session.user,
        experience: 0,
        isLoggedIn: true,
      };
    } else {
      return {
        isLoggedIn: false,
        name: "Guest",
        image: "yay",
      };
    }
  }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username } = input;
      console.log(input);
      try {
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    return { isLoggedIn: false, login: "", avatarUrl: "" };
  }),
});
