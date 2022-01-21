import { Schema, MapSchema, type } from '@colyseus/schema'

export class ScoreBoard extends Schema {
  @type('string') sessionId: string
  @type('number') points: number
  @type('boolean') hasWon: boolean
}
