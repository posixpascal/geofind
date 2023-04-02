-- CreateTable
CREATE TABLE "MultiPlayerSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "multiPlayerGameId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "state" "GameSessionState" NOT NULL,

    CONSTRAINT "MultiPlayerSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiPlayerVote" (
    "id" TEXT NOT NULL,
    "multiPlayerSessionId" TEXT NOT NULL,
    "multiPlayerGameId" TEXT NOT NULL,
    "countryId" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "MultiPlayerVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MultiPlayerSession_multiPlayerGameId_userId_key" ON "MultiPlayerSession"("multiPlayerGameId", "userId");

-- AddForeignKey
ALTER TABLE "MultiPlayerSession" ADD CONSTRAINT "MultiPlayerSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerSession" ADD CONSTRAINT "MultiPlayerSession_multiPlayerGameId_fkey" FOREIGN KEY ("multiPlayerGameId") REFERENCES "MultiPlayerGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerVote" ADD CONSTRAINT "MultiPlayerVote_multiPlayerSessionId_fkey" FOREIGN KEY ("multiPlayerSessionId") REFERENCES "MultiPlayerSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerVote" ADD CONSTRAINT "MultiPlayerVote_multiPlayerGameId_fkey" FOREIGN KEY ("multiPlayerGameId") REFERENCES "MultiPlayerGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultiPlayerVote" ADD CONSTRAINT "MultiPlayerVote_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
