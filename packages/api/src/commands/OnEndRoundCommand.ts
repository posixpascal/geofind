import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { OnScoreboardCommand } from './OnScoreboardCommand'
import { ROUND_END_STATE, ROUND_PARTY_END_STATE } from '../constants/game'
import {PartyRoomState} from "../rooms/schema/game_modes/PartyRoomState";

export class OnEndRoundCommand extends Command<CountryRoom, {}> {
  async execute(payload: this['payload']) {
    this.state.state = this.state.room === "party" ? ROUND_PARTY_END_STATE : ROUND_END_STATE
    let hasCorrectVote = false
    this.state.votes.forEach((value, key) => {
      if (value.isCorrect) {
        hasCorrectVote = true
        this.state.scoreboard.get(key).points += 1
      }
    })

    if (!hasCorrectVote && !this.state.hasStrictMatches) {
      let lowestDistance = Number.POSITIVE_INFINITY
      this.state.votes.forEach((value, key) => {
        if (value.distance < lowestDistance) {
          lowestDistance = value.distance
        }
      })

      this.state.votes.forEach((value, key) => {
        if (value.distance === lowestDistance) {
          this.state.scoreboard.get(key).points += 1
          this.state.votes.get(key).isCorrect = true
        }
      })
    }

    if (this.state.room === 'speedrun') {
      this.room.dispatcher.dispatch(new OnScoreboardCommand())
      return
    }

    if (this.state.room === 'party'){
      let counter = this.clock.setInterval(() => {
        if ((this.state as PartyRoomState).playersReady >= (this.state as PartyRoomState).playersNeeded) {
          // check scoreboard
            counter.clear();
            this.room.dispatcher.dispatch(new OnScoreboardCommand());
        }
      }, 1000)
      return;
    }

    // check scoreboard
    this.clock.setTimeout(() => {
      this.room.dispatcher.dispatch(new OnScoreboardCommand())
    }, 4000)
  }
}
