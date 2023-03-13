import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { sessionRouter } from "@/server/routers/sessions";
import { countriesRouter } from "@/server/routers/countries";
import { singleplayerRouter } from "@/server/routers/singleplayer";
export const appRouter = router({
  session: sessionRouter,
  countries: countriesRouter,
  singleplayer: singleplayerRouter,
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
