import { Room, Client, Deferred } from "colyseus";
import { CountryRoomState } from "./schema/CountryRoomState";
import { Player } from "./schema/PlayerState";
import { getCountries, getCountryByCode, getRandomCountry } from "../db";
import { ScoreBoard } from "./schema/ScoreBoardState";
import { Vote } from "./schema/VoteState";
import { reverseCoordinates } from "../geocoder";
import { humanizeDistance } from "@geofind/web/utils/geo";

export class CountryRoom extends Room<CountryRoomState> {
  autoDispose = false;

  onCreate(options: any) {
    this.setState(new CountryRoomState());

    this.onMessage("user/update", (client, message) => {
      const player = this.state.players.get(client.sessionId);

      if ("username" in message) {
        player.username = message.username;
      }

      if ("pin" in message) {
        player.pin = message.pin;
      }

      this.state.players.set(client.sessionId, player);
    });

    this.onMessage("room/restart", (client, message) => {
      if (client.sessionId !== this.state.creatorId) {
        return;
      }

      this.state.votes.clear();
      this.state.scoreboard.forEach((score) => {
        score.points = 0;
      });

      this.state.state = "round_prepare";
      this.state.phase = "play";
      this.state.rounds = 0;
      this.prepareRound();
    });

    this.onMessage("room/lobby", (client, message) => {
      if (client.sessionId !== this.state.creatorId) {
        return;
      }
      this.state.votes.clear();
      this.state.scoreboard.forEach((score) => {
        score.points = 0;
      });
      this.state.phase = "lobby";
      this.setPrivate(!this.state.isPublic);
    });

    this.onMessage("room/settings", (client, message) => {
      if (client.sessionId !== this.state.creatorId) {
        return;
      }

      if ("hasStrictMatches" in message) {
        this.state.hasStrictMatches = message.hasStrictMatches;
      }

      if ("maxPoints" in message && message.maxPoints) {
        this.state.maxPoints = parseInt(message.maxPoints, 10);
      }

      if ("hasIslands" in message) {
        this.state.hasIslands = message.hasIslands;
      }

      if ("hasBorders" in message && message.hasBorders) {
        this.state.hasBorders = message.hasBorders;
      }

      if ("roundTime" in message && message.roundTime) {
        this.state.roundTime = parseInt(message.roundTime, 10);
      }

      if ("isPublic" in message) {
        this.state.isPublic = message.isPublic;
        this.setPrivate(!this.state.isPublic);
      }

      if ("room" in message) {
        this.state.room = message.room;
      }

      if ("map" in message) {
        this.state.map = message.map;
      }

      this.updateMetadata();
    });

    this.onMessage("room/vote", (client, message) => {
      this.vote(client, message.position);
    });

    this.onMessage("room/start", (client, message) => {
      if (client.sessionId !== this.state.creatorId) {
        return;
      }

      this.state.phase = "play";
      this.prepareRound();
    });

    this.state.room = options.room;
    this.state.map = options.map;
    this.state.hasBorders = options.hasBorders;
    this.state.maxPoints = parseInt(options.maxPoints, 10);
    this.state.roundTime = parseInt(options.roundTime, 10);

    this.state.hasIslands = options.hasIslands;
    this.state.isPublic = options.isPublic;
    this.state.hasStrictMatches = options.hasStrictMatches;
    this.state.phase = "lobby";
    this.updateMetadata();
    this.setPrivate(!this.state.isPublic);
  }

  updateMetadata() {
    this.setMetadata({
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

  onJoin(client: Client, options: any) {
    if (
      !this.state.creatorId ||
      !this.state.players.get(this.state.creatorId)
    ) {
      this.state.creatorId = client.sessionId;
    }

    const player = new Player();
    player.username = options.username;
    player.sessionId = client.sessionId;
    player.connected = true;
    player.pin = parseInt(options.pin) || 1;
    this.state.players.set(client.sessionId, player);

    const scoreboard = new ScoreBoard();
    scoreboard.sessionId = client.sessionId;
    scoreboard.points = 0;
    if (this.state.scoreboard.has(client.sessionId)) {
      scoreboard.points = this.state.scoreboard.get(client.sessionId).points;
    }

    this.state.scoreboard.set(client.sessionId, scoreboard);
  }

  async onLeave(client: Client, consented: boolean) {
    if (this.state.state === "lobby") {
      this.state.players.delete(client.sessionId);
      return;
    }

    // flag client as inactive for other users
    this.state.players.get(client.sessionId).connected = false;

    try {
      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 20);

      // client returned! let's re-activate it.
      this.state.players.get(client.sessionId).connected = true;
    } catch (e) {
      // 20 seconds expired. let's remove the client.
      this.state.players.delete(client.sessionId);
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  async prepareRound() {
    this.setPrivate(true);
    this.state.state = "round_prepare";
    this.state.country = await getRandomCountry(
      this.state,
      this.state.blacklist.toArray()
    );
    this.state.blacklist.push(this.state.country.id);
    setTimeout(() => {
      this.startRound();
    }, 2500);
  }

  async startRound() {
    this.state.votes.forEach((vote) => {
      vote.isCorrect = false;
      vote.distance = this.distanceBetween(
        [vote.lat, vote.lng],
        [this.state.country.lat, this.state.country.lng]
      );
    });
    this.state.rounds++;
    this.state.state = "round_start";
    this.state.timer = this.state.roundTime;

    let countdown = setInterval(() => {
      if (this.state.timer > 0) this.state.timer -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(countdown);
      this.endRound();
    }, this.state.roundTime * 1000);
  }

  async endRound() {
    this.state.state = "round_end";
    let hasCorrectVote = false;
    this.state.votes.forEach((value, key) => {
      if (value.isCorrect) {
        hasCorrectVote = true;
        this.state.scoreboard.get(key).points += 1;
      }
    });

    if (!hasCorrectVote && !this.state.hasStrictMatches) {
      let lowestDistance = Number.POSITIVE_INFINITY;
      this.state.votes.forEach((value, key) => {
        if (value.distance < lowestDistance) {
          lowestDistance = value.distance;
        }
      });

      this.state.votes.forEach((value, key) => {
        if (value.distance === lowestDistance) {
          this.state.scoreboard.get(key).points += 1;
          this.state.votes.get(key).isCorrect = true;
        }
      });
    }

    // check scoreboard
    setTimeout(() => {
      this.scoreboard();
    }, 4000);
  }

  async scoreboard() {
    this.state.state = "scoreboard";
    setTimeout(() => {
      // check gameover.
      let gameOver = false;
      let hasSuddenDeath = false;
      this.state.scoreboard.forEach((value, key) => {
        if (value.points >= this.state.maxPoints) {
          this.state.scoreboard.get(key).hasWon = true;
          if (gameOver) {
            hasSuddenDeath = true;
          }
          gameOver = true;
        }
      });

      if (!hasSuddenDeath && gameOver) {
        this.gameEnd();
        return;
      }

      this.prepareRound();
    }, 8000);
  }

  async vote(client, latlng) {
    let geocoder = await reverseCoordinates(latlng);

    const vote = new Vote();
    vote.hasCountry = false;

    if (geocoder.countryCode) {
      const country = await getCountryByCode(geocoder.countryCode);
      vote.country = country;
      vote.hasCountry = true;
      vote.isCorrect = country.id === this.state.country.id;
    }

    vote.distance = this.distanceBetween(latlng, [
      this.state.country.lat,
      this.state.country.lng,
    ]);
    vote.lat = geocoder.latitude;
    vote.lng = geocoder.longitude;
    this.state.votes.set(client.sessionId, vote);
  }

  async gameEnd() {
    this.state.state = "game_end";
  }

  distanceBetween(pointA, pointB) {
    const [latitude, longitude] = pointA;
    const [latitude2, longitude2] = pointB;

    const point1 = { latitude, longitude };
    const point2 = { latitude: latitude2, longitude: longitude2 };

    return humanizeDistance(point1, point2, "metric", true) as number;
  }
}
