import {User, verifyToken} from "@colyseus/social";
import {Client, Delayed, Room} from "colyseus";
import {COUNTRIES} from "../config/countries";
import {TRANSLATED_COUNTRIES} from "../config/translatedCountries";
import {CountriesGame} from "../schema/CountriesGame";
import {Country} from "../schema/Country";
import {Player} from "../schema/Player";
import {ScoreBoard} from "../schema/ScoreBoard";

export class CountriesGameRoom extends Room {
    public roundTimer: Delayed;
    public roundCountdown: Delayed;
    public additionalRoundTime = 0;
    public handlers: any;
    public playedCountries: any = [];
    public options: any = {};

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
        if (!this.state.gameStart) {
            this.startGame();
        }

        if (!this.state.leader) {
            this.state.leader = client.auth._id.toString();
        }

        const player = new Player();
        player.id = client.auth._id.toString();
        player.playerId = client.sessionId;
        player.displayName = client.auth.displayName;
        player.color = client.auth.metadata.pin_color;
        player.avatarUrl = client.auth.avatarUrl;
        player.connected = true;

        this.state.players[client.sessionId] = player;

        this.state.scoreBoard[client.sessionId] = new ScoreBoard();
        this.state.scoreBoard[client.sessionId].player = this.state.players[client.sessionId];
        this.state.scoreBoard[client.sessionId].score = 0;
    }


    public async onLeave(client: Client, consented?: boolean): Promise<any> {
        console.log("on leave", client.sessionId);
        delete this.state.players[client.sessionId];
    }

    public onCreate(options: any = {}) {
        this.options = options;
        this.setState(new CountriesGame());
        console.log("state set");
    }

    public startGame() {
        this.state.gameStart = true;

        this.state.roundStart = false;
        this.state.roundEnd = false;

        this.state.currentRound = 0;
        this.state.maxRounds = this.options.maxRounds || 50;
        this.state.roundTime = this.options.roundTime || 20;
        this.state.victoryScore = this.options.victoryScore || 10;

        // TODO: implement player waiting
        this.state.isWaitingForPlayers = false;

        this.clock.setTimeout(() => {
            this.roundStart();
        }, 5000);
    }

    public roundStart() {
        this.broadcast("map:roundInit");
        this.additionalRoundTime = 0;

        // reset votes for next round
        for (const playerID in this.state.votes) {
            if (!this.state.votes.hasOwnProperty(playerID)) {
                continue;
            }
            delete this.state.votes[playerID];
        }

        this.state.country = this.getRandomCountry();
        this.state.currentRound += 1;
        this.state.roundTimeLeft = this.state.roundTime;
        this.state.canForceRoundEnd = false;
        this.state.roundStart = true;
        this.state.roundEnd = false;

        this.roundCountdown = this.clock.setInterval(() => {
            this.state.roundTimeLeft -= 1;
            if (this.state.roundTimeLeft === 0) {
                this.roundCountdown.clear();
            }
        }, 1000);

        this.state.isSuddenDeath = this.isHeadToHeadRound();

        this.roundTimer = this.clock.setTimeout(() => {
            this.roundEnd();
        }, this.state.roundTime * 1000);
    }

    public roundEnd() {
        this.state.roundStart = false;
        this.state.roundEnd = true;

        // give users with a direct match a point
        let onlyDirectVotesWin = false;
        for (const playerID in this.state.votes) {
            if (this.state.votes[playerID].hasWon) {
                onlyDirectVotesWin = true;
                this.state.scoreBoard[playerID].score += 1;
            }
        }

        // give points for users with a close vote
        if (!onlyDirectVotesWin) {
            let closestDistance = 1000000000;
            let closestPlayer = "";
            for (const playerID in this.state.votes) {
                if (this.state.votes[playerID].hasVoted && this.state.votes[playerID].distanceInKm < closestDistance) {
                    closestDistance = this.state.votes[playerID].distanceInKm;
                    closestPlayer = playerID;
                }
            }

            if (closestPlayer) {
                this.state.scoreBoard[closestPlayer].score += 1;
            }
        }

        if (this.isGameOver()) {
            this.state.gameWinner = this.getBestPlayers()[0];
            this.clock.setTimeout(() => {
                this.endGame();
            }, 3000);
        }

        this.broadcast("map:animateTo", this.state.country);
        this.transitionToNextRound();
    }

    /**
     * Starts a new round after 7s, may wait additional seconds if an insult is requiring more time
     */
    public transitionToNextRound() {
        this.clock.setTimeout(() => {
            if (this.additionalRoundTime) {
                return this.clock.setTimeout(() => {
                    this.roundStart();
                }, this.additionalRoundTime * 1000);
            }
            this.roundStart();
        }, 7000);
    }

    public endGame() {
        this.state.isSuddenDeath = false;
        this.state.gameOver = true;
        this.broadcast("game:over", {...this.state});
    }

    /**
     * Returns a random country which has not played in the game before
     */
    public getRandomCountry() {
        let countryData: any = false;
        while (!countryData || this.playedCountries.indexOf(countryData.country_code) > -1) {
            countryData = TRANSLATED_COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        }
        const country = new Country();
        country.lat = countryData.latlng[0];
        country.lng = countryData.latlng[1];
        country.countryNameEn = countryData.name;
        country.countryNameDe = countryData.countryNameDe || countryData.name;
        country.countryCode = countryData.country_code;
        this.playedCountries.push(country.countryCode);
        return country;
    }

    /**
     * Returns a list of all players currently having the best score
     */
    public getBestPlayers() {
        let bestPlayers: any = [];
        let maxScore = 0;

        for (const playerID in this.state.scoreBoard) {
            if (!this.state.scoreBoard.hasOwnProperty(playerID)) {
                continue;
            }

            const scoreBoard = this.state.scoreBoard[playerID];
            if (scoreBoard.score === maxScore) {
                bestPlayers.push(playerID);
            } else if (scoreBoard.score > maxScore) {
                bestPlayers = [playerID];
                maxScore = scoreBoard.maxScore;
            }
        }

        return bestPlayers;
    }

    /**
     * Checks if the game is over and someone won
     */
    public isGameOver() {
        // play until only one player is the best
        if (this.getBestPlayers().length > 1) {
            return false;
        }

        let gameOver = false;

        // check if any player has reached required win score
        for (const playerID in this.state.scoreBoard) {
            if (!this.state.scoreBoard.hasOwnProperty(playerID)) {
                continue;
            }
            const scoreBoard = this.state.scoreBoard[playerID];
            if (scoreBoard.score >= this.state.victoryScore) {
                gameOver = true;
            }
        }

        if (this.state.currentRound >= this.state.maxRounds) {
            gameOver = true;
        }

        return gameOver;
    }


    /**
     * Checks if 2 (or more) people are close to winning the game
     */
    public isHeadToHeadRound() {
        const currentHighScore = this.getPlayerHighScore();
        // check if near round end
        const isDrawn = this.getBestPlayers().length > 1;

        if (isDrawn && this.state.currentRound + 1 >= this.state.maxRounds) {
            return true;
        }

        if (isDrawn && currentHighScore + 1 >= this.state.victoryScore) {
            return true;
        }

        return false;
    }

    /**
     * Returns the current max score
     */
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
}
