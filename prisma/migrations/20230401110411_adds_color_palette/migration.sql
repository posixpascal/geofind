/*
  Warnings:

  - You are about to drop the column `enableDarkMode` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "enableDarkMode",
ADD COLUMN     "colorPalette" TEXT NOT NULL DEFAULT 'main';
