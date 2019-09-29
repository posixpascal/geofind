import {webSocketConnection} from "../helper/webSockets";

export function joinLobby(lobby:any){
    return function(dispatch: any){
        webSocketConnection.emit("joinLobby", lobby);
    }
}


export function leaveLobby(lobby:any){
    return function(dispatch: any){
        webSocketConnection.emit("leaveLobby", lobby);
    }
}
