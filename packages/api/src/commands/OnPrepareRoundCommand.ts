import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { OnStartRoundCommand } from './OnStartRoundCommand'
import { ROUND_PREPARE_STATE } from '../constants/game'
import { getRandomCountry } from '../db/getRandomCountry'

export class OnPrepareRoundCommand extends Command<CountryRoom, {}> {
  async execute(payload: this['payload']) {
    if (this.state.rounds === 0){
      this.state.country = await getRandomCountry(
          this.state,
          this.state.blacklist.toArray()
      )
    }
    await this.room.setPrivate(true)

    this.state.state = ROUND_PREPARE_STATE
    this.state.rounds += 1

    //this.state.blacklist.push(this.state.country.id)

    this.clock.setTimeout(async () => {
      await this.room.dispatcher.dispatch(new OnStartRoundCommand())
    }, 2500)
  }
}
