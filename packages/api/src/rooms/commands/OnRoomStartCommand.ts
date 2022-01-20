import { Command } from "@colyseus/command";
import { CountryRoom } from "../CountryRoom";
import { OnScoreboardCommand } from "./OnScoreboardCommand";
import { PLAY_PHASE, ROUND_END_STATE } from "../../constants/game";
import { OnPrepareRoundCommand } from "./OnPrepareRoundCommand";
import { Client } from "colyseus";

export class OnRoomStartCommand extends Command<
  CountryRoom,
  {
    client: Client;
  }
> {
  validate({ client }) {
    return client.sessionId === this.state.creatorId;
  }

  async execute({ client }) {
    this.state.phase = PLAY_PHASE;
    this.room.dispatcher.dispatch(new OnPrepareRoundCommand());
  }
}
