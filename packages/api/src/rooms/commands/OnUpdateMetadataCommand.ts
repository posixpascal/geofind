import { Command } from "@colyseus/command";
import { CountryRoom } from "../CountryRoom";
import { getRandomCountry } from "../../db";
import { OnEndRoundCommand } from "./OnEndRoundCommand";
import distanceBetween from "../../functions/distanceBetween";
import { ROUND_START_STATE } from "../../constants/game";

export class OnUpdateMetadataCommand extends Command<CountryRoom, {}> {
  async execute() {
    await this.room.setMetadata({
      room: this.state.room,
      map: this.state.map,
      hasBorders: this.state.hasBorders,
      maxPoints: this.state.maxPoints,
      roundTime: this.state.roundTime,
      hasIslands: this.state.hasIslands,
      isPublic: this.state.isPublic,
      hasStrictMatches: this.state.hasStrictMatches,
    });
  }
}
