/*
  Warnings:

  - You are about to drop the column `roundId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Round` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCorrect` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Pin" AS ENUM ('DEFAULT');

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_roundId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "pin" "Pin" NOT NULL;

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "roundId",
ADD COLUMN     "countryId" TEXT,
ADD COLUMN     "gameId" TEXT NOT NULL,
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Round";

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,

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
