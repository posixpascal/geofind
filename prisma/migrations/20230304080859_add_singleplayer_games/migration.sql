-- CreateTable
CREATE TABLE "SinglePlayerGame" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL DEFAULT 1,
    "maxTrials" INTEGER NOT NULL DEFAULT 3,
    "trialsForRound" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SinglePlayerGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SinglePlayerGame" ADD CONSTRAINT "SinglePlayerGame_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SinglePlayerGame" ADD CONSTRAINT "SinglePlayerGame_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
