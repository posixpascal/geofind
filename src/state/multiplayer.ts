import type {
  Country,
  MultiPlayerGame,
  MultiPlayerSession,
  User,
} from "@prisma/client";
import { observable } from "@legendapp/state";

export interface MultiplayerState extends Partial<MultiPlayerGame> {
  country?: Country;
  sessions?: Array<MultiPlayerSession & { user: User }>;
  creator: User;
}

export interface MultiplayerSessionState extends Partial<MultiPlayerSession> {}

export const multiPlayerState = observable<MultiplayerState>();
export const multiPlayerSessions = observable<MultiplayerSessionState>();
