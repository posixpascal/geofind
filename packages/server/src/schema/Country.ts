import {Schema, type} from "@colyseus/schema";

export class Country extends Schema {
    @type("number")
    public lat: number;

    @type("number")
    public lng: number;

    @type("string")
    public countryCode: string;

    @type("string")
    public countryNameEn: string;

    @type("string")
    public countryNameDe: string;
}
