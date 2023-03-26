import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { countryScalarFields } from "@/server/prismaGeoExtension";
import { observable } from "@trpc/server/observable";
import { SinglePlayerGame } from "@prisma/client";
import ee from "@/server/eventEmitter";
import { LngLat } from "maplibre-gl";
import { SINGLEPLAYER_UPDATED } from "@/server/constants/events";
import logger from "@/server/logger";
import {
  createSinglePlayer,
  nextSinglePlayerRound,
  skipSinglePlayerRound,
  solveSinglePlayerRound,
  startSinglePlayer,
  voteSinglePlayer,
} from "@/server/services/singleplayer";

export const multiplayerRouter = router({
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id } = ctx.session.user;
  }),
});
