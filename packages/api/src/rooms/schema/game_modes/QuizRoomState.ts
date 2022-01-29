import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema'
import { Player } from '../entities/PlayerState'
import { Vote } from '../entities/VoteState'
import { Country } from '../entities/CountryState'
import { ScoreBoard } from '../entities/ScoreBoardState'

export class QuizRoomState extends Schema {
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
}
