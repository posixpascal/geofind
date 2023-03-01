-- CreateIndex
CREATE INDEX "country_idx" ON "Country" USING GIST ("latLng");

-- CreateIndex
CREATE INDEX "capital_idx" ON "Country" USING GIST ("capitalLatLng");
