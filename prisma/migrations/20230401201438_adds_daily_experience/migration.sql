-- CreateTable
CREATE TABLE "DailyExperience" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyExperience" ADD CONSTRAINT "DailyExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
