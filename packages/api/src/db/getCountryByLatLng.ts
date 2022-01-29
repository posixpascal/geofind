import { countryFactory } from './countryFactory'
import { client } from './client'
import { FIND_COUNTRY_BY_CODE, FIND_COUNTRY_BY_LATLNG } from './query/countries'

export const getCountryByLatLng = async ([lat, long]) => {
  const res = await client.query(FIND_COUNTRY_BY_LATLNG, [lat, long])
  if (!res.rows.length) {
    return false
  }

  return countryFactory(res.rows[0])
}
