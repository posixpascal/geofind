import React, {useRef, useEffect, useState} from "react";
import * as actions from '../../actions/rooms';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import styled from "styled-components";
import {strings} from "../../i18n";
import {Button} from "../uiWidgets/Button";
import {Check, User, XCircle, Zap} from "react-feather";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {client} from "../../helper/webSockets";
import {TwitterPicker} from 'react-color'
import moment from "../chat";
import {store} from "../../main";
import {USER_LOGGED_IN} from "../../actions/types";

const UserListingWrapper = styled.div`
  width: 100%;
`;

const UserListingRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px;
  align-items:center;
  margin-bottom: 10px;
  padding-right: 30px;
  ${props => props.isUser && `
    background: #f0e3fb;
  `}
  
  @media (max-width: 767px){
    flex-direction: column;
    .userIcon {
      display: none;
    }
    
    font-size: 28px;
    padding: 20px 0;
  }
`;
const UserName = styled.div`
  margin: 0 8px;
  border-bottom: 1px dotted #ccc;
  font-size: 24px;
`;
export const UserColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #aaa;
`;
const ReadyButton = styled(Button)`
  position: relative;
  float: right;
  overflow:hidden;
  border:none;
  ${props => props.isReady ? `
    background:  rgba(97,202,97,.9);
      border-left: 10px solid rgb(70,140,70) !important;
    span { color: #fff !important; }
  ` : ""}
  
  ${props => props.inactive ? `pointer-events:none` : ""}
  span {
  color: #212121;
  font-size:20px;
  }
 
  
  :hover {
    background: rgba(97,202,97,.9) !important;
    border-left: 10px solid rgb(70,140,70) !important;
    span {
    color: #fff !important;
    }
  }
  :focus {
    background: #f1f1f1;
    span { color: #212121 !important; }
    ${props => props.isReady ? `

    background:  #60a760;
    span { color: #fff !important; }
  ` : ""}
  }
  ${props => !props.inactive && `
    :after {
        content: '';
        position: absolute;
        z-index: 40;
        width: 1px;
        top: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        background: rgba(97,202,97,.7);
        box-shadow: 0 0 25px 5px rgba(97,202,97,.7);
        -webkit-animation: readyAnim 5s infinite;
        -moz-animation: readyAnim 5s infinite;
        -o-animation: readyAnim 5s infinite;
        animation: readyAnim 5s infinite;
        position: absolute;
        z-index: 50;
        top: 0;
        bottom: 0;
        left: 0;
        width: 0;
        background-image: -moz-linear-gradient(left,#60a760 0,#61ca61 100%);
        background-image: -webkit-gradient(linear,left top,right top,color-stop(0,#60a760),color-stop(100%,#61ca61));
        background-image: -webkit-linear-gradient(left,#60a760 0,#61ca61 100%);
        background-image: -o-linear-gradient(left,#60a760 0,#61ca61 100%);
        background: -ms-linear-gradient(left,#60a760 0,#61ca61 100%);
        background: linear-gradient(to right,#60a760 0,#61ca61 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$from', endColorstr='$to', GradientType=1);
        -webkit-transition: all .2s ease;
        -o-transition: all .2s ease;
        transition: all .2s ease;
        -webkit-backface-visibility: hidden;
    }
    
    :focus {
        background: rgb(96, 167, 96) !important;
        border-color: rgb(96, 140, 96) !important;
        span {
            color: #fff !important;
        }
    }
    `}
`;
const UserIcon = styled.div`
  padding-right: 5px;
  svg {
  width: 32px;
  height: 32px;
  }
`;


const ColorPickerWrapper = styled.div`position:relative;`;

export const changeName = () => {
    const newName = prompt(strings.enterNewName);
    if (!newName) {
        return;
    }

    client.auth.displayName = newName;
    client.auth.save();
    store.dispatch({type: USER_LOGGED_IN, payload: client.auth})
    // TODO: update avatar url as well

    if ((window as any).currentRoom) (window as any).currentRoom.send({type: "user:displayName:set", payload: newName});
};

export default ({room, isLeader, players}) => {
    const [colorPicker, toggleColorPicker] = useState(false);
    const [muted, setMuted] = useState(!!localStorage.getItem("audioMuted"));

    const toggleMute = () => {
        if (localStorage.getItem("audioMuted")) {
            localStorage.removeItem("audioMuted");
            setMuted(false);
        } else {
            localStorage.setItem("audioMuted", "1");
            setMuted(true);
        }
    };

    const onColorChange = (color) => {
        (window as any).currentRoom.send({type: "user:color:set", payload: color});
        toggleColorPicker(false)
    };

    const toggleReady = () => {
        (window as any).currentRoom.send({type: "user:readyState:toggle"});
    };

    const kickPlayer = (player) => {
        (window as any).currentRoom.send({type: "user:kick", payload: player});
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
        top: '25px',
        left: '-8px'
    }

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    };

    if (!players) {
        return <span>Loading...</span>
    }


    return (
        <UserListingWrapper>
            {Object.keys(players).map((playerId) => {
                const player = players[playerId];
                const randomInsult = Math.floor(8 * Math.random()) + 1;
                console.log(randomInsult);
                const insultButton = <ReadyButton inactive={true}
                                                  isReady={false}><span>{strings[`userNotReady${randomInsult}`]}</span></ReadyButton>;
                const userIcon = isLeader ? <Zap/> : <User/>;
                const userReady = player.isReady ?
                    <ReadyButton inactive={true} isReady={true}><span>{strings.userReady}</span></ReadyButton> :
                    room.roomState.insultMode ? insultButton :
                        <ReadyButton inactive={true} isReady={player.isReady}><span>{strings.userNotReady}</span></ReadyButton>;

                return <UserListingRow isUser={client.auth._id === player.id} key={player.id}>
                    <HorizontalAlignment>
                        <UserIcon className={"userIcon"}>{userIcon}</UserIcon>
                        <UserName onClick={() => client.auth._id === player.id ? changeName() : () => {
                        }}>
                            <img src={player.avatarUrl} width={28}/>
                            {player.displayName}
                        </UserName>
                        <ColorPickerWrapper><UserColor
                            onClick={() => client.auth._id === player.id ? toggleColorPicker(!colorPicker) : () => {
                            }} style={{background: player.color}}/>
                            {colorPicker && client.auth._id === player.id ? <div style={popover}>
                                <div style={cover} onClick={() => toggleColorPicker(false)}/>
                                <TwitterPicker onChangeComplete={onColorChange}/>
                            </div> : null}
                        </ColorPickerWrapper>
                    </HorizontalAlignment>
                    <HorizontalAlignment>
                        {/*isLeader && client.auth._id  !== player.id &&
                        <Button onClick={() => kickPlayer(player)}><span>Kick</span></Button>*/}
                        {client.auth._id === player.id &&
                        <Button className={muted ? 'active' : ''} onClick={() => toggleMute()}>{muted ? <span>Muted</span> : <span>Mute?</span>}</Button>}
                        {client.auth._id === player.id ? <ReadyButton isReady={player.isReady}
                                                                      onClick={() => toggleReady()}><span>{player.isReady ? strings.userReady : strings.ready}</span></ReadyButton> : userReady}
                    </HorizontalAlignment>
                </UserListingRow>
            })}
        </UserListingWrapper>
    )
};

