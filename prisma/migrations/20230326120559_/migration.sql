/*
  Warnings:

  - A unique constraint covering the columns `[roomCode]` on the table `MultiPlayerGame` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MultiPlayerGame_roomCode_key" ON "MultiPlayerGame"("roomCode");
