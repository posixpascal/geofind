import { reverseCoordinates } from "../../geocoder";
import { Vote } from "../schema/VoteState";
import { getCountryByCode } from "../../db";
import distanceBetween from "../../functions/distanceBetween";
import { Command } from "@colyseus/command";
import { CountryRoom } from "../CountryRoom";
import { Client } from "colyseus";

export class OnVoteCommand extends Command<
  CountryRoom,
  {
    client: Client;
    latlng: [number, number];
  }
> {
  async execute({ client, latlng }) {
    let geocoder = await reverseCoordinates(latlng);

    const vote = new Vote();
    vote.hasCountry = false;

    if (geocoder.countryCode) {
      const country = await getCountryByCode(geocoder.countryCode);
      vote.country = country;
      vote.hasCountry = true;
      vote.isCorrect = country.id === this.state.country.id;
    }

    vote.distance = distanceBetween(latlng, [
      this.state.country.lat,
      this.state.country.lng,
    ]);
    vote.lat = geocoder.latitude;
    vote.lng = geocoder.longitude;
    this.state.votes.set(client.sessionId, vote);
  }
}
