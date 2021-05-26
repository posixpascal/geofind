import {User, verifyToken} from "@colyseus/social";
import {Client, Delayed, Room, updateLobby} from "colyseus";
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
import {CoreGameRoom} from "./CoreGameRoom";

const DEFAULT_ROUND_TIME = 5;
const DEFAULT_GAME_START_TIME = 3;
const DEFAULT_ROUND_DETAIL_TIME = 3;
const DEFAULT_SCOREBOARD_TIME = 7;
const DEFAULT_ROUND_COOLDOWN_TIME = 15;
const DEFAULT_MAX_ROUNDS = 10;

const MAP_SETS = {
    earth: COUNTRIES,
    africa: COUNTRIES.filter(country => {
        return country.region === 'Africa';
    }),
    asia: COUNTRIES.filter(country => {
        return country.region === 'Asia';
    }),
    europe: COUNTRIES.filter(country => {
        return country.region === 'Europe';
    }),
    america: COUNTRIES.filter(country => {
        return country.region === 'Americas';
    }),
    oceania: COUNTRIES.filter(country => {
        return country.region === 'Oceania';
    }),
};

export class CountriesGameRoom extends CoreGameRoom<CountriesGame> {
    public options;
    public matchmakingTimer = null;

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
        player.pin = client.auth.metadata.pin;
        player.isReady = false;

        this.state.players[client.sessionId] = player;

        this.state.scoreboard[client.sessionId] = new ScoreBoard();
        this.state.scoreboard[client.sessionId].score = 0;
        this.state.scoreboard[client.sessionId].player = player;

        this.state.mode = GameMode.PREPARING;

        if (this.options.singleplayer) {
            this.startGame();
        }

        clearInterval(this.matchmakingTimer);
        this.matchmakingTimer = setInterval(() => {
            if (this.options.matchmaking && this.state.mode === GameMode.PREPARING) {
                if (Object.keys(this.state.players).length > 1) {
                    this.startGame();
                }
            }
        }, 8000);
    }

    public async onLeave(client: Client, consented?: boolean): Promise<any> {
        delete this.state.players[client.sessionId];
        delete this.state.votes[client.sessionId];
        delete this.state.scoreboard[client.sessionId];
    }

    public onCreate(options: any = {}) {
        this.setState(new CountriesGame());
        this.state.mode = GameMode.PREPARING;
        this.options = options;

        this.clock.setInterval(() => {
            this.setMetadata({
                mapSet: this.options.set,
                gameMode: this.options.mode,
                mode: this.state.mode,
                matchmaking: !!options.matchmaking,
                roundTime: parseInt(this.options.roundTime, 10) || DEFAULT_ROUND_TIME,
                maxRounds: parseInt(this.options.maxRounds, 10) || DEFAULT_MAX_ROUNDS,
                pointsNeeded: parseInt(this.options.pointsNeeded, 10),
                borders: this.options.borders,
                suddenDeath: this.options.suddenDeath,
                directMatchesOnly: this.options.directMatchesOnly,
                public: this.options.public
            }).then(() => updateLobby(this));

            if (this.options.public && this.locked) {
                this.unlock();
            }

            if (!this.options.public && !this.locked) {
                this.lock();
            }
        }, 1000);

        this.options = options;
        this.mapSet = MAP_SETS[this.options.set];

        this.reset();

        this.onMessage("ready", (client, message) => {
            this.state.players[client.sessionId].isReady = true;
        });


        this.onMessage('updateSettings', (client, message) => {
            this.options = message;
            this.reset();
        });

        this.onMessage('updatePlayer', (client) => {
            console.log('updatePlayer', client);
            const player = new Player();
            player.id = client.auth._id.toString();
            player.playerId = client.sessionId;
            player.displayName = client.auth.displayName;
            player.color = client.auth.metadata.pin_color;
            player.avatarUrl = client.auth.avatarUrl;
            player.pin = client.auth.metadata.pin;
            player.isReady = false;

            this.state.players[client.sessionId] = player;
        });

        this.onMessage("start", (client) => {
            this.startGame();
        });

        this.onMessage("unready", (client, message) => {
            this.state.players[client.sessionId].isReady = false;
        });

        this.onMessage("restart", (client, message) => {
            this.reset();
            this.startGame();
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

    public reset() {
        // Initial setup
        this.state.mapSet = this.options.set;
        this.state.gameMode = this.options.mode;

        this.options.roundTime = parseInt(this.options.roundTime, 10) || DEFAULT_ROUND_TIME;
        this.state.roundTime = this.options.roundTime;

        this.options.maxRounds = parseInt(this.options.maxRounds, 10) || DEFAULT_MAX_ROUNDS;
        this.state.maxRounds = this.options.maxRounds;

        this.options.pointsNeeded = parseInt(this.options.pointsNeeded, 10);
        this.state.pointsNeeded = this.options.pointsNeeded;

        this.state.public = this.options.public;
        this.state.borders = this.options.borders;
        this.state.suddenDeath = this.options.suddenDeath;
        this.state.directMatchesOnly = this.options.directMatchesOnly;

        this.state.round = 0;

        this.state.votes.forEach((vote) => {
            this.state.votes[vote.player.playerId].country = null;
            this.state.votes[vote.player.playerId].lat = null;
            this.state.votes[vote.player.playerId].lng = null;
            this.state.votes[vote.player.playerId].distanceInKm = null;
            this.state.votes[vote.player.playerId].hasWon = false;
        });

        this.state.scoreboard.forEach((sb) => {
            this.state.scoreboard[sb.player.playerId].score = 0;
        });
    }

    public startGame() {
        this.state.mode = GameMode.STARTING;
        this.state.gameStartsIn = DEFAULT_GAME_START_TIME;

        const timer = setInterval(() => {
            this.state.gameStartsIn -= 1;
            if (this.state.gameStartsIn <= 0) {
                this.prepareRound();
                return clearInterval(timer);
            }
        }, 1000);
    }

    public prepareRound() {
        this.state.roundTime = this.options.roundTime || DEFAULT_ROUND_TIME;
        this.broadcast("marker:unset", {});
        this.broadcast("targetmarker:unset", {});
        this.broadcast("othermarkers:unset", {});

        this.state.votes.forEach((vote) => {
            this.state.votes[vote.player.playerId].country = null;
            this.state.votes[vote.player.playerId].lat = null;
            this.state.votes[vote.player.playerId].lng = null;
            this.state.votes[vote.player.playerId].distanceInKm = null;
            this.state.votes[vote.player.playerId].hasWon = false;
        });

        this.state.mode = GameMode.ROUND_PREPARE;

        this.setCountry();

        setTimeout(() => {
            this.startRound();
        }, DEFAULT_ROUND_DETAIL_TIME * 1000);
    }


    public endGame() {
        this.broadcast("targetmarker:unset", {});

        this.state.mode = GameMode.END;
    }

    public startRound() {
        if (this.options.suddenDeath && this.suddenDeathReady()) {
            this.state.mapStyle = 'suddendeath';
            this.state.borders = false;
        } else {
            this.state.borders = this.options.borders;
            this.state.mapStyle = '';
        }

        this.state.round += 1;
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
        this.state.mapStyle = '';
        this.state.borders = this.options.borders;
        this.state.mode = GameMode.ROUND_END;

        this.broadcast("targetmarker:place", {
            position: {
                lat: this.state.country.lat,
                lng: this.state.country.lng,
            },
        });

        this.broadcast("othermarkers:place", {
            markers: this.state.votes,
        });

        this.broadcast("round:end", {
            country: this.state.country,
        });

        this.state.votes.forEach((vote) => {
            if (vote.country && vote.country.countryCode === this.state.country.alpha2Code) {
                this.state.votes[vote.player.playerId].hasWon = true;
            }
        });

        this.updateScoreboard();

        setTimeout(() => {
            this.state.mode = GameMode.SCORE_BOARD;
        }, DEFAULT_SCOREBOARD_TIME * 1000);

        setTimeout(() => {
            if (this.hasEnded()) {
                this.endGame();
                return;
            }
            this.prepareRound();
        }, DEFAULT_ROUND_COOLDOWN_TIME * 1000);
    }

    public hasEnded() {
        if (this.state.pointsNeeded) {
            for (const [id, sb] of this.state.scoreboard) {
                if (sb.score >= this.state.pointsNeeded) {
                    return true;
                }
            }
        }

        return this.state.round === this.state.maxRounds;
    }

    public getPlayerHighScore() {
        let highscore = 0;
        for (const playerID in this.state.scoreBoard) {
            if (this.state.scoreBoard.hasOwnProperty(playerID)) {
                const playerScore = this.state.scoreBoard[playerID].score;
                if (playerScore > highscore) {
                    highscore = playerScore;
                }
            }
        }

        return highscore;
    }

    public getBestPlayers() {
        let bestPlayers: any = [];
        let maxScore = 0;

        for (const playerID in this.state.scoreBoard) {
            if (this.state.scoreBoard.hasOwnProperty(playerID)) {
                const scoreBoard = this.state.scoreBoard[playerID];
                if (scoreBoard.score === maxScore) {
                    bestPlayers.push(playerID);
                } else if (scoreBoard.score > maxScore) {
                    bestPlayers = [playerID];
                    maxScore = scoreBoard.maxScore;
                }
            }
        }

        return bestPlayers;
    }

    public suddenDeathReady() {
        const currentHighScore = this.getPlayerHighScore();

        // check if near round end
        const isDrawn = this.getBestPlayers().length >= 0;
        if (isDrawn && this.state.round + 1 >= this.state.maxRounds) {
            return true;
        }

        if (isDrawn && currentHighScore + 1 >= this.state.pointsNeeded) {
            return true;
        }

        return false;
    }

    public updateScoreboard() {
        let gavePoints = false;
        this.state.votes.forEach((vote) => {
            if (vote.hasWon) {
                gavePoints = true;
                this.state.scoreboard[vote.player.playerId].score += 1;
            }
        });

        if (!gavePoints && !this.state.directMatchesOnly) {
            let closestDistance = 1000000000;
            let closestPlayer = "";
            for (const [id, vote] of this.state.votes) {
                if (vote.country && vote.distanceInKm < closestDistance) {
                    closestDistance = vote.distanceInKm;
                    closestPlayer = id;
                }
            }

            if (closestPlayer) {
                this.state.scoreboard[closestPlayer].score += 1;
            }
        }
    }


    private positionMap() {
    }
}
