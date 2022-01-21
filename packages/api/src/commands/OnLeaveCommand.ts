import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { Client } from 'colyseus'
import { ALLOW_RECONNECTION_FOR_SECONDS } from '../config'
import { LOBBY_PHASE } from '../constants/game'

export class OnLeaveCommand extends Command<
  CountryRoom,
  {
    client: Client
    consented: boolean
  }
> {
  async execute({ client, consented }) {
    if (this.state.state === LOBBY_PHASE) {
      this.state.players.delete(client.sessionId)
      return
    }

    this.state.players.get(client.sessionId).connected = false

    try {
      await this.room.allowReconnection(client, ALLOW_RECONNECTION_FOR_SECONDS)
      this.state.players.get(client.sessionId).connected = true
    } catch (e) {
      this.state.players.delete(client.sessionId)
    }
  }
}
