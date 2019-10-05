import React, {useState, useEffect} from "react";
import {strings} from "../../i18n";
import * as actions from '../../actions/rooms';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {Lobby} from "../../models/lobby";
import EmptyState from "../emptyState";
import {Globe, Key, Users} from "react-feather";
import {Badge} from "../uiWidgets/Badge";
import {JoinLobbyButton, LobbyIcon, LobbyName, LobbyRow} from "./widgets";
import {client} from "../../helper/webSockets";
import {sharedHistory} from "../../helper/sharedHistory";


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
                )
            }) : <EmptyState title={strings.noLobbiesTitle} description={strings.noLobbiesDescription}
                             ctaText={strings.createLobby} action={createRoom}/>}
        </div>
    )
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies}
}

export default withRouter(connect(mapStateToProps, actions)(LobbyListing));
