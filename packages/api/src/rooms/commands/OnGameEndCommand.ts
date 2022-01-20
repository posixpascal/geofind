import { Command } from "@colyseus/command";
import { CountryRoom } from "../CountryRoom";
import { getRandomCountry } from "../../db";

export class OnGameEndCommand extends Command<CountryRoom, {}> {
  async execute(payload: this["payload"]) {}
}
