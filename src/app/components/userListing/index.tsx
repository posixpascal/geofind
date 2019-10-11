import React from "react";
import {USER_LOGGED_IN} from "../../actions/types";
import {client} from "../../helper/webSockets";
import {strings} from "../../i18n";
import {store} from "../../main";
import {PlayerRow} from "./playerRow";
import {UserListingWrapper} from "./widgets";

export const changeName = () => {
    const newName = prompt(strings.enterNewName);
    if (!newName) {
        return;
    }

    client.auth.displayName = newName;
    client.auth.save();
    store.dispatch({type: USER_LOGGED_IN, payload: client.auth});
    // TODO: update avatar url as well

    if (window.currentRoom) {
        window.currentRoom.send({type: "user:displayName:set", payload: newName});
    }
};

export default ({room, players}) => {
    if (!players) {
        return <span>Loading...</span>;
    }

    const playerObjects = Object.keys(players).map((playerId) => players[playerId]);

    return (
        <UserListingWrapper>
            {players.map((player) => <div key={player.id}><PlayerRow room={room} player={playerObjects}/></div>)}
        </UserListingWrapper>
    );
};
