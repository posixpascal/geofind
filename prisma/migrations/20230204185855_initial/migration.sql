-- CreateEnum
CREATE TYPE "GameSpeed" AS ENUM ('DEFAULT', 'SLOW', 'FAST', 'BLITZ');

-- CreateEnum
CREATE TYPE "GameState" AS ENUM ('LOBBY', 'ROUND_START', 'ROUND_END', 'SCOREBOARD', 'FINISHED', 'PAUSED');

-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('WORLD', 'ANIMALS', 'FLAGS', 'COUNTRIES', 'CAPITALS');

-- CreateEnum
CREATE TYPE "GameMap" AS ENUM ('WORLD', 'GLOBE', 'EUROPE', 'AFRICA', 'ASIA', 'OCEANIA', 'NORTH_AMERICA', 'SOUTH_AMERICA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isGuest" BOOLEAN NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "mode" "GameMode" NOT NULL DEFAULT E'WORLD',
    "speed" "GameSpeed" NOT NULL DEFAULT E'DEFAULT',
    "map" "GameMap" NOT NULL DEFAULT E'WORLD',
    "state" "GameState" NOT NULL DEFAULT E'LOBBY',
    "isPublic" BOOLEAN NOT NULL,
    "hasDirectMatches" BOOLEAN NOT NULL,
    "hasCountryBorders" BOOLEAN NOT NULL,
    "hasIslands" BOOLEAN NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "lastActivityAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_gameId_userId_key" ON "Session"("gameId", "userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
