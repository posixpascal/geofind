import React, {useEffect, useState} from "react";
import {Globe, Key, Users} from "react-feather";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../actions/rooms";
import {sharedHistory} from "../../helper/sharedHistory";
import {client} from "../../helper/webSockets";
import {strings} from "../../i18n";
import {Lobby} from "../../models/lobby";
import EmptyState from "../emptyState";
import {Badge} from "../uiWidgets/Badge";
import {JoinLobbyButton, LobbyIcon, LobbyName, LobbyRow} from "./widgets";

const LobbyListing = ({rooms, joinRoom, createRoom}) => {
    return (
        <div>
            {rooms.length ? rooms.map((room) => {
                console.log(room);
                const lobbyIcon = room.password ? <Key/> : <Globe/>;
                return (
                    <LobbyRow key={room.roomId}>
                        <div>
                            <LobbyIcon>{lobbyIcon}</LobbyIcon>
                            <LobbyName>{room.name !== "lobby" ? room.name : room.roomId}</LobbyName>
                        </div>
                        <div>
                            {<Badge><Users/> {room.clients} / {room.maxClients || 32} </Badge>}
                            <JoinLobbyButton
                                onClick={() => joinRoom(room)}>{strings.joinLobby}</JoinLobbyButton>
                        </div>
                    </LobbyRow>
                );
            }) : <EmptyState title={strings.noLobbiesTitle} description={strings.noLobbiesDescription}
                             ctaText={strings.createLobby} action={createRoom}/>}
        </div>
    );
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies};
}

export default withRouter(connect(mapStateToProps, actions)(LobbyListing));
