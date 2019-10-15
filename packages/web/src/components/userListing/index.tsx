import React from "react";
import {USER_LOGGED_IN} from "../../actions/types";
import {store} from "../../app";
import {client} from "../../helper/webSockets";
import {strings} from "../../i18n";
import {PlayerRows} from "./playerRows";
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

    const onColorChange = (color) => {
        window.currentRoom.send({type: "user:color:set", payload: color});
    };

    return (
        <UserListingWrapper>
            <PlayerRows room={room} onColorChange={onColorChange} players={room.players}/>
        </UserListingWrapper>
    );
};
