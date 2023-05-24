"use strict";
// Prisma and Geo was a bad idea.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoPrisma = exports.countryScalarFields = void 0;
const prisma_1 = require("@/server/prisma");
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("@/server/logger"));
const countryFields = client_1.Prisma.dmmf.datamodel.models.find((model) => model.name === "Country").fields;
exports.countryScalarFields = countryFields
    .filter((s) => s.kind === "scalar")
    .map((s) => s.name);
exports.geoPrisma = prisma_1.prisma.$extends({
    model: {
        country: {
            async findOne(where) {
                return await prisma_1.prisma.country.findUnique({
                    select: exports.countryScalarFields.reduce((acc, cur) => {
                        return { ...acc, [cur]: true };
                    }, {}),
                    where,
                });
            },
            async withLngLat(id) {
                logger_1.default.info({
                    event: "QueryCountryWithLatLng",
                    data: { countryId: id },
                });
                const country = await prisma_1.prisma.$queryRaw(client_1.Prisma.sql `
                        SELECT id, "nameCommon", "flagEmoji", ST_X("Country"."latLng"::geometry) as lat, ST_Y("Country"."latLng"::geometry) as lng
                        FROM public."Country"
                        WHERE id = ${id}
          `);
                return country;
            },
            async within(lngLat) {
                logger_1.default.info({
                    event: "QueryCountryWithinLatLng",
                    data: { lngLat },
                });
                const countriesWithin = await prisma_1.prisma.$queryRaw(client_1.Prisma.sql `
                        SELECT id, "nameCommon", "flagEmoji", ST_X("Country"."latLng"::geometry) as lat, ST_Y("Country"."latLng"::geometry) as lng
                        FROM public."Country"
                        WHERE ST_Contains("Country".shape, ST_SetSRID(ST_MakePoint(${String(lngLat.lng)}::numeric, ${String(lngLat.lat)}::numeric), 0))
                        GROUP BY "Country".id
                        ORDER BY "Country".id; 
                    `);
                return countriesWithin;
            },
            async takeRandom(amount = 1, ignoredIds = new Set()) {
                const countryIds = await prisma_1.prisma.$queryRaw(client_1.Prisma.sql `
                SELECT id FROM public."Country"
                          WHERE id NOT IN (${Array.from(ignoredIds).join(",")})
                          ORDER BY random() LIMIT ${amount}
               `);
                return countryIds;
            },
        },
    },
});
