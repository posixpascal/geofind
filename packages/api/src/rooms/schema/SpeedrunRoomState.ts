import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema'
import { Player } from './PlayerState'
import { Vote } from './VoteState'
import { Country } from './CountryState'
import { ScoreBoard } from './ScoreBoardState'

export class SpeedrunRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>()
  @type({ map: Vote }) votes = new MapSchema<Vote>()
  @type({ map: ScoreBoard }) scoreboard = new MapSchema<ScoreBoard>()

  @type('string') creatorId: string
  @type('string') state: string
  @type(Country) country: Country = new Country()
  @type(['string']) blacklist = new ArraySchema<string>()
  @type('boolean') hasStrictMatches: boolean
  @type('number') timer: number
  @type('number') rounds: number = 0
  @type('string') map: string
  @type('string') room: string
  @type('string') phase: string
  @type('number') roundTime: number
  @type('number') maxPoints: number
  @type('boolean') hasBorders: boolean
  @type('boolean') hasIslands: boolean
  @type('boolean') isPublic: boolean
  @type('float32') roundSecondsElapsed: number
}
