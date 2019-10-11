import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as allGameActions from "../../actions/game";
import * as allRoomActions from "../../actions/rooms";
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

    useEffect(() => subscribeRoomEvents({isLeader, actions: {...gameActions}}));

    if (!room) {
        roomActions.join({id: match.params.id});
        return <RoomJoinLoader/>;
    }

    const roomHeaderActions = {
        editClick: () => roomActions.setName(),
        leaveRoomClick: () => roomActions.leave(room),
        settingsClick: () => setCollapsed(),
        startGameClick: () => gameActions.start(roomState.gameMode, {room: roomState}),
    };

    const LeaderSettingsPane = (
        <RoomSettingsPane
            roomSettings={roomState}
            collapsed={collapsed}
            updateRoomSettings={roomActions.update}
        />
    );

    return (
        <>
            <RoomHeader {...roomHeaderActions} roomSettings={roomState}/>;

            {isLeader && <LeaderSettingsPane/>}

            <BreakOnMobile reverse={true}>
                <ChatWindow players={roomState.players} messages={roomState.messages}/>
                <UserListing isLeader={isLeader} room={room} players={roomState.players}/>
            </BreakOnMobile>
            <RoomInvitationLink/>
        </>
    );
};

function mapStateToProps(state) {
    return {room: state.room, game: state.game};
}

function mapDispatchToProps(dispatch) {
    return {
        gameActions: bindActionCreators(allGameActions, dispatch),
        roomActions: bindActionCreators(allRoomActions, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomPage));
