import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";
import {ChatMessage} from "./ChatMessage";
import {Country} from "./Country";
import {Player} from "./Player";
import {ScoreBoard} from "./ScoreBoard";
import {StreetviewGameVote} from "./StreetviewGameVote";

export class StreetviewGame extends Schema {
    @type([ChatMessage])
    public messages = new ArraySchema<ChatMessage>();

    @type({map: Player})
    public players = new MapSchema<Player>();

    @type({map: ScoreBoard})
    public scoreBoard = new MapSchema<ScoreBoard>();

    @type("boolean")
    public gameStart: boolean;

    @type("boolean")
    public gameOver: boolean;

    @type("boolean")
    public roundStart: boolean;

    @type("string")
    public roundWinner: string;

    @type("boolean")
    public roundEnd: boolean;

    @type("number")
    public currentRound: number;

    @type("boolean")
    public isSuddenDeath: boolean;

    @type("number")
    public maxRounds: number;

    @type("number")
    public victoryScore: number;

    @type("number")
    public timeElapsed: number;

    @type("boolean")
    public canForceRoundEnd: boolean;

    @type("boolean")
    public isWaitingForPlayers: boolean;

    @type("string")
    public leader: string;

    @type("string")
    public gameWinner: string;

    @type(Country)
    public country: Country;

    @type({map: StreetviewGameVote})
    public votes = new MapSchema<StreetviewGameVote>();
}
