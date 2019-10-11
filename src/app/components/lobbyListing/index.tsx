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
    const RoomList = rooms.map((room) => {
        const handleLobbyJoin = () => joinRoom(room);
        const lobbyIcon = room.password ? <Key/> : <Globe/>;
        return (
            <LobbyRow key={room.roomId}>
                <div>
                    <LobbyIcon>{lobbyIcon}</LobbyIcon>
                    <LobbyName>{room.name !== "lobby" ? room.name : room.roomId}</LobbyName>
                </div>
                <div>
                    {<Badge><Users/> {room.clients} / {room.maxClients || 32} </Badge>}
                    <JoinLobbyButton onClick={handleLobbyJoin}>{strings.joinLobby}</JoinLobbyButton>
                </div>
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
