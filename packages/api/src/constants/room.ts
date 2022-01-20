export type GameRoom =
  | "countries"
  | "capitals"
  | "sightseeing"
  | "domainhunt"
  | "flags"
  | "quiz"
  | "speedrun"
  | "shapes";

export type MapType =
  | "earth"
  | "oceania"
  | "europe"
  | "asia"
  | "africa"
  | "america";

export interface RoomSettings {
  hasStrictMatches: boolean;
  maxPoints: string;
  hasIslands: boolean;
  hasBorders: boolean;
  roundTime: string;
  isPublic: boolean;
  room: GameRoom;
  map: MapType;
}
