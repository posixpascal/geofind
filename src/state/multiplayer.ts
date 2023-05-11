import { atom, RecoilState } from "recoil";
import {Country, MultiPlayerGame, MultiPlayerSession, SinglePlayerGame, User} from "@prisma/client";

export interface MultiplayerState extends Partial<MultiPlayerGame> {
  country?: Country;
  sessions?: Array<MultiPlayerSession & {user: User}>
}

export interface MultiplayerSessionState extends Partial<MultiPlayerSession> {}

export const multiPlayerState: RecoilState<MultiplayerState> = atom({
  key: "multiPlayerGame",
  default: {},
});

export const multiPlayerSessions: RecoilState<MultiplayerSessionState[]> = atom({
  key: 'multiPlayerSessions',
  default: []
})