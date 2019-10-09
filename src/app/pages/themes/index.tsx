import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import styled from "styled-components";
import * as gameActions from "../../actions/game";
import * as actions from "../../actions/rooms";
import LobbyListing from "../../components/lobbyListing";
import {Button} from "../../components/uiWidgets/Button";
import {Content} from "../../components/uiWidgets/Content";
import {sharedHistory} from "../../helper/sharedHistory";
import {client} from "../../helper/webSockets";
import {strings} from "../../i18n";

const ThemesPage = ({ leaveRoom, leaveGame, createRoom }) => {

    return (
        <div>
         <h1>Choose A Map Theme</h1>
        </div>
    );
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies};
}

export default withRouter(connect(mapStateToProps, {...actions, ...gameActions})(ThemesPage));
