import { row2country } from './countryToState'
import { client } from './client'
import { FIND_COUNTRY_BY_CODE } from '../sql/countries'

export const getCountryByCode = async (code) => {
  const res = await client.query(FIND_COUNTRY_BY_CODE, [code.toUpperCase()])

  return row2country(res.rows[0])
}
