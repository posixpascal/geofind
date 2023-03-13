-- CreateEnum
CREATE TYPE "RoundState" AS ENUM ('PREPARED', 'STARTED', 'ENDED');

-- AlterTable
ALTER TABLE "SinglePlayerGame" ADD COLUMN     "roundState" "RoundState" NOT NULL DEFAULT 'PREPARED';

-- CreateTable
CREATE TABLE "CountriesOnUsers" (
    "userId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "firstFoundAt" TIMESTAMP(3),
    "lastFoundAt" TIMESTAMP(3),
    "timesFound" INTEGER NOT NULL,
    "timesFailed" INTEGER NOT NULL,

    CONSTRAINT "CountriesOnUsers_pkey" PRIMARY KEY ("userId","countryId")
);

-- AddForeignKey
ALTER TABLE "CountriesOnUsers" ADD CONSTRAINT "CountriesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountriesOnUsers" ADD CONSTRAINT "CountriesOnUsers_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
