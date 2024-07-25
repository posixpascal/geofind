import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { OnScoreboardCommand } from './OnScoreboardCommand'
import { ROUND_END_STATE } from '../constants/game'
import { OnPrepareRoundCommand } from './OnPrepareRoundCommand'
import {PartyRoom} from "../rooms/PartyRoom";

export class OnContinueRoundCommand extends Command<PartyRoom, {}> {
  async execute(payload: this['payload']) {
    this.state.playersReady++;

  }
}
