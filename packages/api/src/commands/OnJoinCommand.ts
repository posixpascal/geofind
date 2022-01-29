import { Command } from '@colyseus/command'
import { Player } from '../rooms/schema/entities/PlayerState'
import { CountryRoom } from '../rooms/CountryRoom'
import { Client } from 'colyseus'
import { ScoreBoard } from '../rooms/schema/entities/ScoreBoardState'
import { ConnectOptions } from '../constants/clients'

export class OnJoinCommand extends Command<
  CountryRoom,
  {
    client: Client
    options: ConnectOptions
  }
> {
  execute({ client, options }) {
    if (
      !this.state.creatorId ||
      !this.state.players.get(this.state.creatorId)
    ) {
      this.state.creatorId = client.sessionId
    }

    const player = new Player()
    player.username = options.username
    player.sessionId = client.sessionId
    player.connected = true
    player.pin = parseInt(options.pin) || 1
    this.state.players.set(client.sessionId, player)

    const scoreboard = new ScoreBoard()
    scoreboard.sessionId = client.sessionId
    scoreboard.points = 0
    if (this.state.scoreboard.has(client.sessionId)) {
      scoreboard.points = this.state.scoreboard.get(client.sessionId).points
    }

    this.state.scoreboard.set(client.sessionId, scoreboard)
  }
}
