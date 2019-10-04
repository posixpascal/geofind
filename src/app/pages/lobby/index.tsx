import React, {useState, useEffect} from "react";
import * as actions from "../../actions/lobby";
import styled from "styled-components";
import {strings} from "../../i18n";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {Content} from "../../components/uiWidgets/Content";
import {Settings} from "react-feather";
import ChatWindow from "../../components/chat";
import UserListing from "../../components/userListing";
import {Button} from "../../components/uiWidgets/Button";
import {HorizontalAlignment} from "../../components/uiWidgets/HorizontalAlignment";
import {leaveLobby} from "../../actions/lobby";
import {webSocketConnection} from "../../helper/webSockets";

const LobbyRoomHeader = styled.h2`
display: flex;
justify-content: space-between;
span {
padding: 0 20px;
}

  @media (max-width: 767px){ 
    flex-direction: column;
    justify-content: center;
    .ha {
      flex-direction: column !important;
      margin-top: 40px;
    }
    
    div  {
    display: flex;
    flex-direction: column;
    font-size: 44px;
    svg {
    width: 48px;
    height: 48px;
    margin: 15px 0;
    }
    }
  }
  
`;
const LobbyRoomSettingsPane = styled.div`
  background: #fafafa;
  padding: 0 20px;
  margin-bottom: 20px;
  transition: height ease-in-out 0.3s;
   overflow: hidden;
   text-align: center;
   div {
   padding-top: 15px;
   width: 100%;
   }
   
  ${props => !props.collapsed ? `height: 0px;` : "height: 200px"}
  
  @media (max-width: 767px){
      div {
      padding-top: 5px !important;
      }
       .ha {
          flex-direction: column !important;
       }
       ${props => !props.collapsed ? `
height: 0px;` : "height: 420px"}
   }
`;
const VictoryScoreInput = styled.input`
font-size: 42px;
text-align: center;
width: 80px;
`;
const RoundTimeInput = styled.input`
font-size: 42px;
text-align: center;
width: 80px;
`;
const MaxRoundsInput = styled.input`
font-size: 42px;
text-align: center;
width: 80px;
`;
const PasswordInput  = styled.input`
font-size: 42px;
text-align: center;
width: 200px;
`;
const LobbyRoomHeading = styled.h4`
  margin-top: 10px;
`;
const PublicPrivateSwitch = (props) => {
    return <div className="switch"><input type="checkbox" id="switch"/><label for="switch">Toggle</label> {props.text}
    </div>
};
const MainArea = styled.div`
  display: flex;
  
    @media (max-width: 767px){ 
    flex-direction: column-reverse;
    }
`;

import {Edit3} from "react-feather";

const LobbyPage = (props) => {
    if (!props.lobby) {
        props.joinLobby({id: props.match.params.id, password: localStorage.getItem("lastPassword")});
        return <span>Loading...</span>
    }
    const setNewName = () => {
        const newName = prompt(strings.enterNewLobbyName);
        if (newName) {
            updateLobby({name: newName})
        }
    };
    const leaveLobby = () => {
        webSocketConnection.emit("leaveLobby", props.lobby);
    };

    const startGame = () => {
        webSocketConnection.emit("startGame")
    };

    const updateLobby = (change) => {
        webSocketConnection.emit("updateLobby", change);
    };

    const [collapsed, setCollapsed] = useState(false);

    let isLeader = false;
    let allReady = true;

    for (let user of props.users) {
        if (!user.isReady) {
            allReady = false;
        }
        if (user.isLeader && user.id === props.user.id) {
            isLeader = true;
        }
    }

    return (
        <div>
            <LobbyRoomHeader>
                <div>{props.lobby.name || "Lobby"} {isLeader && <span><Edit3 onClick={() => setNewName()}/></span>}{isLeader &&
                <span><Settings onClick={() => setCollapsed(!collapsed)}/></span>}</div>
                <HorizontalAlignment className={"ha"}>
                    <Button onClick={leaveLobby}>
                        {strings.leaveLobby}
                    </Button>
                    {isLeader && allReady ? <Button onClick={startGame}>
                        {strings.startGame}
                    </Button> : <></>}
                </HorizontalAlignment>
            </LobbyRoomHeader>

            {isLeader && <LobbyRoomSettingsPane collapsed={collapsed}>
                <HorizontalAlignment className="ha" style={{justifyContent: "space-between"}}>
                    <div><LobbyRoomHeading>{strings.victoryScore}</LobbyRoomHeading>
                        <VictoryScoreInput onChange={ev => {
                            updateLobby({victoryScore: ev.target.value})
                        }} maxLength={2} defaultValue={props.lobby.victoryScore}/></div>
                    <div><LobbyRoomHeading>{strings.maxRound}</LobbyRoomHeading>
                        <MaxRoundsInput onChange={ev => {
                            updateLobby({maxRounds: ev.target.value})
                        }} maxLength={2} defaultValue={props.lobby.maxRounds}/></div>
                    <div><LobbyRoomHeading>{strings.roundTime}</LobbyRoomHeading>
                        <RoundTimeInput onChange={ev => {
                            updateLobby({roundTime: ev.target.value})
                        }} maxLength={2} defaultValue={props.lobby.roundTime}/></div>
                    <div><LobbyRoomHeading>{strings.password}</LobbyRoomHeading>
                        <PasswordInput onChange={ev => {
                            updateLobby({password: ev.target.value, isPrivate: ev.target.value.length > 0});
                            localStorage.setItem("lastPassword", ev.target.value);
                        }} defaultValue={props.lobby.password}/></div>
                    {/*<LobbyRoomHeading>{strings.yourLobbyIs}</LobbyRoomHeading>
                <PublicPrivateSwitch text={props.lobby.isPrivate ? strings.private : strings.public }/>*/}
                </HorizontalAlignment>
            </LobbyRoomSettingsPane>}

            <MainArea>
                <ChatWindow>

                </ChatWindow>
                <UserListing isLeader={isLeader}>

                </UserListing>
            </MainArea>
            <br/><br/>
            <div>{strings.inviteTip}</div>
            <code style={{wordBreak: "break-all", whiteSpace: "normal"}}>{window.location.href}</code>
        </div>
    );
};

function mapStateToProps(state) {
    return {...state.lobby, user: state.user}
}

export default withRouter(connect(mapStateToProps, actions)(LobbyPage));
