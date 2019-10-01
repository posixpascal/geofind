import React, {useRef, useState} from "react";
import * as actions from '../../actions/lobby';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import styled from "styled-components";
import {strings} from "../../i18n";
import {Button} from "../uiWidgets/Button";
import {Check, User, XCircle, Zap} from "react-feather";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {webSocketConnection} from "../../helper/webSockets";
import { TwitterPicker } from 'react-color'
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
    if (newName){updateUser({ name: newName })}
};

export const updateUser = (data) => {
    webSocketConnection.emit("updateUser", data);
};

const UserListing = (props) => {
    const users = props.users || [];
    const [colorPicker, toggleColorPicker] = useState(false);

    const toggleReady = () => {
        webSocketConnection.emit("toggleReadyState");
    };


    const kickPlayer = (user) => {
        webSocketConnection.emit("kickUser", user);
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
    }

    return (
        <UserListingWrapper>
            {users.map(user => {
                const userIcon = user.isLeader ? <Zap/> : <User/>;
                const userReady = user.isReady ? <ReadyButton inactive={true} isReady={true}><span>{strings.userReady}</span></ReadyButton> :
                    <ReadyButton inactive={true} isReady={false}><span>{strings.userNotReady}</span></ReadyButton>;

                return <UserListingRow isUser={props.user.id === user.id} key={user.id}>
                    <HorizontalAlignment>
                        <UserIcon>{userIcon}</UserIcon>
                        <UserName onClick={() => props.user.id === user.id ? changeName() : () => {}}>
                            <img src={user.image} width={28} />
                            {user.name}
                        </UserName>
                        <ColorPickerWrapper><UserColor onClick={() => props.user.id === user.id ? toggleColorPicker(!colorPicker) : () => {}} style={{background: user.color}}/>
                        { colorPicker && props.user.id === user.id ? <div style={ popover }>
                            <div style={ cover } onClick={() => toggleColorPicker(false) }/>
                            <TwitterPicker onChangeComplete={(color) => { updateUser({ color: color.hex }); toggleColorPicker(false) }} />
                        </div> : null }
                        </ColorPickerWrapper>
                    </HorizontalAlignment>
                    <HorizontalAlignment>
                        {props.isLeader && props.user.id !== user.id && <Button onClick={() => kickPlayer(user)}><span>Kick</span></Button>}
                        {props.user.id === user.id ? <ReadyButton isReady={user.isReady}
                                                              onClick={() => toggleReady()}><span>{user.isReady ? strings.userReady : strings.ready}</span></ReadyButton> : userReady}
                    </HorizontalAlignment>
                </UserListingRow>
            })}
        </UserListingWrapper>
    )
};

function mapStateToProps(state) {
    return {user: state.user, lobby: state.lobby, users: state.lobby.users}
}

export default withRouter(connect(mapStateToProps, actions)(UserListing));
