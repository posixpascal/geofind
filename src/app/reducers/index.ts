/* eslint-disable */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { sharedHistory } from "../helper/sharedHistory";
import lobbyReducer from "./roomReducer";
import roundReducer from "./roundReducer";
import userReducer from "./userReducer";
import gameReducer from "./gameReducer";
import lobbiesReducer from "./lobbiesReducer";
import roomReducer from "./roomReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  round: roundReducer,
  room: roomReducer,
  lobbies: lobbiesReducer,
  router: connectRouter(sharedHistory)
});

export default rootReducer;
