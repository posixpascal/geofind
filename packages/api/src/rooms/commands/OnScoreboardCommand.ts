import { Command } from "@colyseus/command";
import { CountryRoom } from "../CountryRoom";
import { OnGameEndCommand } from "./OnGameEndCommand";
import { OnPrepareRoundCommand } from "./OnPrepareRoundCommand";
import { SCOREBOARD_STATE } from "../../constants/game";

export class OnScoreboardCommand extends Command<CountryRoom, {}> {
  async execute(payload: this["payload"]) {
    this.state.state = SCOREBOARD_STATE;
    this.clock.setTimeout(() => {
      // check gameover.
      let gameOver = false;
      let hasSuddenDeath = false;
      this.state.scoreboard.forEach((value, key) => {
        if (value.points >= this.state.maxPoints) {
          this.state.scoreboard.get(key).hasWon = true;
          if (gameOver) {
            hasSuddenDeath = true;
          }
          gameOver = true;
        }
      });

      if (!hasSuddenDeath && gameOver) {
        this.room.dispatcher.dispatch(new OnGameEndCommand());
        return;
      }

      this.room.dispatcher.dispatch(new OnPrepareRoundCommand());
    }, 8000);
  }
}
