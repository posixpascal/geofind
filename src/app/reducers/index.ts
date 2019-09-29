/* eslint-disable */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { sharedHistory } from "../helper/sharedHistory";
import lobbyReducer from "./lobbyReducer";
import roundReducer from "./roundReducer";
import userReducer from "./userReducer";
import gameReducer from "./gameReducer";
import lobbiesReducer from "./lobbiesReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  round: roundReducer,
  lobby: lobbyReducer,
  lobbies: lobbiesReducer,
  router: connectRouter(sharedHistory)
});

export default rootReducer;
