import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { observable } from "@trpc/server/observable";
import ee from "@/server/eventEmitter";
import { SETTINGS_UPDATED } from "@/server/constants/events";
import { Settings } from "@prisma/client";
import { DEFAULT_SETTINGS } from "@/server/constants/settings";
import {PIN_COLORS, PINS} from "@/server/constants/pins";

const UpdateSettingInput = z.object({
  key: z.string(),
  value: z.union([z.string(), z.boolean()]),
});

export const settingsRouter = router({
  update: protectedProcedure
    .input(UpdateSettingInput)
    .mutation(async ({ ctx, input }) => {
      const { key, value } = input;
      const userId = ctx.session.user!.id;
      // TODO: dangerous, need to limit keys
      const settings = await prisma.settings.upsert({
        where: {
          userId,
        },
        create: {
          ...DEFAULT_SETTINGS,
          userId: userId!,
        },
        update: {
          [key]: value,
        },
      });

      ee.emit(SETTINGS_UPDATED, settings);

      return settings;
    }),
    updatePinAndColor: protectedProcedure.input(z.object({
        pin: z.number().min(0).max(PINS.length),
        color: z.number().min(0).max(PIN_COLORS.length)
    })).mutation(async ({ctx,input}) => {
        const id = ctx.session.user!.id;
        const {color, pin} = input;
        await prisma.user.update({
            where: {
                id
            },
            data: {
                pin,
                color
            }
        });
    }),
    pinAndColor: protectedProcedure.query(async ({ctx,input}) => {
        const id = ctx.session.user!.id;
        return await prisma.user.findFirst({
            where: {
                id
            },
            select: {
                pin: true,
                color: true
            }
        });
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user!.id;
    let settings = await prisma.settings.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          ...DEFAULT_SETTINGS,
          userId: userId!,
        },
      });
    }

    return settings;
  }),

  // TODO: shouldnt be a subscription
  subscribe: protectedProcedure
    .input(z.object({}))
    .subscription(async ({ ctx }) => {
      const userId = ctx.session.user.id!;
      let settings: Settings | null = await prisma.settings.findFirst({
        where: {
          userId,
        },
      });

      if (!settings) {
        settings = await prisma.settings.create({
          data: {
            ...DEFAULT_SETTINGS,
            userId: userId!,
          },
        });
      }

      return observable<Settings>((emit) => {
        const onUpdated = async (settings: Settings) => {
          emit.next(settings);
        };

        onUpdated(settings!);

        ee.on(SETTINGS_UPDATED, onUpdated);
        return () => {
          ee.off(SETTINGS_UPDATED, onUpdated);
        };
      });
    }),
});
