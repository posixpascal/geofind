// @ts-ignore
require("dotenv").config({
    path: `${__dirname}/../../.env`,
});
// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
// @ts-ignore
const { z } = require("zod");
/*eslint sort-keys: "error"*/
const envSchema = z.object({
    APP_URL: z.string().url().startsWith("http"),
    DATABASE_URL: z.string().url(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    SECRET_COOKIE_PASSWORD: z.string().length(32),
    WS_URL: z.string().url().startsWith("ws"),
});
const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(env.error.format(), null, 4));
    process.exit(1);
}
module.exports.env = env.data;
