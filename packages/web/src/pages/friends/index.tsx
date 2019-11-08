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

const FriendsPage = ({match, room, roomActions, gameActions}) => {
    return <div>friends</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendsPage));
