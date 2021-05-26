import { Schema, type } from "@colyseus/schema";
import {hooks} from "@colyseus/social";
import {Chance} from "chance";
import md5 from "md5";

const chance = Chance();

hooks.beforeAuthenticate((provider, $setOnInsert, $set) => {
    // assign default metadata upon registration
    let name = chance.animal();
    while (name.length > 8){
        let name = chance.animal();
    }

    $setOnInsert.displayName = name;
    $setOnInsert.metadata = {
        pin: Math.floor(1 + Math.random() * 8),
        mapStyle: "basic",
    };
});

export class Player extends Schema {
    @type("string")
    public id: string;

    @type("string")
    public playerId: string;

    @type("string")
    public displayName: string;

    @type("number")
    public pin: number;

    @type("string")
    public avatarUrl: string;

    @type("string")
    public color: string;

    @type("boolean")
    public isReady: boolean;
}
