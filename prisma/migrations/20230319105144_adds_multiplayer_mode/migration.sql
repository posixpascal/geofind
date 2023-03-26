/*
  Warnings:

  - The values [ROUND_START,ROUND_END,SCOREBOARD,FINISHED,PAUSED] on the enum `GameState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "GameMode" ADD VALUE 'TIMETRIAL';
ALTER TYPE "GameMode" ADD VALUE 'BATTLEROYALE';



-- CreateTable
CREATE TABLE "MultiPlayerGame" (
    "id" TEXT NOT NULL,
    "roomCode" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL DEFAULT 1,
    "roundTime" INTEGER NOT NULL DEFAULT 30,
    "gameState" "GameState" NOT NULL DEFAULT 'LOBBY',
    "gameMode" "GameMode" NOT NULL DEFAULT 'WORLD',
    "gameMap" "GameMap" NOT NULL DEFAULT 'WORLD',
    "roundState" "RoundState" NOT NULL DEFAULT 'PREPARED',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "firstSpotWins" BOOLEAN NOT NULL DEFAULT false,
    "onlyDirectSpots" BOOLEAN NOT NULL DEFAULT false,
    "settings" JSONB,
    "continents" JSONB,

    CONSTRAINT "MultiPlayerGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MultiPlayerGame" ADD CONSTRAINT "MultiPlayerGame_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerGame" ADD CONSTRAINT "MultiPlayerGame_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
