export type GameRoom =
  | 'countries'
  | 'capitals'
  | 'sightseeing'
  | 'domainhunt'
  | 'flags'
  | 'quiz'
  | 'speedrun'
  | 'party'
  | 'shapes'

export type MapType =
  | 'earth'
  | 'oceania'
  | 'europe'
  | 'asia'
  | 'africa'
  | 'america'

export interface GameSettings {
  room: GameRoom
  map: MapType
  hasStrictMatches: boolean
  roundTime: number
  maxPoints: number
  hasBorders: boolean
  hasIslands: boolean
  isPublic: boolean
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  room: 'countries',
  map: 'earth',
  hasStrictMatches: true,
  roundTime: 15,
  maxPoints: 10,
  hasBorders: true,
  hasIslands: true,
  isPublic: true,
}
