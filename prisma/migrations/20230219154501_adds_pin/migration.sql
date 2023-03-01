/*
  Warnings:

  - You are about to drop the column `color` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pin` on the `User` table. All the data in the column will be lost.
  - Added the required column `pinColor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "color",
DROP COLUMN "pin",
ADD COLUMN     "pinColor" TEXT NOT NULL,
ADD COLUMN     "pinId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Pin";

-- CreateTable
CREATE TABLE "Pin" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "hasColor" BOOLEAN NOT NULL,
    "hasAnimation" BOOLEAN NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
