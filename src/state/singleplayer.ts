import type { Country, SinglePlayerGame } from "@prisma/client";
import { observable } from "@legendapp/state";

export interface SinglePlayerState extends Partial<SinglePlayerGame> {
  country?: Country;
}

export const singlePlayerState = observable<SinglePlayerState>();
