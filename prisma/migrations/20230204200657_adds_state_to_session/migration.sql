/*
  Warnings:

  - Added the required column `state` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionState" AS ENUM ('CONNECTED', 'DISCONNECTED');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "state" "SessionState" NOT NULL;
