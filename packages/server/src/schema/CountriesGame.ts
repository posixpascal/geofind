import {ArraySchema, MapSchema, Schema, type} from "@colyseus/schema";
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
    public gameStart: boolean = false;

    @type("boolean")
    public gameOver: boolean = false;

    @type("boolean")
    public roundStart: boolean = false;

    @type("boolean")
    public roundEnd: boolean = false;

    @type("number")
    public currentRound: number = 0;

    @type("boolean")
    public isSuddenDeath: boolean = false;

    @type("number")
    public maxRounds: number = 0;

    @type("number")
    public victoryScore: number = 0;

    @type("number")
    public roundTimeLeft: number = 0;

    @type("boolean")
    public canForceRoundEnd: boolean = false;

    @type("boolean")
    public isWaitingForPlayers: boolean = false;

    @type("string")
    public leader: string;

    @type("string")
    public gameWinner: string;

    @type(Country)
    public country: Country;

    @type({map: CountryGameVote})
    public votes = new MapSchema<CountryGameVote>();
}
