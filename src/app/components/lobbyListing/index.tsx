import React from "react";
import {strings} from "../../i18n";
import * as actions from '../../actions/lobby';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {Lobby} from "../../models/lobby";
import EmptyState from "../emptyState";
import {Globe, Key, Users} from "react-feather";
import {Badge} from "../uiWidgets/Badge";
import {joinLobbyFromListing} from "./actions";
import {JoinLobbyButton, LobbyIcon, LobbyName, LobbyRow} from "./widgets";


const LobbyListing = (props) => {
    return (
        <div>
            {props.lobbies.length ? props.lobbies.map((lobby: Lobby) => {
                const lobbyIcon = lobby.password ? <Key/> : <Globe/>;
                return (
                    <LobbyRow key={lobby.id}>
                        <div>
                            <LobbyIcon>{lobbyIcon}</LobbyIcon>
                            <LobbyName>{lobby.name}</LobbyName>
                        </div>
                        <div>
                            <Badge><Users/> {lobby.users.length} / 32 </Badge>
                            <JoinLobbyButton
                                onClick={() => joinLobbyFromListing(lobby)}>{strings.joinLobby}</JoinLobbyButton>
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
