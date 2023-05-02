import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { sessionRouter } from "@/server/routers/sessions";
import { countriesRouter } from "@/server/routers/countries";
import { singleplayerRouter } from "@/server/routers/singleplayer";
import { achievementsRouter } from "@/server/routers/achievements";
import {profileRouter} from "@/server/routers/profile";
import {settingsRouter} from "@/server/routers/settings";
import {friendsRouter} from "@/server/routers/friends";
import {feedbackRouter} from "@/server/routers/feedback";
import {multiplayerRouter} from "@/server/routers/multiplayer";
export const appRouter = router({
  session: sessionRouter,
  countries: countriesRouter,
  singleplayer: singleplayerRouter,
  multiplayer: multiplayerRouter,
  achievements: achievementsRouter,
  profile: profileRouter,
  settings: settingsRouter,
  friends: friendsRouter,
  feedback: feedbackRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
