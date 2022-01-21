import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { PLAY_PHASE, ROUND_START_STATE } from '../constants/game'
import { OnPrepareRoundCommand } from './OnPrepareRoundCommand'
import { Client } from 'colyseus'

export class OnRoomRestartCommand extends Command<
  CountryRoom,
  {
    client: Client
  }
> {
  validate({ client }) {
    return client.sessionId === this.state.creatorId
  }

  async execute({ client }) {
    this.state.votes.clear()
    this.state.scoreboard.forEach((score) => {
      score.points = 0
    })

    this.state.state = ROUND_START_STATE
    this.state.phase = PLAY_PHASE
    this.state.rounds = 0
    this.room.dispatcher.dispatch(new OnPrepareRoundCommand())
  }
}
