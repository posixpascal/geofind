import {ArraySchema, MapSchema, Schema, type} from "@colyseus/schema";
import {ChatMessage} from "./ChatMessage";
import {Country} from "./Country";
import {Vote} from "./Vote";
import {Player} from "./Player";
import {ScoreBoard} from "./ScoreBoard";


export class CountriesGame extends Schema {
    @type({map: Player})
    public players = new MapSchema<Player>();

    @type("string")
    public leaderId: string;

    @type("string")
    public mode = "preparing";

    @type("string")
    public gameMode = "";

    @type("string")
    public mapSet = "";

    @type("string")
    public mapStyle = "";

    @type("number")
    public gameStartsIn: number;

    @type("number")
    public roundTime: number;

    @type("number")
    public round: number;

    @type("number")
    public maxRounds: number;

    @type("number")
    public pointsNeeded: number;

    @type("boolean")
    public borders: boolean;

    @type("boolean")
    public suddenDeath: boolean;

    @type("boolean")
    public public: boolean;

    @type("boolean")
    public directMatchesOnly: boolean;

    @type(Country)
    public country: Country;

    @type({ map: Vote })
    public votes = new MapSchema<Vote>();

    @type({ map: ScoreBoard })
    public scoreboard = new MapSchema<ScoreBoard>();
}
