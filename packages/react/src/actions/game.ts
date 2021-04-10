import {ROOM_NOT_FOUND_ERROR} from "../helper/errors";
import {sharedHistory} from "../helper/sharedHistory";
import {client} from "../helper/webSockets";
import {GAME_JOIN, GAME_LEAVE, GAME_UPDATE} from "./types";

// tslint:disable-next-line:no-submodule-imports
import {MatchMakeError} from "colyseus.js/lib/Client";

export const start = (gameName = "game_countries", options = {}) => async (dispatch) => {
    const room: any = await client.create(gameName, options);
    window.currentRoom = room;
    dispatch({type: GAME_JOIN, payload: room});
    subscribe(dispatch);
    window.currentRoom.send({type: "game:start", payload: room});
    sharedHistory.push("/play/" + room.id);
};

export const join = (gameData, retryCount = 1) => {
    return async (dispatch) => {
        try {
            const room = await client.joinById(gameData.id);

            dispatch({type: GAME_JOIN, payload: room});
            subscribe(dispatch);
            window.isJoining = false; // todo: ugly fix.

            sharedHistory.push("/game/" + gameData.name + "/" + room.id);
        } catch (e) {
            if (e instanceof MatchMakeError && e.code === ROOM_NOT_FOUND_ERROR) {
                sharedHistory.push("/");
            }
        }
    };
};

export const leave = () => (dispatch) => {
    unsubscribe();
    dispatch({type: GAME_LEAVE});
    sharedHistory.push("/");
};

export const subscribe = (dispatch) => {
    window.currentRoom.onStateChange((changes) => {
        dispatch({type: GAME_UPDATE, payload: changes });
    });
};

export const unsubscribe = () => {
    window.currentRoom.removeAllListeners();
};
