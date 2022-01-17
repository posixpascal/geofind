import fs from "fs/promises";
import { randomUUID } from "crypto";
import { CountryRoomState } from "./rooms/schema/CountryRoomState";
import { Country } from "./rooms/schema/CountryState";
import { Translation } from "./rooms/schema/TranslationState";

const { Client } = require("pg");
process.env.PGSSLMODE = "require";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = String(0);

export const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      // Ref.: https://github.com/brianc/node-postgres/issues/2009
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
});

export const getCountries = async () => {
  const res = await client.query(`
    SELECT * FROM countries
  `);
  return res.rows;
};

const row2country = (data) => {
  const country = new Country();
  country.id = data.id;
  country.alpha2code = data.alpha2code;
  country.alpha3code = data.alpha3code;
  country.capital = data.capital;
  country.region = data.region;
  country.subregion = data.subregion;
  country.population = data.population;
  country.area = data.area;

  for (const languageCode in data.translations) {
    const translation = new Translation();
    translation.capital = data.capital;
    translation.country = data.translations[languageCode];
    country.translations.set(languageCode, translation);
  }

  country.topleveldomain = data.topleveldomain;
  country.lat = data.lat;
  country.lng = data.lng;
  country.borders = data.borders;

  return country;
};

export const getCountryByCode = async (code) => {
  const res = await client.query(
    `
    SELECT *, ST_X(latlng::geometry) as lat, ST_Y(latlng::geometry) as lng FROM countries 
        WHERE alpha2code = $1
        ORDER BY random()
        LIMIT 1
  `,
    [code.toUpperCase()]
  );

  return row2country(res.rows[0]);
};

export const getRandomCountry = async (
  state: CountryRoomState,
  excluded = []
) => {
  let regions = ["Asia", "Oceania", "Africa", "Europe", "Americas"];
  let subregions = [
    "Caribbean",
    "Eastern Africa",
    "Southern Europe",
    "Eastern Asia",
    "South America",
    "Australia and New Zealand",
    "Western Africa",
    "Micronesia",
    "Melanesia",
    "Southern Asia",
    "Eastern Europe",
    "Middle Africa",
    "Polynesia",
    "Northern Africa",
    "Central America",
    "Central Asia",
    "Western Europe",
    "Western Asia",
    "South-Eastern Asia",
    "Northern Europe",
    "Northern America",
    "Southern Africa",
  ];

  switch (state.map) {
    case "earth":
      break;
    case "europe":
      regions = ["Europe"];
      break;

    case "oceania":
      regions = ["Oceania"];
      break;
    case "asia":
      regions = ["Asia"];
      break;
    case "america":
      regions = ["Americas"];
      break;
    case "africa":
      regions = ["Africa"];
      break;
  }

  if (!state.hasIslands) {
    subregions = subregions.filter((subregion) => {
      return (
        subregion !== "Polynesia" &&
        subregion !== "Micronesia" &&
        subregion !== "Carribean"
      );
    });
  }

  const res = await client.query(
    `
    SELECT *, ST_X(latlng::geometry) as lat, ST_Y(latlng::geometry) as lng FROM countries 
        WHERE NOT id = ANY($1)
        AND region = ANY($2)
        AND subregion = ANY($3)
        ORDER BY random()
        LIMIT 1
  `,
    [excluded, regions, subregions]
  );

  if (res.rows.length === 0) {
    return await getRandomCountry(state, []);
  }

  const [data] = res.rows;
  return row2country(data);
};

export const seed = async () => {
  const countriesData = await fs.readFile("./src/countries.json", "utf-8");

  const geometryData = await fs.readFile("./src/geometry.geojson", "utf-8");

  const countries = JSON.parse(countriesData);
  const geometries = JSON.parse(geometryData);

  for await (const country of countries) {
    const shape = geometries.features.find(
      (geometry) => geometry.properties.ISO_A3 === country.alpha3Code
    );

    if (country.latlng.length === 0) {
      continue;
    }

    await client.query(
      `INSERT INTO countries (
        id,
        name,
        alpha2Code,
        alpha3Code,
        capital,
        region,
        subregion,
        population,
        area,
        languages,
        topLevelDomain,
        timezones,
        translations,
        currencies,
        borders,
        latlng
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16
      ) RETURNING *
    `,

      [
        randomUUID(),
        country.name,
        country.alpha2Code,
        country.alpha3Code,
        country.capital,
        country.region,
        country.subregion,
        country.population,
        country.area,
        JSON.stringify(country.languages),
        JSON.stringify(country.topLevelDomain),
        JSON.stringify(country.timezones),
        JSON.stringify(country.translations),
        JSON.stringify(country.currencies),
        JSON.stringify(country.borders),
        JSON.stringify({ type: "Point", coordinates: country.latlng }),
      ]
    );
  }
};
