import { row2country } from './countryToState'
import { client } from './client'
import { CountryRoomState } from '../rooms/schema/CountryRoomState'
import {
  REGIONS,
  SUBREGIONS,
  SUBREGIONS_EXCLUDING_ISLANDS,
} from '../constants/world'
import { FIND_COUNTRY_QUERY } from '../sql/countries'

export const getRandomCountry = async (
  state: CountryRoomState,
  excluded = []
) => {
  const { rows } = await client.query(FIND_COUNTRY_QUERY, [
    excluded,
    REGIONS[state.map],
    state.hasIslands ? SUBREGIONS : SUBREGIONS_EXCLUDING_ISLANDS,
  ])

  // Restarts the country selection but omit excluded countries to avoid 0 results.
  if (rows.length === 0) {
    return await getRandomCountry(state, [])
  }

  return row2country(rows[0])
}
