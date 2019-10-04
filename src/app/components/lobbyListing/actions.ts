import {strings} from "../../i18n";
import {sharedHistory} from "../../helper/sharedHistory";
import {joinLobby} from "../../actions/lobby";

export const joinLobbyFromListing = (lobby) => {
    if (lobby.isPrivate){
        lobby.password = prompt(strings.enterPassword);
        localStorage.setItem("lastPassword", lobby.password);
    }
    joinLobby(lobby);
    sharedHistory.push(`/lobby_${lobby.id}`);
};
