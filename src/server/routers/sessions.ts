import {publicProcedure, router} from "../trpc";
import {TRPCError} from "@trpc/server";
import {z} from 'zod';
export const sessionRouter = router({
    user: publicProcedure.query(async ({ ctx }) => {
        if (ctx.session && ctx.session!.user) {
            return {
                ...ctx.session.user,
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