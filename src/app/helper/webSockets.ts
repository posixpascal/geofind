import {
    LOBBIES_LIST,
    USER_LOGGED_IN,
} from "../actions/types";
import {sharedHistory} from "./sharedHistory";

import * as Colyseus from "colyseus.js";
export const client = new Colyseus.Client(process.env.NODE_ENV == "production" ? "wss://gameserver.geofind.io" : "ws://localhost:3888");

if (process.env.NODE_ENV !== "production"){
    (window as any).client = client;
}

export const prefetchRooms = async (store) => {
};

export const authenticateUser = async (store) => {
    try {
        const auth = await client.auth.login();
        store.dispatch({type: USER_LOGGED_IN, payload: auth});
    } catch (e){
        localStorage.removeItem("colyseus-auth-token");
    }
};

/*
export const webSocketConnection = io();

export const initWebSockets = (store) => {

    let timer = false;
    let connected = false;
    let reconnectTimer = setTimeout(() => {
        if (!connected){ window.location.reload(true); }
    }, 6000);
    webSocketConnection.on("connect", () => {
        connected = true;
        if (timer){
            clearInterval(timer);
        }
        webSocketConnection.emit('welcome', localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    });

    // TODO: extract into config.
    webSocketConnection.on('welcome', (data) => {
        store.dispatch({ type: USER_CONNECTED, payload: data})
    });

    webSocketConnection.on("disconnect", () => {
        store.dispatch({ type: USER_DISCONNECTED, payload: false})
        timer = setInterval(() => {
            webSocketConnection.connect();
        }, 500);
    })

    // TODO: cleanup
    try {
        if (localStorage.getItem("user")){
            webSocketConnection.emit("userLogon", JSON.parse(localStorage.getItem("user")));
        }
    } catch (e){

    }

    webSocketConnection.on('lobbyList', (lobbies) => {
        console.log("LobbyList: ", lobbies);
        store.dispatch({ type: LOBBIES_LIST, payload: lobbies });
    });

    webSocketConnection.on("userListLobby", (users) => {
        console.log(users);
        store.dispatch({ type: USER_LIST_LOBBY, payload: users })
    });

    webSocketConnection.on("gameUpdate", (game) => {
        store.dispatch({ type: GAME_UPDATE, payload: game })
    });

    webSocketConnection.on("updateLobby", (lobby) => {
       store.dispatch({type: LOBBY_UPDATE, payload: lobby })
    });

    webSocketConnection.on("userChatMessage", (message) => {
        store.dispatch({type: LOBBY_MESSAGE, payload: message })
    });

    webSocketConnection.on("lobbyCreated", (lobby) => {
       sharedHistory.push(`/lobby_${lobby.id}`)
    });

    webSocketConnection.on("lobbyNotFound", (lobby) => {
        console.error("Lobby not found.");
        sharedHistory.push(`/`)
    });

    webSocketConnection.on("gameCreated", (game) => {
        sharedHistory.push(`/game_${game.id}`);
    })

    webSocketConnection.on("lobbyJoined", (lobby) => {
       store.dispatch({type: LOBBY_JOIN, payload: lobby})
    });

    webSocketConnection.on("lobbyLeft", (lobby) => {
        sharedHistory.push(`/`)
    });

    webSocketConnection.on('serverError', (err) => {
        console.error("ServerError: ", err);
    });
};
*/
