/*
  Warnings:

  - You are about to drop the `CountriesOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CountriesOnUsers" DROP CONSTRAINT "CountriesOnUsers_countryId_fkey";

-- DropForeignKey
ALTER TABLE "CountriesOnUsers" DROP CONSTRAINT "CountriesOnUsers_userId_fkey";

-- DropTable
DROP TABLE "CountriesOnUsers";

-- CreateTable
CREATE TABLE "CountrySpotted" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "firstFoundAt" TIMESTAMP(3),
    "lastFoundAt" TIMESTAMP(3),
    "timesFound" INTEGER NOT NULL,
    "timesFailed" INTEGER NOT NULL,

    CONSTRAINT "CountrySpotted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CountrySpotted" ADD CONSTRAINT "CountrySpotted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountrySpotted" ADD CONSTRAINT "CountrySpotted_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
