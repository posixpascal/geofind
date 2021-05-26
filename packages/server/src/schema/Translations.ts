import { Schema, type } from "@colyseus/schema";
import {hooks} from "@colyseus/social";
import {Chance} from "chance";
import md5 from "md5";

export class Translations extends Schema {
    @type("string")
    public de: string;

    @type("string")
    public es: string;

    @type("string")
    public en: string;


    @type("string")
    public nl: string;

    @type("string")
    public it: string;

    @type("string")
    public br: string;

    @type("string")
    public fr: string;

    @type("string")
    public ja: string;


}
