import {Client, Delayed, Presence, Room} from "colyseus";
import {CountriesGame, Country} from "../schema/CountriesGame";
import {Player} from "../schema/Player";
import {ChatMessageTypes} from "../schema/ChatMessage";
import {COUNTRIES} from "../config/countries";
import {ScoreBoard} from "../schema/ScoreBoard";
import {User, verifyToken} from "@colyseus/social";
import {TRANSLATED_COUNTRIES} from "../config/translatedCountries";
import {ChatHandler} from "../handlers/chatHandler";
import {GameHandler} from "../handlers/gameHandler";
import {RoomHandler} from "../handlers/roomHandler";
import {Handler, IMessage} from "../handlers";
import {CountryGameHandler} from "../handlers/countryGameHandler";
import {shuffle} from "../util/collections";
import {distanceInKm} from "../util/math";

export class CountriesGameRoom extends Room {
    public roundTimer: Delayed;
    public roundCountdown: Delayed;
    public additionalRoundTime = 0;
    public handlers: any;
    public playedCountries: any = [];
    public lobbyOptions: any = {};

    constructor(presence?: Presence) {
        super(presence);

        this.handlers = {
            "chat": new ChatHandler(this),
            "game": new GameHandler(this),
            "room": new RoomHandler(this),
            "countryGame": new CountryGameHandler(this)
        };
    }

    onMessage(client: any, data: IMessage): void {
        Handler.handleMessage(this, client, data);
    }

    async onAuth(client: Client, options: any) {
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

    onJoin(client: Client, options: any) {
        if (!this.state.gameStart) {
            this.startGame();
        }

        if (!this.state.leader) {
            this.state.leader = client.auth._id.toString();
        }

        const player = new Player();
        player.id = client.auth._id.toString();
        player.player_id = client.sessionId;
        player.displayName = client.auth.displayName;
        player.color = client.auth.metadata.pin_color;
        player.avatarUrl = client.auth.avatarUrl;

        this.state.players[client.sessionId] = player;

        this.state.scoreBoard[client.sessionId] = new ScoreBoard();
        this.state.scoreBoard[client.sessionId].player = this.state.players[client.sessionId];
        this.state.scoreBoard[client.sessionId].score = 0;

        this.handlers.chat.addMessage(client, {
            type: ChatMessageTypes.STATUS_MESSAGE,
            createdAt: +new Date(),
            message: `${client.auth.displayName} joined the game`,
            player: false
        });
    }


    public onCreate(options: any) {
        this.lobbyOptions = options.room;
        this.setState(new CountriesGame());
    }

    startGame() {
        this.state.gameStart = true;

        this.state.roundStart = false;
        this.state.roundEnd = false;

        this.state.currentRound = 0;
        this.state.maxRounds = this.lobbyOptions.maxRounds || 50;
        this.state.roundTime = this.lobbyOptions.roundTime || 20;
        this.state.victoryScore = this.lobbyOptions.victoryScore || 10;
        this.state.insultMode = this.lobbyOptions.insultMode;

        // TODO: implement player waiting
        this.state.isWaitingForPlayers = false;

        this.clock.setTimeout(() => {
            this.roundStart();
        }, 5000);
    }

    roundStart() {
        this.broadcast({type: "map:roundInit"});
        this.additionalRoundTime = 0;

        // reset votes for next round
        for (let playerID in this.state.votes) {
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

    roundEnd() {
        this.state.roundStart = false;
        this.state.roundEnd = true;

        // give users with a direct match a point
        let onlyDirectVotesWin = false;
        for (let playerID in this.state.votes) {
            if (this.state.votes[playerID].hasWon) {
                onlyDirectVotesWin = true;
                this.state.scoreBoard[playerID].score += 1;
            }
        }

        // give points for users with a close vote
        if (!onlyDirectVotesWin) {
            let closestDistance = 1000000000;
            let closestPlayer = "";
            for (let playerID in this.state.votes) {
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

        this.insultPlayers();
        this.transitionToNextRound();
    }

    /**
     * Starts a new round after 7s, may wait additional seconds if an insult is requiring more time
     */
    transitionToNextRound() {
        this.clock.setTimeout(() => {
            if (this.additionalRoundTime) {
                return this.clock.setTimeout(() => {
                    this.roundStart();
                }, this.additionalRoundTime * 1000);
            }
            this.roundStart();
        }, 7000);
    }


    endGame() {
        this.state.isSuddenDeath = false;
        this.state.gameOver = true;
        this.broadcast({type: "game:over", payload: {...this.state}});
    }


    /**
     * Returns a random country which has not played in the game before
     */
    getRandomCountry() {
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

        for (let playerID in this.state.scoreBoard) {
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
        for (let playerID in this.state.scoreBoard) {
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
     * Try to insult players if possible
     * TODO: outsource
     */
    insultPlayers() {
        let playedInsult = false;
        let playerIDs = [];
        for (let playerID in this.state.votes) {
            playerIDs.push(playerID);
        }

        for (let playerID of shuffle(playerIDs)) {
            if (this.insultVote({sessionId: playerID}, this.state.votes[playerID])) {
                playedInsult = true;
                break;
            }
        }

        if (!playedInsult) {
            this.broadcast({type: "map:animateTo", payload: this.state.country});
        }

        return playedInsult;
    }

    /**
     * TODO: outsource
     * Tries to insults a user submitted vote if possible.
     * Works only if there are at least 4 people playing the game
     * @param client
     * @param vote
     */
    insultVote(client: any, vote) {
        if (Object.keys(this.state.players).length <= 3) {
            return false;
        }

        // triggers 100% — check if vote is the only one in a 8k miles radii
        if (vote.distanceInKm >= 8000) {
            // check if all other players are near 2000 radius
            let in2000radius = true;
            for (let playerID in this.state.players) {
                if (playerID === client.sessionId) {
                    continue;
                }
                if (this.state.votes[playerID] && this.state.votes[playerID].distanceInKm > 2000) {
                    in2000radius = false;
                }
            }

            if (in2000radius) {
                // we're playing "hello darkness my old friend" on the frontend and we need more roundTime
                this.additionalRoundTime = 6;
                this.broadcast({type: "insult:distance", payload: {playerID: client.sessionId, vote}});
                return true;
            }
        }

        // temporarily disabling other insults
        return;

        // triggers 20% check if all votes are wrong
        let allVotesWrong = true;
        for (let playerID in this.state.votes) {
            if (this.state[playerID] && this.state[playerID].hasWon) {
                allVotesWrong = false;
            }
        }

        if (allVotesWrong && Math.random() <= 0.2) {
            this.broadcast({type: "insult:info", payload: {message_type: "allWrong"}});
            return true;
        }

        // triggers 50% - check if all all pins are approximately near each other (250km)
        // and the target is at least 5000 km away from the pins
        let distances = [];
        for (let playerID in this.state.players) {
            if (!this.state.votes[playerID] || !this.state.votes[playerID].hasVoted) {
                continue;
            }
            const playerVote = this.state.votes[playerID].country;
            for (let otherPlayerID in this.state.players) {
                if (playerID === otherPlayerID || !this.state.votes[otherPlayerID] || !this.state.votes[otherPlayerID].hasVoted) {
                    continue;
                }
                // compare distance
                const otherPlayerVote = this.state.votes[otherPlayerID].country;
                distances.push(distanceInKm(playerVote, otherPlayerVote));
            }
        }

        let allAreClose = distances.reduce((a, c) => a + c, 0) < (distances.length * 250);
        if (allAreClose && vote.distanceInKm > 5000 && Math.random() < 0.5) {
            this.broadcast({
                type: "insult:closeTogether",
                payload: {playerID: client.sessionId, vote, country: this.state.country}
            });
            this.clock.setTimeout(() => {
                this.broadcast({
                    type: "insult:closeTogether2",
                    payload: {playerID: client.sessionId, vote, country: this.state.country}
                });
            }, 4000);
            this.additionalRoundTime = 5;
            return true;
        }

        return false;
    }

    /**
     * Checks if 2 (or more) people are close to winning the game
     */
    isHeadToHeadRound() {
        const currentHighScore = this.getPlayerHighScore();
        // check if near round end
        let isDrawn = this.getBestPlayers().length > 1;

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
    getPlayerHighScore() {
        let highscore = 0;
        for (let playerID in this.state.scoreBoard) {
            if (this.state.scoreBoard.hasOwnProperty(playerID)) {
                const playerScore = this.state.scoreBoard[playerID].score
                if (playerScore > highscore) {
                    highscore = playerScore;
                }
            }
        }

        return highscore;
    }
}
