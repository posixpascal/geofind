import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";
import {ChatMessage} from "./ChatMessage";
import {Country} from "./Country";
import {CountryGameVote} from "./CountryGameVote";
import {Player} from "./Player";
import {ScoreBoard} from "./ScoreBoard";

export class CountriesGame extends Schema {
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
    public roundTimeLeft: number;

    @type("boolean")
    public canForceRoundEnd: boolean;

    @type("boolean")
    public isWaitingForPlayers: boolean;

    @type("boolean")
    public insultMode: boolean;

    @type("string")
    public leader: string;

    @type("string")
    public gameWinner: string;

    @type(Country)
    public country: Country;

    @type({map: CountryGameVote})
    public votes = new MapSchema<CountryGameVote>();
}
