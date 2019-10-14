import { Schema, ArraySchema, MapSchema, type } from "@colyseus/schema";
import {Player} from "./Player";
import {ChatMessage} from "./ChatMessage";
import {ScoreBoard} from "./ScoreBoard";

export class Country extends Schema {
    @type("number")
    lat: number;

    @type("number")
    lng: number;

    @type("string")
    countryCode: string;

    @type("string")
    countryNameEn: string;
}

export class StreetviewGameVote extends Schema {
    @type(Player)
    player: Player;

    @type(Country)
    pin_1: Country;

    @type(Country)
    pin_2: Country;

    @type(Country)
    pin_3: Country;

    @type(Country)
    pin_4: Country;

    @type(Country)
    pin_5: Country;

    @type("number")
    distanceInKm: number;

    @type("boolean")
    hasWon: boolean;

    @type("boolean")
    hasVoted: boolean;
}

export class StreetviewGame extends Schema {
    @type([ChatMessage])
    messages = new ArraySchema<ChatMessage>();

    @type({map: Player})
    players = new MapSchema<Player>();

    @type({map: ScoreBoard})
    scoreBoard = new MapSchema<ScoreBoard>();

    @type("boolean")
    gameStart: boolean;

    @type("boolean")
    gameOver: boolean;

    @type("boolean")
    roundStart: boolean;

    @type("string")
    roundWinner: string;

    @type("boolean")
    roundEnd: boolean;

    @type("number")
    currentRound: number;

    @type("boolean")
    isSuddenDeath: boolean;

    @type("number")
    maxRounds: number;

    @type("number")
    victoryScore: number;

    @type("number")
    timeElapsed: number;

    @type("boolean")
    canForceRoundEnd: boolean;

    @type("boolean")
    isWaitingForPlayers: boolean;

    @type("string")
    leader: string;

    @type("string")
    gameWinner: string;

    @type(Country)
    country: Country;

    @type({map: StreetviewGameVote})
    votes = new MapSchema<StreetviewGameVote>();
}
