import { Schema, type } from "@colyseus/schema";
import {hooks} from "@colyseus/social";
import {Chance} from "chance";
import md5 from "md5";

const chance = Chance();

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
        wrongGuesses: 0,
    };
});

export class Player extends Schema {
    @type("string")
    public id: string;

    @type("string")
    public playerId: string;

    @type("string")
    public displayName: string;

    @type("string")
    public avatarUrl: string;

    @type("string")
    public color: string;

    @type("boolean")
    public isReady: boolean;
}
