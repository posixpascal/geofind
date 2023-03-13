/*
  Warnings:

  - Added the required column `description` to the `CountryFact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CountryFact" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CountryAnimal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "isAIGenerated" BOOLEAN NOT NULL,
    "flagged" BOOLEAN NOT NULL,
    "flaggedCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountryAnimal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CountryAnimal" ADD CONSTRAINT "CountryAnimal_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
