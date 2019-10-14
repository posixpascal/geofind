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

export class ShapeGuessingGameVote extends Schema {
    @type(Player)
    player: Player;

    @type(Country)
    country: Country;

    @type("number")
    distanceInKm: number;

    @type("boolean")
    hasWon: boolean;

    @type("boolean")
    hasVoted: boolean;
}

export class ShapeGuessingGame extends Schema {
    @type([ChatMessage])
    messages = new ArraySchema<ChatMessage>();

    @type({map: Player})
    players = new MapSchema<Player>();

    @type({map: ScoreBoard})
    scoreBoard = new MapSchema<ScoreBoard>();

    @type("boolean")
    gameStart : boolean;

    @type("boolean")
    gameOver : boolean;

    @type("boolean")
    roundStart : boolean;

    @type("boolean")
    roundEnd : boolean;

    @type("number")
    currentRound: number;

    @type("boolean")
    isSuddenDeath: boolean;

    @type("number")
    maxRounds: number;

    @type("number")
    victoryScore: number;

    @type("number")
    roundTimeLeft: number;

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

    @type({map: ShapeGuessingGameVote})
    votes = new MapSchema<ShapeGuessingGameVote>();
}
