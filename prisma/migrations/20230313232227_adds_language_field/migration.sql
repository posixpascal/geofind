/*
  Warnings:

  - You are about to drop the column `descriptionDe` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionEn` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `nameDe` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `nameEn` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `sourceDe` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `sourceEn` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionDe` on the `CountryFact` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionEn` on the `CountryFact` table. All the data in the column will be lost.
  - You are about to drop the column `sourceDe` on the `CountryFact` table. All the data in the column will be lost.
  - You are about to drop the column `sourceEn` on the `CountryFact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CountryAnimal" DROP COLUMN "descriptionDe",
DROP COLUMN "descriptionEn",
DROP COLUMN "nameDe",
DROP COLUMN "nameEn",
DROP COLUMN "sourceDe",
DROP COLUMN "sourceEn",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "source" TEXT;

-- AlterTable
ALTER TABLE "CountryFact" DROP COLUMN "descriptionDe",
DROP COLUMN "descriptionEn",
DROP COLUMN "sourceDe",
DROP COLUMN "sourceEn",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "source" TEXT;
