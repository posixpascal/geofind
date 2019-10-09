import {MatchMakeError} from "colyseus.js/lib/Client";
import {ROOM_NOT_FOUND_ERROR} from "../helper/errors";
import {sharedHistory} from "../helper/sharedHistory";
import {client} from "../helper/webSockets";
import {strings} from "../i18n";
import {LOBBY_JOIN, LOBBY_LEAVE, LOBBY_UPDATE} from "./types";

export function create() {
    return async function(dispatch) {
        const room = await client.create("lobby");
        dispatch({type: LOBBY_JOIN, payload: room});
        subscribe(dispatch);
        sharedHistory.push("/lobby/" + room.id);
    };
}

export function setName() {
    const newName = prompt(strings.enterNewLobbyName);
    if (newName) {
        window.currentRoom.send({type: "room:name:set", payload: newName});
    }
}

export function update(payload) {
    window.currentRoom.send({type: "room:update", payload});
}

export function subscribe(dispatch) {
    window.currentRoom.onStateChange((changes) => {
        dispatch({type: LOBBY_UPDATE, payload: changes});
    });
}

export function unsubscribe() {
    window.currentRoom.removeAllListeners();
}

export function join(roomData) {
    return async function(dispatch) {
        try {
            const room = await client.joinById(roomData.roomId || roomData.id);

            dispatch({type: LOBBY_JOIN, payload: room});
            subscribe(dispatch);

            sharedHistory.push("/lobby/" + room.id);
        } catch (e) {

            if (e instanceof MatchMakeError && e.code === ROOM_NOT_FOUND_ERROR) {
                await create()(dispatch);
            }

            console.error(e);
        }
    };
}

export function leave(roomData) {
    return function(dispatch) {
        unsubscribe();
        dispatch({type: LOBBY_LEAVE});
        sharedHistory.push("/");
    };
}
