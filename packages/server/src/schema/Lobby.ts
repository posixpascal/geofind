import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";
import {IUser, User} from "@colyseus/social";
import {ChatMessage} from "./ChatMessage";
import {Player} from "./Player";

export class Lobby extends Schema {
    @type("string")
    public name: string;

    @type("string")
    public gameRoom: string;

    @type([ChatMessage])
    public messages = new ArraySchema<ChatMessage>();

    @type({map: Player})
    public players = new MapSchema<Player>();

    @type("string")
    public leader: string;

    @type("string")
    public gameMode: string = "game_countries";

    @type("number")
    public roundTime: number = 20;

    @type("number")
    public maxRounds: number = 50;

    @type("number")
    public victoryScore: number = 10;

    @type("boolean")
    public insultMode: boolean = false;
}
