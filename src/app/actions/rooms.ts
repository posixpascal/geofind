import {ROOM_NOT_FOUND_ERROR} from "../helper/errors";
import {sharedHistory} from "../helper/sharedHistory";
import {client} from "../helper/webSockets";
import {strings} from "../i18n";
import {LOBBY_JOIN, LOBBY_LEAVE, LOBBY_UPDATE} from "./types";

// tslint:disable-next-line:no-submodule-imports
import {MatchMakeError} from "colyseus.js/lib/Client";

export const create = () => {
    return async (dispatch) => {
        const room = await client.create("lobby");
        dispatch({type: LOBBY_JOIN, payload: room});
        subscribe(dispatch);
        sharedHistory.push("/lobby/" + room.id);
    };
}

export const setName = () => {
    const newName = prompt(strings.enterNewLobbyName);
    if (newName) {
        window.currentRoom.send({type: "room:name:set", payload: newName});
    }
};

export const update = (payload) => {
    window.currentRoom.send({type: "room:update", payload});
};

export const subscribe = (dispatch) => {
    window.currentRoom.onStateChange((changes) => {
        dispatch({type: LOBBY_UPDATE, payload: changes});
    });
};

export const unsubscribe = () => {
    window.currentRoom.removeAllListeners();
};

export const join = (roomData) => {
    return async (dispatch) => {
        try {
            const room = await client.joinById(roomData.roomId || roomData.id);

            dispatch({type: LOBBY_JOIN, payload: room});
            subscribe(dispatch);

            sharedHistory.push("/lobby/" + room.id);
        } catch (e) {

            if (e instanceof MatchMakeError && e.code === ROOM_NOT_FOUND_ERROR) {
                await create()(dispatch);
            }
        }
    };
};

export const leave = () => (dispatch) => {
    unsubscribe();
    dispatch({type: LOBBY_LEAVE});
    sharedHistory.push("/");
};
