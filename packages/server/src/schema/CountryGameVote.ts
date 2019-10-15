import {Schema, type} from "@colyseus/schema";
import {Country} from "./Country";
import {Player} from "./Player";

export class CountryGameVote extends Schema {
    @type(Player)
    public player: Player;

    @type(Country)
    public country: Country;

    @type("number")
    public distanceInKm: number;

    @type("boolean")
    public hasWon: boolean;

    @type("boolean")
    public hasVoted: boolean;
}
