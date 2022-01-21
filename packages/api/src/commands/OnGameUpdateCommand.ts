import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'

export class OnGameEndCommand extends Command<CountryRoom, {}> {
  async execute(payload: this['payload']) {}
}
