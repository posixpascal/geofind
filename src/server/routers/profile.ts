import {publicProcedure, router} from "../trpc";
import {prisma} from "@/server/prisma";

export const profileRouter = router({
    all: publicProcedure.query(async () => {

    }),
});
