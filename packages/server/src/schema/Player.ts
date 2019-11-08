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
        countriesFound: 0,
        capitalsFound: 0,
        animalsFound: 0,
        sightseeingsFound: 0,

        level: 1,
        exp: 0,
        needsExp: 500,

        badge_first_game: false,
        badge_consecutive_wins: false,
        badge_consecutive_losses: false,
        badge_pinhead: false,
        badge_level_5: false,
        badge_level_10: false,
        badge_animals: false,
        badge_countries: false,
        badge_europe: false,
        badge_africa: false,
        badge_asia: false,
        badge_america: false,
        badge_islands: false,


        training_progress: 0,
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
