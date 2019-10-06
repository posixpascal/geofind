import {client} from "../helper/webSockets";
import {LOBBY_JOIN, LOBBY_LEAVE, LOBBY_UPDATE} from "./types";
import {sharedHistory} from "../helper/sharedHistory";
import {ROOM_NOT_FOUND_ERROR} from "../helper/errors";
import {MatchMakeError} from "colyseus.js/lib/Client";

export function createRoom() {
    return async function (dispatch) {
        const room = await client.create("lobby");
        dispatch({type: LOBBY_JOIN, payload: room});
        subscribeRoom(dispatch);
        sharedHistory.push("/lobby/" + room.id);
    }
}

export function subscribeRoom(dispatch){
    (window as any).currentRoom.onStateChange((changes) => {
        dispatch({type: LOBBY_UPDATE, payload: changes });
    });
}

export function unsubscribeRoom(){
    (window as any).currentRoom.removeAllListeners();
}



export function joinRoom(roomData) {
    return async function (dispatch) {
        try {
            const room = await client.joinById(roomData.roomId || roomData.id);

            dispatch({type: LOBBY_JOIN, payload: room});
            subscribeRoom(dispatch);

            sharedHistory.push("/lobby/" + room.id);
        } catch (e) {

            if (e instanceof MatchMakeError && e.code === ROOM_NOT_FOUND_ERROR) {
                await createRoom()(dispatch);
            }

            console.error(e);
        }
    }
}

export function leaveRoom(roomData) {
    return function (dispatch) {
        unsubscribeRoom();
        dispatch({type: LOBBY_LEAVE});
        sharedHistory.push("/");
    }
}
