-- CreateEnum
CREATE TYPE "RoundState" AS ENUM ('PREPARED', 'STARTED', 'ENDED', 'SCOREBOARD', 'SUCCESS', 'FAILURE');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('CONTINENTS', 'FANATIC', 'COMPETITIVE', 'SOCIAL', 'MISSES');

-- CreateEnum
CREATE TYPE "GameState" AS ENUM ('LOBBY', 'PLAYING', 'ENDED', 'CLOSED');

-- CreateEnum
CREATE TYPE "AchievementMedal" AS ENUM ('GEM', 'CROWN', 'RIBBON');

-- CreateEnum
CREATE TYPE "GameSpeed" AS ENUM ('DEFAULT', 'SLOW', 'FAST', 'BLITZ');

-- CreateEnum
CREATE TYPE "GameSessionState" AS ENUM ('CONNECTED', 'DISCONNECTED');

-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('WORLD', 'ANIMALS', 'FLAGS', 'COUNTRIES', 'CAPITALS', 'TIMETRIAL', 'BATTLEROYALE');

-- CreateEnum
CREATE TYPE "GameMap" AS ENUM ('WORLD', 'EUROPE', 'AFRICA', 'ASIA', 'OCEANIA', 'NORTH_AMERICA', 'SOUTH_AMERICA');

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "subregion" TEXT NOT NULL,
    "areaInMiles" INTEGER NOT NULL DEFAULT 0,
    "nameCommon" TEXT NOT NULL,
    "nameOfficial" TEXT NOT NULL,
    "nameNativeCommon" TEXT NOT NULL,
    "nameNativeOfficial" TEXT NOT NULL,
    "isoAlpha2" TEXT NOT NULL,
    "isoAlpha3" TEXT NOT NULL,
    "isoNumeric" TEXT NOT NULL,
    "capitalName" TEXT NOT NULL,
    "capitalLatLng" geometry NOT NULL,
    "continent" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "ariaInKm" INTEGER NOT NULL,
    "coatOfArmsPng" TEXT,
    "coatOfArmsVector" TEXT,
    "flagEmoji" TEXT,
    "isIndependent" BOOLEAN NOT NULL,
    "isUnMember" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "altSpellings" JSONB NOT NULL,
    "translations" JSONB NOT NULL,
    "borders" JSONB NOT NULL,
    "tlds" JSONB NOT NULL,
    "languages" JSONB NOT NULL,
    "currencies" JSONB NOT NULL,
    "timezones" JSONB NOT NULL,
    "car" JSONB NOT NULL,
    "wikiDataQID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latLng" geometry NOT NULL,
    "shape" geometry,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "pin" INTEGER NOT NULL DEFAULT 0,
    "color" INTEGER NOT NULL DEFAULT 0,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "friendCode" INTEGER NOT NULL DEFAULT 0,
    "isGuest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyExperience" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enableAnimations" BOOLEAN NOT NULL DEFAULT true,
    "enableLowPowerMode" BOOLEAN NOT NULL DEFAULT false,
    "enablePrivacyMode" BOOLEAN NOT NULL DEFAULT false,
    "enableFriends" BOOLEAN NOT NULL DEFAULT true,
    "enableExperience" BOOLEAN NOT NULL DEFAULT true,
    "enableAds" BOOLEAN NOT NULL DEFAULT false,
    "colorPalette" TEXT NOT NULL DEFAULT 'main',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isSolved" BOOLEAN NOT NULL DEFAULT false,
    "mood" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,

    CONSTRAINT "FeedbackVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Pin" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "hasColor" BOOLEAN NOT NULL,
    "hasAnimation" BOOLEAN NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SinglePlayerGame" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL DEFAULT 1,
    "roundState" "RoundState" NOT NULL DEFAULT 'PREPARED',
    "maxTrials" INTEGER NOT NULL DEFAULT 3,
    "trialsForRound" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SinglePlayerGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiPlayerGame" (
    "id" TEXT NOT NULL,
    "roomCode" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "countryId" TEXT,
    "roundNumber" INTEGER NOT NULL DEFAULT 1,
    "roundTime" INTEGER NOT NULL DEFAULT 12,
    "scoreNeeded" INTEGER NOT NULL DEFAULT 10,
    "roundStartedAt" TIMESTAMP(3),
    "gameState" "GameState" NOT NULL DEFAULT 'LOBBY',
    "gameMode" "GameMode" NOT NULL DEFAULT 'WORLD',
    "gameMap" "GameMap" NOT NULL DEFAULT 'WORLD',
    "roundState" "RoundState" NOT NULL DEFAULT 'PREPARED',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "firstSpotWins" BOOLEAN NOT NULL DEFAULT false,
    "onlyDirectSpots" BOOLEAN NOT NULL DEFAULT false,
    "hasIslands" BOOLEAN NOT NULL DEFAULT false,
    "synchronized" BOOLEAN NOT NULL DEFAULT false,
    "settings" JSONB,
    "continents" JSONB,

    CONSTRAINT "MultiPlayerGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiPlayerSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "multiPlayerGameId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "isSynchronized" BOOLEAN NOT NULL DEFAULT false,
    "state" "GameSessionState" NOT NULL,

    CONSTRAINT "MultiPlayerSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiPlayerVote" (
    "id" TEXT NOT NULL,
    "multiPlayerSessionId" TEXT NOT NULL,
    "multiPlayerGameId" TEXT NOT NULL,
    "countryId" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "MultiPlayerVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountrySpotted" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "firstFoundAt" TIMESTAMP(3),
    "lastFoundAt" TIMESTAMP(3),
    "timesFound" INTEGER NOT NULL,
    "timesFailed" INTEGER NOT NULL,

    CONSTRAINT "CountrySpotted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryFact" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "description" TEXT,
    "source" TEXT,
    "language" TEXT,
    "isAIGenerated" BOOLEAN NOT NULL DEFAULT false,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "flaggedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountryFact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryAnimal" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "source" TEXT,
    "language" TEXT,
    "countryId" TEXT NOT NULL,
    "isAIGenerated" BOOLEAN NOT NULL DEFAULT false,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "flaggedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountryAnimal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "tag" TEXT NOT NULL DEFAULT '',
    "mode" "GameMode" NOT NULL DEFAULT 'WORLD',
    "speed" "GameSpeed" NOT NULL DEFAULT 'DEFAULT',
    "state" "GameState" NOT NULL DEFAULT 'LOBBY',
    "maps" JSONB NOT NULL,
    "isTutorial" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL,
    "hasDirectMatches" BOOLEAN NOT NULL,
    "hasCountryBorders" BOOLEAN NOT NULL,
    "hasIslands" BOOLEAN NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "state" "GameSessionState" NOT NULL,
    "lastActivityAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "countryId" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "experienceOnGain" INTEGER NOT NULL DEFAULT 200,
    "medal" "AchievementMedal" NOT NULL DEFAULT 'RIBBON',
    "type" "AchievementType" NOT NULL DEFAULT 'CONTINENTS',
    "metadata" JSONB,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnAchievements" (
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnAchievements_pkey" PRIMARY KEY ("userId","achievementId")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_isoAlpha2_key" ON "Country"("isoAlpha2");

-- CreateIndex
CREATE UNIQUE INDEX "Country_isoAlpha3_key" ON "Country"("isoAlpha3");

-- CreateIndex
CREATE UNIQUE INDEX "Country_isoNumeric_key" ON "Country"("isoNumeric");

-- CreateIndex
CREATE INDEX "country_idx" ON "Country" USING GIST ("latLng");

-- CreateIndex
CREATE INDEX "capital_idx" ON "Country" USING GIST ("capitalLatLng");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "MultiPlayerGame_roomCode_key" ON "MultiPlayerGame"("roomCode");

-- CreateIndex
CREATE UNIQUE INDEX "MultiPlayerSession_multiPlayerGameId_userId_key" ON "MultiPlayerSession"("multiPlayerGameId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_gameId_userId_key" ON "GameSession"("gameId", "userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExperience" ADD CONSTRAINT "DailyExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackVote" ADD CONSTRAINT "FeedbackVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackVote" ADD CONSTRAINT "FeedbackVote_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SinglePlayerGame" ADD CONSTRAINT "SinglePlayerGame_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SinglePlayerGame" ADD CONSTRAINT "SinglePlayerGame_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerGame" ADD CONSTRAINT "MultiPlayerGame_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerGame" ADD CONSTRAINT "MultiPlayerGame_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerSession" ADD CONSTRAINT "MultiPlayerSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerSession" ADD CONSTRAINT "MultiPlayerSession_multiPlayerGameId_fkey" FOREIGN KEY ("multiPlayerGameId") REFERENCES "MultiPlayerGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerVote" ADD CONSTRAINT "MultiPlayerVote_multiPlayerSessionId_fkey" FOREIGN KEY ("multiPlayerSessionId") REFERENCES "MultiPlayerSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerVote" ADD CONSTRAINT "MultiPlayerVote_multiPlayerGameId_fkey" FOREIGN KEY ("multiPlayerGameId") REFERENCES "MultiPlayerGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerVote" ADD CONSTRAINT "MultiPlayerVote_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountrySpotted" ADD CONSTRAINT "CountrySpotted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountrySpotted" ADD CONSTRAINT "CountrySpotted_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryFact" ADD CONSTRAINT "CountryFact_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryAnimal" ADD CONSTRAINT "CountryAnimal_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnAchievements" ADD CONSTRAINT "UsersOnAchievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnAchievements" ADD CONSTRAINT "UsersOnAchievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
