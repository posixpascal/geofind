-- AlterTable
ALTER TABLE "MultiPlayerGame" ADD COLUMN     "scoreNeeded" INTEGER NOT NULL DEFAULT 10,
ALTER COLUMN "roundTime" SET DEFAULT 12;
