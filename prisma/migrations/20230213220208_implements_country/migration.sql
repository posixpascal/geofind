/*
  Warnings:

  - You are about to drop the column `coords` on the `Country` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isoAlpha2]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isoAlpha3]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isoNumeric]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `altSpellings` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ariaInKm` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capitalLatLng` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capitalName` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `continent` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencies` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isIndependent` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUnMember` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isoAlpha2` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isoAlpha3` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isoCioc` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isoNumeric` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languages` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latLng` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameCommon` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameNativeCommon` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameNativeOfficial` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameOfficial` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `population` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shape` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subregion` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezones` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tlds` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translations` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "location_idx";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "coords",
ADD COLUMN     "altSpellings" JSONB NOT NULL,
ADD COLUMN     "ariaInKm" INTEGER NOT NULL,
ADD COLUMN     "capitalLatLng" geometry(Point, 4326) NOT NULL,
ADD COLUMN     "capitalName" TEXT NOT NULL,
ADD COLUMN     "car" JSONB NOT NULL,
ADD COLUMN     "coatOfArmsPng" TEXT,
ADD COLUMN     "coatOfArmsVector" TEXT,
ADD COLUMN     "continent" TEXT NOT NULL,
ADD COLUMN     "currencies" JSONB NOT NULL,
ADD COLUMN     "flagEmoji" TEXT,
ADD COLUMN     "isIndependent" BOOLEAN NOT NULL,
ADD COLUMN     "isUnMember" BOOLEAN NOT NULL,
ADD COLUMN     "isoAlpha2" TEXT NOT NULL,
ADD COLUMN     "isoAlpha3" TEXT NOT NULL,
ADD COLUMN     "isoNumeric" TEXT NOT NULL,
ADD COLUMN     "languages" JSONB NOT NULL,
ADD COLUMN     "latLng" geometry(Point, 4326) NOT NULL,
ADD COLUMN     "nameCommon" TEXT NOT NULL,
ADD COLUMN     "nameNativeCommon" TEXT NOT NULL,
ADD COLUMN     "nameNativeOfficial" TEXT NOT NULL,
ADD COLUMN     "nameOfficial" TEXT NOT NULL,
ADD COLUMN     "population" INTEGER NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "shape" geometry NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "subregion" TEXT NOT NULL,
ADD COLUMN     "timezones" JSONB NOT NULL,
ADD COLUMN     "tlds" JSONB NOT NULL,
ADD COLUMN     "translations" JSONB NOT NULL,
ADD COLUMN     "wikiDataQID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Country_isoAlpha2_key" ON "Country"("isoAlpha2");

-- CreateIndex
CREATE UNIQUE INDEX "Country_isoAlpha3_key" ON "Country"("isoAlpha3");

-- CreateIndex
CREATE UNIQUE INDEX "Country_isoNumeric_key" ON "Country"("isoNumeric");

-- CreateIndex
CREATE INDEX "location_idx" ON "Country" USING GIST ("latLng");
