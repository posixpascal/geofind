import { atom, RecoilState } from "recoil";
import { Country, CountryFact, SinglePlayerGame } from "@prisma/client";

export interface FactsState extends Partial<CountryFact> {}

export const factsState: RecoilState<FactsState[]> = atom({
  key: "factsState",
  default: [] as FactsState[],
});
