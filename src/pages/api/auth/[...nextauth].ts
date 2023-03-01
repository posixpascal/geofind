import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/server/prisma";

// Prisma adapter for NextAuth, optional and can be removed
export const authOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }: any) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
};

export default NextAuth(authOptions);