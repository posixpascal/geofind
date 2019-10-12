import {
    USER_LOGGED_IN,
} from "../actions/types";

import * as Colyseus from "colyseus.js";

export const client = new Colyseus.Client(process.env.NODE_ENV !== "production" ? "wss://gameserver.geofind.io" : "ws://localhost:3888");

if (process.env.NODE_ENV !== "production") {
    (window as any).client = client;
}

export const prefetchRooms = async (store) => {
};

export const authenticateUser = async (store) => {
    try {
        const auth = await client.auth.login();
        store.dispatch({type: USER_LOGGED_IN, payload: auth});
    } catch (e) {
        localStorage.removeItem("colyseus-auth-token");
    }
};
