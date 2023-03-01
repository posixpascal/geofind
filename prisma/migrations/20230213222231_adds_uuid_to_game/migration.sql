/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "location_idx";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shape" DROP NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");
