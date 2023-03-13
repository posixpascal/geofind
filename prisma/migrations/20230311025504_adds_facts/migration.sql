-- CreateTable
CREATE TABLE "CountryFact" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "isAIGenerated" BOOLEAN NOT NULL,
    "flagged" BOOLEAN NOT NULL,
    "flaggedCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountryFact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CountryFact" ADD CONSTRAINT "CountryFact_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
