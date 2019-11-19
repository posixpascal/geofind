import {client} from "../helper/webSockets";
import {store} from "../app";
import {USER_LOGGED_IN} from "./types";

export const changeName = (newName: string) => {
    return (dispatch) => {
        client.auth.displayName = newName;
        dispatch({type: USER_LOGGED_IN, payload: client.auth});
        // TODO: update avatar url as well

        if (window.currentRoom) {
            window.currentRoom.send({type: "user:displayName:set", payload: newName});
        }

        try {
            client.auth.save();
        } catch (e) {
            // todo: instrumentation needed
        }
    }
};
