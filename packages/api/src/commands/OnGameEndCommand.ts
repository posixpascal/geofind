import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { GAME_END_STATE } from '../constants/game'

export class OnGameEndCommand extends Command<CountryRoom, {}> {
  async execute(payload: this['payload']) {
    this.state.state = GAME_END_STATE
  }
}
