import React, {useState, useEffect} from "react";
import * as roomActions from "../../actions/rooms";
import * as gameActions from "../../actions/game";
import styled from "styled-components";
import {strings} from "../../i18n";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {Content} from "../../components/uiWidgets/Content";
import {Award, Eye, Gift, GitHub, Globe, Hexagon, Home, PlayCircle, Settings, Watch} from "react-feather";
import ChatWindow from "../../components/chat";
import UserListing from "../../components/userListing";
import {Button} from "../../components/uiWidgets/Button";
import {HorizontalAlignment} from "../../components/uiWidgets/HorizontalAlignment";

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
   
  ${props => !props.collapsed ? `height: 0px;` : "height: 240px"}
  
  @media (max-width: 767px){
      div {
      padding-top: 5px !important;
      }
       .ha {
          flex-direction: column !important;
       }
       ${props => !props.collapsed ? `
height: 0px;` : "height: 640px"}
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
const SelectInput = styled.select`
    font-size: 30px;
    text-align: center;
    width: 100%;
    border-radius: 0;
    background: #fff;
    height: 56px;
`;
const PasswordInput = styled.input`
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
const RoundStats= styled.div`
   display: flex;
    font-size: 18px; 
    align-items: center;
    justify-content: space-between;
    @media (max-width: 767px){
      font-size: 12px !important;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row !important;
    }
`;
const RoundStatus = styled.div`
  padding: 0 30px;
  display: flex;
   
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    display: block;
  }
  
  @media (max-width: 767px){
    font-size: 18px !important;
    padding: 0 20px;
    width: 100%;
    flex: 0 50%;
    margin-bottom: 30px;
    svg {
    width: 20px;
    height: 20px;
    }
   }
`;

const MainArea = styled.div`
  display: flex;
  
    @media (max-width: 767px){ 
    flex-direction: column-reverse;
    }
`;

import {Edit3} from "react-feather";
import {client} from "../../helper/webSockets";
import {sharedHistory} from "../../helper/sharedHistory";

const LobbyPage = ({match, room, joinRoom, leaveRoom, startGame,game, joinGame}) => {
    const [collapsed, setCollapsed] = useState(false);


    const setNewName = () => {
        const newName = prompt(strings.enterNewLobbyName);
        if (newName) {
            (window as any).currentRoom.send({type: "room:name:set", payload: newName});
        }
    };

    const setInsultMode = () => {
        (window as any).currentRoom.send({type: "room:insultMode:set", payload: !room.roomState.insultMode});
    };

    const updateLobby = (payload) => {
        (window as any).currentRoom.send({type: "room:update", payload});
    };


    let isLeader = room && room.roomState.leader === client.auth._id;
    let allReady = false;

    if (room) { // room might be in initializing state.
        allReady = true;
        for (let player in room.roomState.players) {
            if (!room || !room.roomState.players[player].isReady) {
                allReady = false;
            }
        }
    }

    useEffect(() => {
        if (!(window as any).currentRoom){ return; }

        // wait for game creation and let user follow the leader
        (window as any).currentRoom.onMessage(message => {
            switch (message.type) {
                case "game:created":
                    if (!(window as any).isJoining && !(window as any).currentGame && !isLeader) {
                        (window as any).isJoining = true;
                        joinGame(message.payload);
                    }
                    break;
            }
        });

    });

    if (!room) {
        joinRoom({id: match.params.id});
        return <span>Loading...</span>
    }



    return (
        <div>
            <LobbyRoomHeader>
                <div>{room.roomState.name ? room.roomState.name : room.roomState.id}
                    {isLeader &&
                    <span><Edit3 onClick={() => setNewName()}/></span>}

                    {isLeader &&
                    <span><Settings onClick={() => setCollapsed(!collapsed)}/></span>}</div>
                <RoundStats>
                    <RoundStatus>
                        {room.roomState.gameMode == "game_countries" && <Globe />}
                        {room.roomState.gameMode == "game_animals" && <GitHub/>}
                        {room.roomState.gameMode == "game_buildings" && <Home/>}
                        {room.roomState.gameMode == "game_shapeguessing" && <Hexagon />}
                        {room.roomState.gameMode == "game_streetview" && <Eye />}
                        {strings.gameMode}
                    </RoundStatus>
                    <RoundStatus>
                        <Watch/>
                        {room.roomState.roundTime}s
                    </RoundStatus>
                    {/* impl bonus rounds without borders<RoundStatus>
                        <Gift/>
                        {room.roomState.bonusRounds}
                    </RoundStatus>*/}
                    <RoundStatus>
                        <PlayCircle/>
                        {room.roomState.maxRounds}
                    </RoundStatus>
                    <RoundStatus>
                        <Award/>
                        {room.roomState.victoryScore}
                    </RoundStatus>
                </RoundStats>
                <HorizontalAlignment className={"ha"}>
                    <Button onClick={leaveRoom}>
                        {strings.leaveLobby}
                    </Button>
                    {isLeader && allReady ? <Button onClick={() => startGame(room.roomState.gameMode, {room: room.roomState})}>
                        {strings.startGame}
                    </Button> : <></>}
                </HorizontalAlignment>
            </LobbyRoomHeader>

            {isLeader && <LobbyRoomSettingsPane collapsed={collapsed}>
                <HorizontalAlignment className="ha" style={{justifyContent: "space-between"}}>
                    <div><LobbyRoomHeading>{strings.gameMode}</LobbyRoomHeading>
                        <SelectInput onChange={ev => {
                            updateLobby({gameMode: ev.target.value})
                        }}>
                            <option value={"game_countries"}>{strings.gameModeCountries}</option>
                            <option value={"game_animals"}>{strings.gameModeAnimals}</option>
                            <option value={"game_streetview"}>{strings.gameModeStreetview}</option>
                            <option value={"game_shapeguessing"}>{strings.gameModeShapeguessing}</option>
                            <option value={"game_buildings"}>{strings.gameModeBuildings}</option>
                        </SelectInput></div>
                    <div><LobbyRoomHeading>{strings.roundTime}</LobbyRoomHeading>
                        <RoundTimeInput onChange={ev => {
                            updateLobby({roundTime: ev.target.value})
                        }} maxLength={2} defaultValue={room.roomState.roundTime}/></div>
                    <div><LobbyRoomHeading>{strings.maxRound}</LobbyRoomHeading>
                        <MaxRoundsInput onChange={ev => {
                            updateLobby({maxRounds: ev.target.value})
                        }} maxLength={2} defaultValue={room.roomState.maxRounds}/></div>

                    <div><LobbyRoomHeading>{strings.victoryScore}</LobbyRoomHeading>
                        <VictoryScoreInput onChange={ev => {
                            updateLobby({victoryScore: ev.target.value})
                        }} maxLength={2} defaultValue={room.roomState.victoryScore}/></div>
                </HorizontalAlignment>
                <div>
                    <input type={"checkbox"} defaultChecked={room.roomState.insultMode} onChange={setInsultMode} /> Insult Mode? <small>(Insults users randomly based on their bad answers)</small>
                </div>
            </LobbyRoomSettingsPane>}

            <MainArea>
                <ChatWindow players={room.roomState.players} messages={room.roomState.messages}>

                </ChatWindow>
                <UserListing isLeader={isLeader} room={room} players={room.roomState.players}>

                </UserListing>
            </MainArea>
            <br/><br/>
            <div>{strings.inviteTip}</div>
            <code style={{wordBreak: "break-all", whiteSpace: "normal"}}>{window.location.href}</code>
        </div>
    );
};

function mapStateToProps(state) {
    return {room: state.room, game: state.game}
}

export default withRouter(connect(mapStateToProps, {...roomActions, ...gameActions})(LobbyPage));
