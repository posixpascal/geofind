/*
  Warnings:

  - You are about to drop the column `experience` on the `Achievement` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('CONTINENTS', 'FANATIC', 'COMPETITIVE', 'SOCIAL', 'MISSES');

-- CreateEnum
CREATE TYPE "AchievementMedal" AS ENUM ('GEM', 'CROWN', 'RIBBON');

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "experience",
ADD COLUMN     "experienceOnGain" INTEGER NOT NULL DEFAULT 200,
ADD COLUMN     "medal" "AchievementMedal" NOT NULL DEFAULT 'RIBBON',
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "type" "AchievementType" NOT NULL DEFAULT 'CONTINENTS';
