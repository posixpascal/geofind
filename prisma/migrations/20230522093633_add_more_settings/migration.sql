/*
  Warnings:

  - The values [GLOBE] on the enum `GameMap` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameMap_new" AS ENUM ('WORLD', 'EUROPE', 'AFRICA', 'ASIA', 'OCEANIA', 'NORTH_AMERICA', 'SOUTH_AMERICA');
ALTER TABLE "MultiPlayerGame" ALTER COLUMN "gameMap" DROP DEFAULT;
ALTER TABLE "MultiPlayerGame" ALTER COLUMN "gameMap" TYPE "GameMap_new" USING ("gameMap"::text::"GameMap_new");
ALTER TYPE "GameMap" RENAME TO "GameMap_old";
ALTER TYPE "GameMap_new" RENAME TO "GameMap";
DROP TYPE "GameMap_old";
ALTER TABLE "MultiPlayerGame" ALTER COLUMN "gameMap" SET DEFAULT 'WORLD';
COMMIT;

-- AlterTable
ALTER TABLE "MultiPlayerGame" ADD COLUMN     "hasIslands" BOOLEAN NOT NULL DEFAULT false;
