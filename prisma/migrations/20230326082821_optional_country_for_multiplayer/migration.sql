-- DropForeignKey
ALTER TABLE "MultiPlayerGame" DROP CONSTRAINT "MultiPlayerGame_countryId_fkey";

-- AlterTable
ALTER TABLE "MultiPlayerGame" ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MultiPlayerGame" ADD CONSTRAINT "MultiPlayerGame_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
