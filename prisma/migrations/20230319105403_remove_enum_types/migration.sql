/*
  Warnings:

  - The values [ROUND_START,ROUND_END,SCOREBOARD,FINISHED,PAUSED] on the enum `GameState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameState_new" AS ENUM ('LOBBY', 'PLAYING', 'ENDED', 'CLOSED');
ALTER TABLE "Game" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "MultiPlayerGame" ALTER COLUMN "gameState" DROP DEFAULT;
ALTER TABLE "MultiPlayerGame" ALTER COLUMN "gameState" TYPE "GameState_new" USING ("gameState"::text::"GameState_new");
ALTER TABLE "Game" ALTER COLUMN "state" TYPE "GameState_new" USING ("state"::text::"GameState_new");
ALTER TYPE "GameState" RENAME TO "GameState_old";
ALTER TYPE "GameState_new" RENAME TO "GameState";
DROP TYPE "GameState_old";
ALTER TABLE "Game" ALTER COLUMN "state" SET DEFAULT 'LOBBY';
ALTER TABLE "MultiPlayerGame" ALTER COLUMN "gameState" SET DEFAULT 'LOBBY';
COMMIT;
