import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { client } from './client'
import { INSERT_NEW_COUNTRY } from '../sql/countries'

export const seed = async () => {
  const countriesData = await fs.readFile('./src/data/countries.json', 'utf-8')
  const geometryData = await fs.readFile('./src/data/geometry.geojson', 'utf-8')

  const countries = JSON.parse(countriesData)
  const geometries = JSON.parse(geometryData)

  for await (const country of countries) {
    await seedCountry(country, geometries)
  }
}

const seedCountry = async (country, geometries) => {
  const shape = geometries.features.find(
    (geometry) => geometry.properties.ISO_A3 === country.alpha3Code
  )

  if (country.latlng.length === 0) {
    return
  }

  await client.query(INSERT_NEW_COUNTRY, [
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
    JSON.stringify({ type: 'Point', coordinates: country.latlng }),
    shape ? shape.geometry : null,
  ])
}
