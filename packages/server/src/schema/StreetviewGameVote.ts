import {Schema, type} from "@colyseus/schema";
import {Country} from "./Country";
import {Player} from "./Player";

export class StreetviewGameVote extends Schema {
    @type(Player)
    public player: Player;

    @type(Country)
    public pin1: Country;

    @type(Country)
    public pin2: Country;

    @type(Country)
    public pin3: Country;

    @type(Country)
    public pin4: Country;

    @type(Country)
    public pin5: Country;

    @type("number")
    public distanceInKm: number;

    @type("boolean")
    public hasWon: boolean;

    @type("boolean")
    public hasVoted: boolean;
}
