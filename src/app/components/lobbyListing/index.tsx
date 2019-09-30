import React from "react";
import styled from "styled-components";
import {strings} from "../../i18n";
import * as actions from '../../actions/lobby';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {Lobby} from "../../models/lobby";
import {EmptyState} from "../emptyState";
import {Globe, Key, Users} from "react-feather";
import {Badge} from "../uiWidgets/Badge";
import {sharedHistory} from "../../helper/sharedHistory";

const LobbyRow = styled.div`
    padding: 10px 20px;
    margin: 0 -40px;
    border-bottom: 1px solid #ddd;
    :first-child {
      border-top: 1px solid #ddd;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    background:#f9f9f9;
    div {
      display: flex;
      align-items: center;
    }
`;

const LobbyIcon = styled.div`
  margin-right: 10px;
  svg {
    width: 16px;
    height: 16px;
  }
`;
const LobbyName = styled.div``;

const JoinLobbyButton = styled.button`
  margin: 0 5px;
  height: 33px;
  line-height: 33px;
  
`;

const LobbyListing = (props) => {
    const joinLobby = (lobby) => {
        if (lobby.isPrivate){
            lobby.password = prompt(strings.enterPassword);
            localStorage.setItem("lastPassword", lobby.password);
        }
        props.joinLobby(lobby);
        sharedHistory.push(`/lobby_${lobby.id}`);
    };

    return (
        <div>
            {props.lobbies.length ? props.lobbies.map((lobby: Lobby) => {
                const lobbyIcon = lobby.password ? <Key /> : <Globe />;
                return (
                    <LobbyRow key={lobby.id}>
                        <div>
                            <LobbyIcon>{lobbyIcon}</LobbyIcon>
                            <LobbyName>{lobby.name}</LobbyName>
                        </div>
                        <div>
                            <Badge><Users /> {lobby.users.length} / 32 </Badge>
                            <JoinLobbyButton onClick={() => joinLobby(lobby)}>{strings.joinLobby}</JoinLobbyButton>
                        </div>
                    </LobbyRow>
                )
            }) : <EmptyState title={strings.noLobbiesTitle} description={strings.noLobbiesDescription}
                             ctaText={strings.createLobby} ctaLink={"/lobbies/new"}/>}
        </div>
    )
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies}
}

export default withRouter(connect(mapStateToProps, actions)(LobbyListing));
