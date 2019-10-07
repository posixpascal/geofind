import React, {useEffect, useState} from "react";
import LobbyListing from "../../components/lobbyListing";
import {strings} from "../../i18n";
import {Content} from "../../components/uiWidgets/Content";
import styled from "styled-components";
import {Button} from "../../components/uiWidgets/Button";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import * as actions from "../../actions/rooms";
import * as gameActions from "../../actions/game";
import {client} from "../../helper/webSockets";
import {sharedHistory} from "../../helper/sharedHistory";

const ThemesPage = ({ leaveRoom, leaveGame, createRoom }) => {

    return (
        <div>
         <h1>Choose A Map Theme</h1>
        </div>
    );
};



function mapStateToProps(state) {
    return {lobbies: state.lobbies}
}

export default withRouter(connect(mapStateToProps, {...actions, ...gameActions})(ThemesPage));
