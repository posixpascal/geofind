import {handle, Handler} from "./index";
import {Client} from "colyseus";
import {Country, CountryGameVote} from "../schema/CountriesGame";
import {googleMapsClient} from "../util/googlemaps";
import {distanceInKm} from "../util/math";
import logger from "../util/logger";

export class CountryGameHandler extends Handler {
    @handle("game:vote")
    gameVote(client: Client, payload: any) {
        if (this.room.state.roundEnd) {
            return;
        }

        const vote = new CountryGameVote();

        const country = new Country();
        country.lat = payload.lat;
        country.lng = payload.lng;
        country.countryCode = "";
        country.countryNameEn = "(unknown)";
        country.countryNameDe = "(irgendwo)";

        googleMapsClient.reverseGeocode({latlng: payload, result_type: "country"}, (err, res) => {
            if (err) {
                logger.error("Unable to resolve country address information from googleMaps");
                // store vote without resolved countryCode
                vote.hasVoted = true;
                vote.hasWon = false;
                vote.country = country;
                vote.distanceInKm = distanceInKm(this.room.state.country, payload);
                this.room.state.votes[client.sessionId] = vote;
                return;
            }

            const geocodingResult = res.json.results[0];

            // extracts formatted address and country name from google maps api response
            if (res.json.results[0]) {
                if (geocodingResult.address_components[0]) {
                    country.countryCode = geocodingResult.address_components[0].short_name;
                }
                country.countryNameEn = res.json.results[0].formatted_address;
                country.countryNameDe = res.json.results[0].formatted_address;
            }

            vote.hasVoted = true;
            vote.hasWon = this.room.state.country.countryCode && this.room.state.country.countryCode === country.countryCode;
            vote.distanceInKm = distanceInKm(this.room.state.country, payload);
            vote.country = country;

            this.room.state.votes[client.sessionId] = vote;
        });
    }
}
