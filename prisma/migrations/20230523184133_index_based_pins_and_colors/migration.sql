/*
  Warnings:

  - The `color` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pin` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "color",
ADD COLUMN     "color" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "pin",
ADD COLUMN     "pin" INTEGER NOT NULL DEFAULT 0;
