-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enableAnimations" BOOLEAN NOT NULL DEFAULT true,
    "enableLowPowerMode" BOOLEAN NOT NULL DEFAULT false,
    "enablePrivacyMode" BOOLEAN NOT NULL DEFAULT false,
    "enableFriends" BOOLEAN NOT NULL DEFAULT true,
    "enableExperience" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
