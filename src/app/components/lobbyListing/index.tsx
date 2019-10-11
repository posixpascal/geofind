import React from "react";
import {Globe, Key, Users} from "react-feather";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../actions/rooms";
import {strings} from "../../i18n";
import EmptyState from "../emptyState";
import {Badge} from "../uiWidgets/Badge";
import {JoinLobbyButton, LobbyIcon, LobbyName, LobbyRow} from "./widgets";

const LobbyListing = ({rooms, joinRoom, createRoom}) => {
    const RoomNameWithIcon = ({room}) => {
        const lobbyIcon = room.password ? <Key/> : <Globe/>;
        return (
            <div>
                <LobbyIcon>{lobbyIcon}</LobbyIcon>
                <LobbyName>{room.name !== "lobby" ? room.name : room.roomId}</LobbyName>
            </div>
        );
    };

    const RoomJoinButton = ({room, handleLobbyJoin}) => {
        return (
            <div>
                <Badge><Users/> {room.clients} / {room.maxClients} </Badge>
                <JoinLobbyButton onClick={handleLobbyJoin}>{strings.joinLobby}</JoinLobbyButton>
            </div>
        );
    };

    const RoomList = rooms.map((room) => {
        const handleLobbyJoin = () => {
            joinRoom(room);
        };

        return (
            <LobbyRow key={room.roomId}>
                <RoomNameWithIcon room={room}/>
                <RoomJoinButton room={room} handleLobbyJoin={handleLobbyJoin}/>
            </LobbyRow>
        );
    });

    const NoRoomFound = () => {
        return (
            <EmptyState
                title={strings.noLobbiesTitle}
                description={strings.noLobbiesDescription}
                ctaText={strings.createLobby}
                ctaLink={""}
                action={createRoom}
            />
        );
    };

    return (
        <div>
            {rooms.length ? <RoomList/> : <NoRoomFound/>}
        </div>
    );
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies};
}

export default withRouter(connect(mapStateToProps, actions)(LobbyListing));
