/* eslint-disable */
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { sharedHistory } from "../helper/sharedHistory";
import gameReducer from "./gameReducer";
import lobbiesReducer from "./lobbiesReducer";
import lobbyReducer from "./roomReducer";
import roomReducer from "./roomReducer";
import roundReducer from "./roundReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  round: roundReducer,
  room: roomReducer,
  lobbies: lobbiesReducer,
  router: connectRouter(sharedHistory),
});

export default rootReducer;
