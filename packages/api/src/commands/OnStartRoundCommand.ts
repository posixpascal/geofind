import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { OnEndRoundCommand } from './OnEndRoundCommand'
import distanceBetween from '../functions/distanceBetween'
import { ROUND_START_STATE } from '../constants/game'
import {PartyRoom} from "../rooms/PartyRoom";
import {PartyRoomState} from "../rooms/schema/game_modes/PartyRoomState";

export class OnStartRoundCommand extends Command<CountryRoom | PartyRoom, {}> {
  async execute(payload: this['payload']) {
    this.state.votes.forEach((vote) => {
      vote.isCorrect = false
      vote.distance = distanceBetween(
        [vote.lat, vote.lng],
        [this.state.country.lat, this.state.country.lng]
      )
    })
    this.state.rounds++
    this.state.state = ROUND_START_STATE
    this.state.timer = this.state.roundTime
    if (this.state.room === "party"){
      (this.state as PartyRoomState).playersReady = 0;
      (this.state as PartyRoomState).playersNeeded = Math.max(1, Math.floor(this.state.players.size / 2.5));
    }

    let countdown = this.clock.setInterval(() => {
      if (this.state.timer > 0) this.state.timer -= 1
      if (this.state.timer < 0){
        countdown.clear();
      }
    }, 1000)

    this.room.roundTimer = this.clock.setTimeout(() => {
      countdown.clear()
      this.room.dispatcher.dispatch(new OnEndRoundCommand())
    }, this.state.roundTime * 1000) as any
  }
}
