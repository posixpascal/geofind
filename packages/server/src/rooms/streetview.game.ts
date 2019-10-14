import {Delayed, Room} from "colyseus";
import {StreetviewGame, StreetviewGameVote, Country} from "../schema/StreetviewGame";
import {googleMapsClient} from "../util/googlemaps";
import {User, verifyToken} from "@colyseus/social";
import { Player} from "../schema/Player";
import {ScoreBoard} from "../schema/ScoreBoard";
import {STREET_VIEW_COUNTRIES} from "../config/streetViewCountries";

export class StreetviewGameRoom extends Room {
    public roundTimer: Delayed;
    public roundCountUp: Delayed;

    onMessage(client: any, data): void {
        switch (data.type) {
            case "game:vote":
                let vote = new StreetviewGameVote();
                let nextPin = "pin_1";

                if (this.state.votes[client.sessionId]) {
                    // max pins reached
                    if (this.state.votes[client.sessionId].pin_5) {
                        this.checkVotes();
                        return;
                    }
                    if (this.state.votes[client.sessionId].pin_4) {
                        nextPin = "pin_5";
                    }
                    if (this.state.votes[client.sessionId].pin_3) {
                        nextPin = "pin_4";
                    }
                    if (this.state.votes[client.sessionId].pin_2) {
                        nextPin = "pin_3";
                    }
                    if (this.state.votes[client.sessionId].pin_1) {
                        nextPin = "pin_2";
                    }
                }

                // resolve country from coords
                const country = new Country();
                country.lat = data.payload.lat;
                country.lng = data.payload.lng;
                country.countryCode = "";
                country.countryNameEn = "(unknown)";
                googleMapsClient.reverseGeocode({latlng: data.payload, result_type: "country"}, (err, res) => {
                    if (err) {
                        // TODO: tell user about the error
                        console.error(err);
                        // store vote without resolved countryCode
                        vote.hasVoted = true;
                        vote.hasWon = false;
                        vote[nextPin] = country;
                        vote.distanceInKm = this.distanceInKm({
                            lat: this.state.country.lat,
                            lng: this.state.country.lng
                        }, data.payload);
                        this.state.votes[client.sessionId] = vote;
                        this.checkVotes();
                        return;
                    }

                    const geocodingResult = (res.json.results[0]);

                    if (res.json.results[0]) {
                        if (geocodingResult.address_components[0]) {
                            country.countryCode = geocodingResult.address_components[0].short_name;
                        }
                        country.countryNameEn = res.json.results[0].formatted_address;
                    }


                    vote.hasVoted = true;
                    vote.hasWon = this.state.country.countryCode && this.state.country.countryCode === country.countryCode;

                    if (!vote.hasWon) {
                        vote.distanceInKm = this.distanceInKm({
                            lat: this.state.country.lat,
                            lng: this.state.country.lng
                        }, data.payload);
                    }

                    vote[nextPin] = country;
                    this.state.votes[client.sessionId] = vote;

                    this.checkVotes();
                });


                break;
        }
    }

    // checks if all votes were made and or someone found the answer
    async checkVotes() {
        console.log("checkvotes");
        // check for instant win
        for (let playerID in this.state.votes) {
            const voteSet = this.state.votes[playerID];

            if (voteSet.hasWon) {
                this.state.roundWinner = playerID;
                console.log(this.state.roundWinner);
                this.roundEnd();
                return;
            }
        }

        let allVotesPlaced = true;

        for (let playerID in this.state.votes) {
            const voteSet = this.state.votes[playerID];
            if (!voteSet || !voteSet.pin_5 || !voteSet.pin_5.lat || !voteSet.pin_5.lng) {
                allVotesPlaced = false;
            }
        }
        console.log("all votes placed: ", allVotesPlaced);
        if (allVotesPlaced) {
            this.state.roundWinner = "";
            this.roundEnd();
        }
    }

    async onAuth(client, options) {
        const token = verifyToken(options.token);
        try {
            const user = await User.findById(token._id);
            if (user) {
                return user;
            }
        } catch (err) {
            return new Player();
        }
        return new Player();
    }

    public lobbyOptions: any = {};

    public onCreate(options: any) {
        this.lobbyOptions = options.room;
        this.setState(new StreetviewGame());
    }

    // populate game state
    startGame() {
        this.state.gameStart = true;

        // reset votes
        for (let playerID in this.state.votes) {
            delete this.state.votes[playerID];
        }

        this.state.roundStart = false;
        this.state.roundEnd = false;

        this.state.currentRound = 0;
        this.state.maxRounds = this.lobbyOptions.maxRounds || 50;
        this.state.victoryScore = this.lobbyOptions.victoryScore || 10;


        // TODO: implement player waiting
        this.state.isWaitingForPlayers = false;

        this.clock.setTimeout(() => {
            this.roundStart();
        }, 2000);
    }

    roundStart() {
        this.state.country = this.getRandomCountry();
        // reset votes
        for (let playerID in this.state.votes) {
            delete this.state.votes[playerID];
        }

        this.state.currentRound += 1;
        this.state.canForceRoundEnd = false;
        this.state.timeElapsed = 0;
        this.state.roundStart = true;
        this.state.roundEnd = false;
        this.state.roundWinner = "";

        this.roundCountUp = this.clock.setInterval(() => {
            this.state.timeElapsed += 1;
        }, 1000);

        // check if near round end
        let isDrawn = false;
        let highestScoreUsers = [];
        let currentHighScore = "";
        for (let playerID in this.state.scoreBoard) {
            const scoreBoard = this.state.scoreBoard[playerID];
            if (scoreBoard.score === currentHighScore) {
                isDrawn = true;
                highestScoreUsers.push(playerID);
            } else if (scoreBoard.score > currentHighScore) {
                isDrawn = false;
                highestScoreUsers = [playerID];
                currentHighScore = scoreBoard.score;
            }
        }

        if (isDrawn && this.state.currentRound + 1 >= this.state.maxRounds) {
            this.state.isSuddenDeath = true;
        } else if (isDrawn && currentHighScore + 1 >= this.state.victoryScore) {
            this.state.isSuddenDeath = true;
        } else {
            this.state.isSuddenDeath = false; // testing;
        }
    }

    // duplicate code from countries game
    roundEnd() {
        console.log("round end");
        this.state.roundStart = false;
        this.state.roundEnd = true;

        let onlyDirectVotesWin = false;
        for (let playerID in this.state.votes) {
            if (this.state.votes[playerID].hasWon) {
                onlyDirectVotesWin = true;
                this.state.scoreBoard[playerID].score += 1;
            }
        }

        // check scores
        for (let playerID in this.state.scoreBoard) {
            const scoreBoard = this.state.scoreBoard[playerID];
            if (scoreBoard.score >= this.state.victoryScore) {
                this.state.gameWinner = playerID;
                this.clock.setTimeout(() => {
                    this.endGame();
                }, 3000);
                return;
            }
        }

        // check rounds
        // todo: strip this loop for simple array operations (filter/reduce)
        if (this.state.currentRound >= this.state.maxRounds) {
            let winner = "";
            let maxScore = 0;
            let isDraw = false;
            for (let playerID in this.state.scoreBoard) {
                const scoreBoard = this.state.scoreBoard[playerID];
                if (scoreBoard.score === maxScore) {
                    isDraw = true;
                } else if (scoreBoard.score > maxScore) {
                    isDraw = false;
                    winner = playerID;
                    maxScore = scoreBoard.maxScore;
                }
            }

            if (!isDraw && winner) {
                this.state.gameWinner = winner;
                this.clock.setTimeout(() => {
                    this.endGame();
                }, 3000);
                return;
            }
        }

        this.clock.setTimeout(() => {
            this.roundStart();
        }, 7000);
    }

    endGame() {
        this.state.isSuddenDeath = false;
        this.state.gameOver = true;
        this.broadcast({type: "game:over", payload: {...this.state}});
    }

    public playedCountries = [];

    getRandomCountry() {
        let countryData: any = false;
        while (!countryData || this.playedCountries.indexOf(countryData.country_code) > -1) {
            countryData = STREET_VIEW_COUNTRIES[Math.floor(Math.random() * STREET_VIEW_COUNTRIES.length)];
        }
        const country = new Country();
        country.lat = countryData.latlng[0];
        country.lng = countryData.latlng[1];
        country.countryNameEn = countryData.name;
        country.countryCode = countryData.country_code;
        this.playedCountries.push(country.countryCode);
        return country;
    }

    onJoin(client) {
        if (!this.state.gameStart) {
            this.startGame();
        }

        if (!this.state.leader) {
            this.state.leader = client.auth._id.toString();
        }

        this.state.players[client.sessionId] = new Player();
        this.state.players[client.sessionId].id = client.auth._id.toString();
        this.state.players[client.sessionId].displayName = client.auth.displayName;
        this.state.players[client.sessionId].color = client.auth.metadata.pin_color;
        this.state.players[client.sessionId].avatarUrl = client.auth.avatarUrl;

        this.state.scoreBoard[client.sessionId] = new ScoreBoard();
        this.state.scoreBoard[client.sessionId].player = this.state.players[client.sessionId];
        this.state.scoreBoard[client.sessionId].score = 0;
    }

    distanceInKm(point1, point2) {
        return this.calcDistance(point1.lat, point2.lat, point1.lng, point2.lng);
    }

    calcDistance(lat1, lat2, lng1, lng2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lng2 - lng1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    toRad(Value) {
        return Value * Math.PI / 180;
    }
}
