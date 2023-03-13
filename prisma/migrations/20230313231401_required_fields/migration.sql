/*
  Warnings:

  - You are about to drop the column `source` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `CountryFact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CountryAnimal" DROP COLUMN "source",
ADD COLUMN     "sourceDe" TEXT,
ADD COLUMN     "sourceEn" TEXT,
ALTER COLUMN "isAIGenerated" SET DEFAULT false,
ALTER COLUMN "flagged" SET DEFAULT false,
ALTER COLUMN "flaggedCount" SET DEFAULT 0,
ALTER COLUMN "descriptionDe" DROP NOT NULL,
ALTER COLUMN "descriptionEn" DROP NOT NULL,
ALTER COLUMN "nameDe" DROP NOT NULL,
ALTER COLUMN "nameEn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CountryFact" DROP COLUMN "source",
ADD COLUMN     "sourceDe" TEXT,
ADD COLUMN     "sourceEn" TEXT,
ALTER COLUMN "isAIGenerated" SET DEFAULT false,
ALTER COLUMN "flagged" SET DEFAULT false,
ALTER COLUMN "flaggedCount" SET DEFAULT 0,
ALTER COLUMN "descriptionDe" DROP NOT NULL,
ALTER COLUMN "descriptionEn" DROP NOT NULL;
