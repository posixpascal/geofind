import {client} from "../helper/webSockets";
import {sharedHistory} from "../helper/sharedHistory";
import {GAME_UPDATE, GAME_JOIN, GAME_LEAVE, LOBBY_UPDATE} from "./types";
import {async} from "q";
import {MatchMakeError} from "colyseus.js/lib/Client";
import {ROOM_NOT_FOUND_ERROR} from "../helper/errors";
import {createRoom, subscribeRoom, unsubscribeRoom} from "./rooms";


export function startGame(gameName = "game_countries", options = {}){
    return async function (dispatch) {
        const room: any = await client.create(gameName, options);
        dispatch({type: GAME_JOIN, payload: room});
        subscribeGame(dispatch);
        (window as any).currentRoom.send({type: "game:start", payload: room});
        sharedHistory.push("/game/" + gameName + "/" + room.id);
    }
}

export function joinGame(gameData, retryCount = 1) {
    return async function (dispatch) {
        try {
            const room = await client.joinById(gameData.id);

            dispatch({type: GAME_JOIN, payload: room});
            subscribeGame(dispatch);
            (window as any).isJoining = false; // todo: ugly fix.

            sharedHistory.push("/game/" + gameData.name + "/" + room.id);
        } catch (e) {

            if (e instanceof MatchMakeError && e.code === ROOM_NOT_FOUND_ERROR) {
                sharedHistory.push("/");
            }

            console.error(e);
        }
    }
}

export function leaveGame(roomData) {
    return function (dispatch) {
        unsubscribeGame();
        dispatch({type: GAME_LEAVE});
        sharedHistory.push("/");
    }
}


export function subscribeGame(dispatch){
    (window as any).currentGame.onStateChange((changes) => {
        dispatch({type: GAME_UPDATE, payload: changes });
    });
}

export function unsubscribeGame(){
    (window as any).currentGame.removeAllListeners();
}
