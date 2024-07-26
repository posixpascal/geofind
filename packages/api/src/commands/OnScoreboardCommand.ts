import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { OnGameEndCommand } from './OnGameEndCommand'
import { OnPrepareRoundCommand } from './OnPrepareRoundCommand'
import { SCOREBOARD_STATE } from '../constants/game'
import {getRandomCountry} from "../db/getRandomCountry";

export class OnScoreboardCommand extends Command<CountryRoom, {}> {
  async execute(payload: this['payload']) {
    this.state.state = SCOREBOARD_STATE
    this.clock.setTimeout(
      async () => {
        // check gameover.
        let gameOver = false
        let hasSuddenDeath = false
        this.state.scoreboard.forEach((value, key) => {
          if (value.points >= this.state.maxPoints) {
            this.state.scoreboard.get(key).hasWon = true
            if (gameOver) {
              hasSuddenDeath = true
            }
            gameOver = true
          }
        })

        if (!hasSuddenDeath && gameOver) {
          this.room.dispatcher.dispatch(new OnGameEndCommand())
          return
        }

          this.state.country = await getRandomCountry(
              this.state,
              this.state.blacklist.toArray()
          )
            this.room.dispatcher.dispatch(new OnPrepareRoundCommand())
      },
      this.state.room === 'speedrun' ? 4000 : 8000
    )
  }
}
