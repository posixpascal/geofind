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
import {arePlayersReady, getCurrentPlayer, isRoomLeader} from "../../shared/selectors";
import {Button, SmallButton} from "../../components/buttons";
import {strings} from "../../i18n";
import {WithHint} from "../../components/room/header";
import {GetReadyButton} from "../../components/userListing/buttons";

const subscribeRoomEvents = ({isLeader, actions}) => {
    if (!window.currentRoom) {
        return;
    }

    // wait for game creation and let user follow the leader
    window.currentRoom.onMessage((message) => {
        if (message.type === "game:created") {
            if (!window.isJoining && !window.currentRoom && !isLeader) {
                window.isJoining = true;
                actions.join(message.payload);
            }
        }
    });
};

const RoomPage = ({match, room, roomActions, gameActions}) => {
    const [collapsed, setCollapsed] = useState(false);
    const isLeader = isRoomLeader(room);
    const allReady = arePlayersReady(room);
    const canStartGame = isLeader && allReady;
    const currentPlayer = getCurrentPlayer(room);


    const toggleReady = () => {
        window.currentRoom.send({type: "user:readyState:toggle"});
    };

    useEffect(() => subscribeRoomEvents({isLeader, actions: {...gameActions}}));

    if (!room) {
        roomActions.join({id: match.params.id});
        return <RoomJoinLoader/>;
    }

    const roomHeaderActions = {
        editClick: () => roomActions.setName(),
        leaveRoomClick: () => roomActions.leave(room),
        settingsClick: () => setCollapsed(!collapsed),
        startGameClick: () => gameActions.start(room.gameMode, {room}),
    };

    const LeaderSettingsPane = (
        <RoomSettingsPane
            room={room}
            collapsed={collapsed}
            updateRoomSettings={roomActions.update}
        />
    );
    return (
        <>
            <RoomHeader {...roomHeaderActions} room={room}/>

            {isLeader && LeaderSettingsPane}

            <BreakOnMobile reverse={true}>
                <UserListing room={room} players={room.players}/>
            </BreakOnMobile>
            {/*<RoomInvitationLink/>*/}

            {isLeader && <>
                {canStartGame && <Button
                    onClick={roomHeaderActions.startGameClick}
                    variant={"green"}
                    title={strings.startGame}/>
                }

                {!canStartGame && <WithHint hint={strings.usersNotReady}><Button
                    variant={"disabled"}
                    title={strings.startGame}/></WithHint>
                }
            </>}

            {!isLeader && <>
                {currentPlayer.isReady && <Button variant={"yellow"} loading title={"Waiting..."}  />}
                {!currentPlayer.isReady && <Button onClick={toggleReady} variant={"gray"} title={"I am ready"}  />}
            </>}

            <Button onClick={roomActions.leave} variant={"red"} title={strings.leaveRoom}/>
            <SmallButton onClick={() => {
            }} variant={"purple"} title={strings.inviteFriends}/>
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
