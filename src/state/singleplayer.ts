import { atom, RecoilState } from "recoil";
import { Country, SinglePlayerGame } from "@prisma/client";

export interface SinglePlayerState extends Partial<SinglePlayerGame> {
  country?: Country;
}

export const singlePlayerState: RecoilState<SinglePlayerState> = atom({
  key: "singlePlayerState",
  default: {},
});
