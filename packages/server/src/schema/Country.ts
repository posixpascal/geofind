import {Schema, type} from "@colyseus/schema";
import {Translations} from "./Translations";

export class Country extends Schema {
    @type("number")
    public lat: number;

    @type("number")
    public lng: number;

    @type("string")
    public name: string;

    @type("string")
    public capital: string;

    @type(Translations)
    public translations: Translations;
}
