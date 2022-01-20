import { Command } from "@colyseus/command";
import { CountryRoom } from "../CountryRoom";
import { OnScoreboardCommand } from "./OnScoreboardCommand";
import { ROUND_END_STATE } from "../../constants/game";

export class OnEndRoundCommand extends Command<CountryRoom, {}> {
  async execute(payload: this["payload"]) {
    this.state.state = ROUND_END_STATE;
    let hasCorrectVote = false;
    this.state.votes.forEach((value, key) => {
      if (value.isCorrect) {
        hasCorrectVote = true;
        this.state.scoreboard.get(key).points += 1;
      }
    });

    if (!hasCorrectVote && !this.state.hasStrictMatches) {
      let lowestDistance = Number.POSITIVE_INFINITY;
      this.state.votes.forEach((value, key) => {
        if (value.distance < lowestDistance) {
          lowestDistance = value.distance;
        }
      });

      this.state.votes.forEach((value, key) => {
        if (value.distance === lowestDistance) {
          this.state.scoreboard.get(key).points += 1;
          this.state.votes.get(key).isCorrect = true;
        }
      });
    }

    // check scoreboard
    this.clock.setTimeout(() => {
      this.room.dispatcher.dispatch(new OnScoreboardCommand());
    }, 4000);
  }
}
