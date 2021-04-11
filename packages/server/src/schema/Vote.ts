import {Schema, type} from "@colyseus/schema";
import {Country} from "./Country";
import {Player} from "./Player";

export class Vote extends Schema {
    @type(Player)
    public player: Player;

    @type(Country)
    public country: Country;

    @type("boolean")
    public hasWon: boolean;

    @type("number")
    public distanceInKm: number;

    @type("float32")
    public lat: number;

    @type("float32")
    public lng: number;
}
