import { Schema, MapSchema, type } from "@colyseus/schema";
import {hooks, User} from "@colyseus/social";
import md5 from "md5";
const chance = require("chance").Chance();

hooks.beforeAuthenticate((provider, $setOnInsert, $set) => {
    // assign default metadata upon registration
    $setOnInsert.displayName = chance.animal();
    $setOnInsert.avatarUrl = `https://gravatar.com/avatar/${md5($setOnInsert.displayName)}?d=robohash`;
    $setOnInsert.metadata = {
        pin_color: chance.color({ format: "hex" }),
        pin_head: 1,
        gamesLost: 0,
        gamesWon: 0,
        gamesPlayed: 0,
        level: 1,
        correctGuesses: 0,
        wrongGuesses: 0
    };
});

export class Player extends Schema {
    @type("string")
    id: string;

    @type("string")
    player_id: string;

    @type("string")
    displayName : string;

    @type("string")
    avatarUrl : string;

    @type("string")
    color:string;

    @type("boolean")
    isReady:boolean;
}
