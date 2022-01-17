import { Model } from '@vuex-orm/core'

interface Vote {
  lat: number
  lng: number
}

interface Player {
  sessionId: string
  username: string
  pin: number
}

interface Scoreboard {
  sessionId: string
  points: number
}

export class Room extends Model {
  static entity = 'rooms'

  public id!: number
  public name!: string
  public roomId!: string
  public map!: string
  public room!: string
  public phase!: string
  public state!: string
  public votes!: Record<string, Vote>
  public creatorId!: string
  public sessionId!: string
  public players!: Record<string, Player>
  public timer!: number
  public rounds!: number
  public hasStrictMatches!: boolean
  public isPublic!: boolean
  public hasIslands!: boolean
  public maxPoints!: number
  public roundTime!: number
  public hasBorders!: boolean
  public country!: any
  public scoreboard!: Record<string, Scoreboard>
  public roundResult!: any
  public gameResult!: any

  static fields() {
    return {
      id: this.uid(),
      name: this.string(''),
      roomId: this.string(null),
      map: this.string('earth'),
      room: this.string('countries'),
      phase: this.string('lobby'),
      state: this.string('round_start'),
      votes: this.attr(null),
      creatorId: this.string(''),
      sessionId: this.string(''),
      players: this.attr(null),
      timer: this.number(15),
      rounds: this.number(0),
      hasStrictMatches: this.boolean(false),
      isPublic: this.boolean(false),
      hasIslands: this.boolean(false),
      maxPoints: this.number(15),
      roundTime: this.number(15),
      hasBorders: this.boolean(false),
      country: this.attr(null),
      scoreboard: this.attr(null),
    }
  }

  get player() {
    for (const player in this.players) {
      if (player === this.sessionId) {
        return this.players[player]
      }
    }

    return null
  }

  static async insertFromColyseus(room) {
    const existingRoom = await Room.query().where('roomId', room.id).first()
    if (existingRoom) {
      return
    }

    await Room.insert({
      data: {
        roomId: room.id,
        sessionId: room.sessionId,
        state: {},
      },
    })
  }
}
