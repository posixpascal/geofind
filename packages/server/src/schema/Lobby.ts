import { Schema, ArraySchema, MapSchema, type } from "@colyseus/schema";
import {ChatMessage} from "./ChatMessage";
import {Player} from "./Player";
import {IUser, User} from "@colyseus/social";

export class Lobby extends Schema {
    @type("string")
    name: string;

    @type("string")
    gameRoom: string;

    @type([ChatMessage])
    messages = new ArraySchema<ChatMessage>();

    @type({map: Player})
    players = new MapSchema<Player>();

    @type("string")
    leader : string;

    @type("string")
    gameMode: string = "game_countries";

    @type("number")
    roundTime: number = 20;

    @type("number")
    maxRounds: number = 50;

    @type("number")
    victoryScore: number = 10;

    @type("boolean")
    insultMode: boolean = false;
}
