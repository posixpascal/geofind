import { countryFactory } from './countryFactory'
import { client } from './client'
import { FIND_COUNTRY_BY_CODE } from './query/countries'

export const getCountryByCode = async (code) => {
  const res = await client.query(FIND_COUNTRY_BY_CODE, [code.toUpperCase()])

  return countryFactory(res.rows[0])
}
