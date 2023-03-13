/*
  Warnings:

  - You are about to drop the column `description` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CountryAnimal` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `CountryFact` table. All the data in the column will be lost.
  - Added the required column `descriptionDe` to the `CountryAnimal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `CountryAnimal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameDe` to the `CountryAnimal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `CountryAnimal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionDe` to the `CountryFact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `CountryFact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CountryAnimal" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "descriptionDe" TEXT NOT NULL,
ADD COLUMN     "descriptionEn" TEXT NOT NULL,
ADD COLUMN     "nameDe" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CountryFact" DROP COLUMN "description",
ADD COLUMN     "descriptionDe" TEXT NOT NULL,
ADD COLUMN     "descriptionEn" TEXT NOT NULL;
