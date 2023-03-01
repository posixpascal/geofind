CREATE EXTENSION postgis;
-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coords" geometry(Point, 4326) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "location_idx" ON "Country" USING GIST ("coords");
