import { Schema, MapSchema, type } from "@colyseus/schema";
import { Country } from "./CountryState";

export class Vote extends Schema {
  @type("string") username: string;
  @type(Country) country = new Country();
  @type("float32") lat: number;
  @type("float64") lng: number;
  @type("float64") distance: number;
  @type("boolean") isCorrect: boolean;
  @type("boolean") hasCountry: boolean;
}
