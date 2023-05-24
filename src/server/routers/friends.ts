import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { Prisma, User } from "@prisma/client";

export const friendsRouter = router({
  list: protectedProcedure.query(
    async ({
      ctx,
    }): Promise<
      ({
        follower: {
          experience: number | null;
          name: string | null;
        };
      } & { followerId: string })[]
    > => {
      const userId = ctx.session.user!.id;

      const following = await prisma.follows.findMany({
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

      return following as any; // TODO: type
    }
  ),
  add: protectedProcedure
    .input(
      z.object({
        followingId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const followerId = ctx.session.user.id!;
      const { followingId } = input;

      return await prisma.follows.create({
        data: {
          followerId,
          followingId,
        },
      });
    }),
  lookup: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        friendCode: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }): Promise<User[]> => {
      const { name, friendCode } = input;

      const query: Partial<Prisma.UserFindManyArgs> = {
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
        query.where!.name = {
          contains: name,
        };
      }

      if (friendCode) {
        query.where!.friendCode = parseInt(friendCode);
      }

      return await prisma.user.findMany(query);
    }),
});
