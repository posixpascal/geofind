// Prisma and Geo was a bad idea.

import { prisma } from "@/server/prisma";
import { Country, Prisma } from "@prisma/client";
import { LngLat, LngLatLike } from "maplibre-gl";
import { count } from "rxjs";
import logger from "@/server/logger";

const countryFields = Prisma.dmmf.datamodel.models.find(
  (model) => model.name === "Country"
)!.fields;
export const countryScalarFields = countryFields
  .filter((s) => s.kind === "scalar")
  .map((s) => s.name);
export const geoPrisma = prisma.$extends({
  model: {
    country: {
      async findOne(where: Record<string, any>) {
        return await prisma.country.findUnique({
          select: countryScalarFields.reduce((acc, cur) => {
            return { ...acc, [cur]: true };
          }, {}),
          where,
        });
      },
      async withLngLat(id: string) {
        logger.info({
          event: "QueryCountryWithLatLng",
          data: {countryId: id},
        });

        const country = await prisma.$queryRaw(
          Prisma.sql`
                        SELECT id, "nameCommon", "flagEmoji", ST_X("Country"."latLng"::geometry) as lat, ST_Y("Country"."latLng"::geometry) as lng
                        FROM public."Country"
                        WHERE id = ${id}
          `
        );

        return country;
      },
      async within(lngLat: LngLat): Promise<Country[]> {
        logger.info({
          event: "QueryCountryWithinLatLng",
          data: {lngLat},
        });

        const countriesWithin = await prisma.$queryRaw(
          Prisma.sql`
                        SELECT id, "nameCommon", "flagEmoji", ST_X("Country"."latLng"::geometry) as lat, ST_Y("Country"."latLng"::geometry) as lng
                        FROM public."Country"
                        WHERE ST_Contains("Country".shape, ST_SetSRID(ST_MakePoint(${String(lngLat.lng)}::numeric, ${String(lngLat.lat)}::numeric), 0))
                        GROUP BY "Country".id
                        ORDER BY "Country".id; 
                    `
        );

        return countriesWithin as any;
      },
      async takeRandom(
        amount: number = 1,
        ignoredIds = new Set()
      ): Promise<{ id: string }[]> {
        const countryIds = await prisma.$queryRaw(
          Prisma.sql`
                SELECT id FROM public."Country"
                          WHERE id NOT IN (${Array.from(ignoredIds).join(",")})
                          ORDER BY random() LIMIT ${amount}
               `
        );

        return countryIds as any;
      },
    },
  },
});
