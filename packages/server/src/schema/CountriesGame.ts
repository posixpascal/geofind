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

    @type("number")
    public gameStartsIn: number;

    @type("number")
    public roundTime: number;

    @type(Country)
    public country: Country;

    @type({ map: Vote })
    public votes = new MapSchema<Vote>();

    @type({ map: ScoreBoard })
    public scoreboard = new MapSchema<ScoreBoard>();
}
