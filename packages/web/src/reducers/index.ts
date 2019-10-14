/* eslint-disable */
import {connectRouter} from "connected-react-router";
import {combineReducers} from "redux";
import {sharedHistory} from "../helper/sharedHistory";
import gameReducer from "./gameReducer";
import lobbiesReducer from "./lobbiesReducer";
import roomReducer from "./roomReducer";
import roundReducer from "./roundReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    game: gameReducer,
    lobbies: lobbiesReducer,
    room: roomReducer,
    round: roundReducer,
    router: connectRouter(sharedHistory),
    user: userReducer,
});

export default rootReducer;
