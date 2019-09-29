import {sharedHistory} from "./sharedHistory";
import {LOBBIES_LIST, LOBBY_JOIN, LOBBY_UPDATE, LOBBY_MESSAGE, GAME_UPDATE, USER_CONNECTED, USER_LIST_LOBBY} from "../actions/types";

declare const io : any;
export const webSocketConnection = io("http://localhost:3888");

export const initWebSockets = (store) => {
    // TODO: extract into config.
    webSocketConnection.on('welcome', (data) => {
        store.dispatch({ type: USER_CONNECTED, payload: data})
    });

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

    /*webSocketConnection.on("userChatMessage", (message) => {
        store.dispatch({type: LOBBY_MESSAGE, payload: message })
    });*/

    webSocketConnection.on("lobbyCreated", (lobby) => {
       sharedHistory.push(`/lobby/${lobby.id}`)
    });

    webSocketConnection.on("lobbyNotFound", (lobby) => {
        console.error("Lobby not found.");
        sharedHistory.push(`/`)
    });

    webSocketConnection.on("gameCreated", (game) => {
        sharedHistory.push(`/game/${game.id}`);
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

