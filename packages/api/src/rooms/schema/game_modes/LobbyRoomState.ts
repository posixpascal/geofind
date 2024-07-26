import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema'
import { Player } from '../entities/PlayerState'
import { Vote } from '../entities/VoteState'
import { Country } from '../entities/CountryState'
import { ScoreBoard } from '../entities/ScoreBoardState'

export class LobbyRoomState extends Schema {
  @type({ map: 'boolean' }) players = new MapSchema<boolean>()
 

}
