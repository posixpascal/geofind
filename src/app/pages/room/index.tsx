import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";

import * as gameActions from "../../actions/game";
import * as roomActions from "../../actions/rooms";

import ChatWindow from "../../components/chat";
import {RoomJoinLoader} from "../../components/loading/roomJoinLoader";
import {RoomHeader, RoomInvitationLink} from "../../components/room";
import {RoomSettingsPane} from "../../components/room/settings";
import {BreakOnMobile} from "../../components/uiWidgets/BreakOnMobile";
import UserListing from "../../components/userListing";
import {isRoomLeader} from "../../shared/selectors";

const subscribeRoomEvents = ({isLeader, actions}) => {
    if (!window.currentRoom) {
        return;
    }

    // wait for game creation and let user follow the leader
    window.currentRoom.onMessage((message) => {
        if (message.type === "game:created") {
            if (!window.isJoining && !window.currentGame && !isLeader) {
                window.isJoining = true;
                actions.join(message.payload);
            }
        }
    });
};

const RoomPage = ({match, room, roomActions, gameActions}) => {
    const {roomState} = room;
    const [collapsed, setCollapsed] = useState(false);

    const isLeader = room && isRoomLeader(roomState);

    useEffect(() => subscribeRoomEvents({ isLeader, actions: {...gameActions} }));

    if (!room) {
        roomActions.join({id: match.params.id});
        return <RoomJoinLoader/>;
    }

    const roomHeaderActions = {
        startGameClick: () => gameActions.start(roomState.gameMode, {room: roomState}),
        settingsClick: () => setCollapsed(),
        leaveRoomClick: () => roomActions.leave(room),
        editClick: () => roomActions.setName(),
    };

    return (
        < >
            <RoomHeader {...roomHeaderActions} roomSettings={roomState}/>;

    {isLeader &&
            <RoomSettingsPane roomSettings={roomState} collapsed={collapsed} updateRoomSettings={roomActions.update}/>; }

    <BreakOnMobile reverse>
                <ChatWindow players={roomState.players} messages={roomState.messages}>

                </ChatWindow>
                <UserListing isLeader={isLeader} room={room} players={roomState.players}>

                </UserListing>
            </BreakOnMobile>
            <RoomInvitationLink/>; ;
        </ > ;
    )
}

function mapStateToProps(state) {
    return {room: state.room, game: state.game};
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomPage));
