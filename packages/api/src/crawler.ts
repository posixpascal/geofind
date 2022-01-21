// populate our countries with data from reverse geocoder.
import NodeGeocoder from 'node-geocoder'
import dotenv from 'dotenv'
import { client } from './db/client'
import { languages } from './constants/languages'
const fs = require('fs')
dotenv.config({
  path: './development.env',
})

import wiki from 'wikijs'

let START = 3
const getCountryByID = async (id) => {
  const result = await client.query(
    `SELECT *, ST_X(latlng::geometry) as lat, ST_Y(latlng::geometry) as lng FROM countries ORDER BY name ASC OFFSET $1 LIMIT 1`,
    [id]
  )
  return result.rows[0]
}

const translate = async (name, language) => {
  return wiki({ apiUrl: `https://${language}.wikipedia.org/w/api.php` })
    .page(name)
    .then((page) => page.info())
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const capitalKeys = {
  de: 'hauptstadt',
  en: 'capital',
  fr: 'capitale',
  es: 'capital',
  it: 'capitale',
  nl: 'hoofdstad',
}

const enhanceCountry = async () => {
  const pointer = START++
  const country = await getCountryByID(pointer)
  if (!country) {
    console.log('No more countries to process')
    return false
  }

  for await (const language of languages) {
    const country = await getCountryByID(pointer)
    console.info('Fetching Capital for ' + country.name + '  in ' + language)

    try {
      const capital = await translate(
        language === 'en' ? country.name : country.translations[language],
        language
      )
      const translatedCapitals = country.translated_capitals || {}
      translatedCapitals[language] = capital[capitalKeys[language]]
      if (Array.isArray(translatedCapitals[language])) {
        translatedCapitals[language] =
          translatedCapitals[language][language === 'it' ? 1 : 0]
      }
      if (!capitalKeys[language]) {
        console.log(capital, language)
        process.exit(0)
      }
      await client.query(
        `UPDATE countries SET translated_capitals = $1 WHERE id = $2`,
        [JSON.stringify(translatedCapitals), country.id]
      )
    } catch (e) {
      fs.appendFileSync(
        './errors.txt',
        country.name + ' ' + language + ' ' + e.message + '\n'
      )
      continue
    }
    await sleep(0.025 * 1000)
  }
  console.log('Country enhanced')
  await sleep(0.05 * 1000)
  return true
}

const enhanceCountries = async () => {
  while (await enhanceCountry()) {
    console.log('Proceeding to next country')
  }
  console.log('done')
}

const main = async () => {
  await client.connect()
  //await seed();
  await enhanceCountries()
}

main()
