"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const discord_1 = __importDefault(require("next-auth/providers/discord"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const prisma_1 = require("@/server/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cuid_1 = __importDefault(require("cuid"));
const generators_1 = require("@/utils/generators");
const adapter = {
    ...(0, prisma_adapter_1.PrismaAdapter)(prisma_1.prisma),
    createUser: (data) => {
        return prisma_1.prisma.user.create({
            data: {
                ...data,
                friendCode: 1000 + Math.round(Math.random() * 8999),
            },
        });
    },
};
// Prisma adapter for NextAuth, optional and can be removed
exports.authOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encode: async ({ secret, token, maxAge, }) => {
            const jwtClaims = {
                sub: token.sub.toString(),
                id: token.id,
                name: token.name,
                email: token.email,
                iat: Date.now() / 1000,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            };
            const encodedToken = jsonwebtoken_1.default.sign(jwtClaims, secret, { algorithm: "HS256" });
            return encodedToken;
        },
        decode: async ({ secret, token, maxAge, }) => {
            const decodedToken = jsonwebtoken_1.default.verify(token, secret, { algorithms: ["HS256"] });
            return decodedToken;
        },
    },
    callbacks: {
        session({ session, user, token }) {
            if (session.user && user) {
                session.user.id = user.id;
                session.user.experience = user.experience;
            }
            if (session.user && token) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    adapter,
    providers: [
        (0, credentials_1.default)({
            name: "anon",
            credentials: {},
            async authorize(credentials, req) {
                const user = await adapter.createUser({
                    name: (0, generators_1.randomName)(),
                    email: (0, cuid_1.default)() + "@geofind.io",
                    emailVerified: new Date(),
                    image: "",
                    isGuest: true,
                });
                return user;
            },
        }),
        (0, discord_1.default)({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
};
exports.default = (0, next_auth_1.default)(exports.authOptions); // TODO: type
