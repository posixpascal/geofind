import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/server/prisma";
import jwt from "jsonwebtoken";
import cuid from "cuid";
import {randomName} from "@/utils/generators";

const adapter = PrismaAdapter(prisma);
// Prisma adapter for NextAuth, optional and can be removed
export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encode: async ({secret, token, maxAge}) => {
            const jwtClaims = {
                "sub": token.sub.toString(),
                "id": token.id,
                "name": token.name,
                "email": token.email,
                "iat": Date.now() / 1000,
                "exp": Math.floor(Date.now() / 1000) + (24 * 60 * 60)
            };
            const encodedToken = jwt.sign(jwtClaims, secret, {algorithm: 'HS256'});
            return encodedToken;
        },
        decode: async ({secret, token, maxAge}) => {
            const decodedToken = jwt.verify(token, secret, {algorithms: ['HS256']});
            return decodedToken;
        },
    },
    callbacks: {
        session({session, user, token}: any) {
            if (session.user && user) {
                session.user.id = user.id;
                session.user.experience = user.experience;
            }
            if (session.user && token){
                session.user.id = token.sub;
            }
            return session;
        },
    },
    adapter,
    providers: [
        CredentialsProvider({
            name: "anon",
            credentials: {},
            async authorize(credentials, req) {
                const user = await adapter.createUser({
                    name: randomName(),
                    email: cuid() + '@geofind.io',
                    emailVerified: new Date(),
                    image: "",
                    isGuest: true
                } as any);
                return user;
            },
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
};

export default NextAuth(authOptions);
