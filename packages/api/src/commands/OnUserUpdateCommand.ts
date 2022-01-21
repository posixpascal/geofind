import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { Client } from 'colyseus'
import { UserSettings } from '../constants/clients'

export class OnUserUpdateCommand extends Command<
  CountryRoom,
  {
    client: Client
    message: UserSettings
  }
> {
  async execute({ client, message }) {
    const player = this.state.players.get(client.sessionId)

    if ('username' in message) {
      player.username = message.username
    }

    if ('pin' in message) {
      player.pin = message.pin
    }

    this.state.players.set(client.sessionId, player)
  }
}
