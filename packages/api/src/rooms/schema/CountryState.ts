import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";
import { Player } from "./PlayerState";
import { Translation } from "./TranslationState";

export class Country extends Schema {
  @type("string") id: string;
  @type("string") alpha2code: string;
  @type("string") alpha3code: string;
  @type("string") capital: string;
  @type("string") region: string;
  @type("string") subregion: string;
  @type("number") population: number;
  @type("number") area: number;
  @type({ map: Translation }) translations = new MapSchema<Translation>();

  @type(["string"]) topleveldomain = new ArraySchema<string>();
  //@type("string") currencies: string;
  @type("float32") lat: number;
  @type("float32") lng: number;
  @type(["string"]) borders = new ArraySchema<string>();
}
