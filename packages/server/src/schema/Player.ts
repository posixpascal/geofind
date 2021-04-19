import { Schema, type } from "@colyseus/schema";
import {hooks} from "@colyseus/social";
import {Chance} from "chance";
import md5 from "md5";

const chance = Chance();

hooks.beforeAuthenticate((provider, $setOnInsert, $set) => {
    // assign default metadata upon registration
    $setOnInsert.displayName = chance.animal();
    $setOnInsert.avatarUrl = `https://gravatar.com/avatar/${md5($setOnInsert.displayName)}`;
    $setOnInsert.metadata = {
        pin: Math.floor(1 + Math.random() * 8),
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
