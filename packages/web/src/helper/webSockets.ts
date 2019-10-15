import {
    USER_LOGGED_IN,
} from "../actions/types";

import * as Colyseus from "colyseus.js";

export const client = new Colyseus.Client(process.env.NODE_ENV === "production" ?
    process.env.REACT_APP_WEBSOCKET_URI : process.env.REACT_APP_WEBSOCKET_URI_LOCAL);
(client.auth as any).endpoint += "/social";

export const prefetchRooms = async (store) => {
};

export const authenticateUser = async (store) => {
    try {
        const auth = await client.auth.login();
        store.dispatch({type: USER_LOGGED_IN, payload: auth});
    } catch (e) {
        localStorage.removeItem("colyseus-auth-token");
        setTimeout(() => {
            authenticateUser(store);
        }, 200);
    }
};
