import { Command } from "@colyseus/command";
import { CountryRoom } from "../CountryRoom";
import { Client } from "colyseus";
import { LOBBY_PHASE } from "../../constants/game";

export class OnLobbyCommand extends Command<
  CountryRoom,
  {
    client: Client;
  }
> {
  validate({ client }): boolean {
    return client.sessionId === this.state.creatorId;
  }

  async execute({ client, latlng }) {
    this.state.votes.clear();
    this.state.scoreboard.forEach((score) => {
      score.points = 0;
    });
    this.state.phase = LOBBY_PHASE;
    await this.room.setPrivate(!this.state.isPublic);
  }
}
