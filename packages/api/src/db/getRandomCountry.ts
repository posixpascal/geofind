import { countryFactory } from './countryFactory'
import { client } from './client'
import { CountryRoomState } from '../rooms/schema/game_modes/CountryRoomState'
import {
  REGIONS,
  SUBREGIONS,
  SUBREGIONS_EXCLUDING_ISLANDS,
} from '../constants/world'
import { FIND_COUNTRY_QUERY } from './query/countries'

export const getRandomCountry = async (
  state: Partial<CountryRoomState>,
  excluded = []
) => {
  const { map, hasIslands } = state
  const { rows } = await client.query(FIND_COUNTRY_QUERY, [
    excluded,
    REGIONS[map || 'earth'],
    state.hasIslands ? SUBREGIONS : SUBREGIONS_EXCLUDING_ISLANDS,
  ])

  // Restarts the country selection but omit excluded countries to avoid 0 results.
  if (rows.length === 0) {
    return await getRandomCountry(state, [])
  }

  return countryFactory(rows[0])
}
