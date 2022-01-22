import { row2country } from './countryToState'
import { client } from './client'
import { FIND_COUNTRY_BY_CODE, FIND_COUNTRY_BY_LATLNG } from '../sql/countries'

export const getCountryByLatLng = async ([lat, long]) => {
  const res = await client.query(FIND_COUNTRY_BY_LATLNG, [lat, long])
  if (!res.rows.length) {
    return false
  }

  return row2country(res.rows[0])
}
