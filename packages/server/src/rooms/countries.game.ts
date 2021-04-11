import {User, verifyToken} from "@colyseus/social";
import {Client, Delayed, Room} from "colyseus";
import {COUNTRIES} from "../config/countries";
import {TRANSLATED_COUNTRIES} from "../config/translatedCountries";
import {GameMode} from "../GameMode";
import {CountriesGame} from "../schema/CountriesGame";
import {Country} from "../schema/Country";
import {Player} from "../schema/Player";
import {ScoreBoard} from "../schema/ScoreBoard";
import {Vote} from "../schema/Vote";
import {googleMapsClient} from "../util/googlemaps";
import logger from "../util/logger";
import {distanceInKm} from "../util/math";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;


const MAP_SETS = {
    earth: COUNTRIES,
};

export class CountriesGameRoom extends Room<CountriesGame> {
    public options;
    public mapSet: any;

    public async onAuth(client: Client, options: any) {
        const token = verifyToken(options.token);
        try {
            const user = await User.findById(token._id);
            if (user) {
                return user;
            }
        } catch (err) {
            return User.create();
        }
        return User.create();
    }

    public async onJoin(client: Client, options: any) {
        if (!this.state.leaderId) {
            this.state.leaderId = client.auth._id.toString();
        }

        const player = new Player();
        player.id = client.auth._id.toString();
        player.playerId = client.sessionId;
        player.displayName = client.auth.displayName;
        player.color = client.auth.metadata.pin_color;
        player.avatarUrl = client.auth.avatarUrl;
        player.isReady = false;

        this.state.players[client.sessionId] = player;

        this.state.scoreboard[client.sessionId] = new ScoreBoard();
        this.state.scoreboard[client.sessionId].score = 0;
        this.state.scoreboard[client.sessionId].player = player;

        this.state.mode = GameMode.PREPARING;
    }


    public async onLeave(client: Client, consented?: boolean): Promise<any> {
        delete this.state.players[client.sessionId];
    }

    public onCreate(options: any = {}) {
        this.options = options;
        this.mapSet = MAP_SETS[this.options.set];
        this.setState(new CountriesGame());
        this.state.mapSet = this.options.set;
        this.state.gameMode = "countries";

        this.onMessage("ready", (client, message) => {
            this.state.players[client.sessionId].isReady = true;
            if (this.playersReady()) {
                this.startGame();
            }
        });

        this.onMessage("vote", (client, message) => {
            const vote = new Vote();
            vote.player = this.state.players[client.sessionId];
            vote.lat = message.lat;
            vote.lng = message.lng;
            const country = new Country();
            googleMapsClient.reverseGeocode({latlng: [vote.lat, vote.lng], result_type: "country"}, (err, res) => {
                if (err) {
                    logger.error("Unable to resolve country address information from googleMaps", err);

                    // store vote without resolved countryCode
                    vote.country = this.state.country;
                    vote.distanceInKm = distanceInKm(this.state.country, vote);
                    this.state.votes[client.sessionId] = vote;
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
                    vote.country = country;
                }

                vote.distanceInKm = distanceInKm(this.state.country, vote);

                this.state.votes[client.sessionId] = vote;
            });
        });
    }

    public playersReady() {
        let ready = true;
        this.state.players.forEach((player) => {
            if (!player.isReady) {
                ready = false;
            }
        });
        return ready;
    }

    public startGame() {
        this.state.mode = GameMode.STARTING;
        this.state.gameStartsIn = 3;
        const timer = setInterval(() => {
            this.state.gameStartsIn -= 1;
            if (this.state.gameStartsIn <= 0) {
                this.prepareRound();
                return clearInterval(timer);
            }
        }, 1000);
    }

    public prepareRound() {
        this.state.votes.forEach((vote) => {
            this.state.votes[vote.player.playerId].hasWon = false;
        });
        this.broadcast("mapreset");
        this.state.mode = GameMode.ROUND_PREPARE;
        this.state.roundTime = this.options.roundTime || 15;

        this.setCountry();
        setTimeout(() => {
            this.startRound();
        }, 5000);
    }

    public startRound() {
        this.state.mode = GameMode.ROUND_START;
        const timer = setInterval(() => {
            this.state.roundTime -= 1;
            if (this.state.roundTime <= 0) {
                clearInterval(timer);
                this.endRound();
            }
        }, 1000);
    }

    public endRound() {
        this.state.mode = GameMode.ROUND_END;

        this.state.votes.forEach((vote) => {
            if (vote.country && vote.country.countryCode === this.state.country.countryCode) {
                this.state.votes[vote.player.playerId].hasWon = true;
            }
        });

        this.updateScoreboard();
        setTimeout(() => {
            this.prepareRound();
        }, 8000);
    }

    public updateScoreboard() {
        this.state.votes.forEach((vote) => {
            if (vote.hasWon) {
                this.state.scoreboard[vote.player.playerId].score += 1;
            }
        });
    }

    public setCountry() {
        const randomCountry = this.mapSet[Math.floor(Math.random() * this.mapSet.length)];
        const country = new Country();
        country.countryCode = randomCountry.country_code;
        country.lat = randomCountry.latlng[0];
        country.lng = randomCountry.latlng[1];
        country.countryNameEn = randomCountry.name;
        country.countryNameDe = TRANSLATED_COUNTRIES[country.countryCode] || country.countryNameEn;
        this.state.country = country;
    }
}
