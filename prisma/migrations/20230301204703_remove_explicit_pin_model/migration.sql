/*
  Warnings:

  - You are about to drop the column `pinColor` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pinId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pinId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pinColor",
DROP COLUMN "pinId",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "pin" TEXT;
