"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const sessions_1 = require("@/server/routers/sessions");
const countries_1 = require("@/server/routers/countries");
const singleplayer_1 = require("@/server/routers/singleplayer");
const achievements_1 = require("@/server/routers/achievements");
const profile_1 = require("@/server/routers/profile");
const settings_1 = require("@/server/routers/settings");
const friends_1 = require("@/server/routers/friends");
const feedback_1 = require("@/server/routers/feedback");
const multiplayer_1 = require("@/server/routers/multiplayer");
exports.appRouter = (0, trpc_1.router)({
    session: sessions_1.sessionRouter,
    countries: countries_1.countriesRouter,
    singleplayer: singleplayer_1.singleplayerRouter,
    multiplayer: multiplayer_1.multiplayerRouter,
    achievements: achievements_1.achievementsRouter,
    profile: profile_1.profileRouter,
    settings: settings_1.settingsRouter,
    friends: friends_1.friendsRouter,
    feedback: feedback_1.feedbackRouter,
});
