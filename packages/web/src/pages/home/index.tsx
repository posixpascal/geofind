import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import styled from "styled-components";
import * as allGameActions from "../../actions/game";
import * as allRoomActions from "../../actions/rooms";
import LobbyListing from "../../components/lobbyListing";
import {Button} from "../../components/uiWidgets/Button";
import {client} from "../../helper/webSockets";
import {strings} from "../../i18n";

export const Overlay = styled.div`
    position: absolute;
    left: 0;
    min-height: -webkit-fill-available;
    top: 0px;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,.6);
    content: "";
    z-index:2;
`;
export const OverlayContent = styled.div`
  position: absolute;
  top: 80px;
  max-width: 90%;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 40px;
  box-shadow: 3px 3px 15px rgba(0,0,0,.3);
  z-index: 20;
  color: #212121;

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 48px;
    margin: 0;
    padding: 0;
    margin-bottom: 40px;
  }

  p {
    text-align: center;
    font-size: 24px;
  }

  @media (max-width: 767px){
    top:0;
    box-shadow: none;
    padding: 10px;
    max-width: 100% !important;
    h2 {
    padding-top: 20px;
    font-size: 24px;
    }

    p {
    font-size: 16px;
    margin: 0;
    }
  }
`;

const REFRESH_RATE = 1000;

export const HomePage = ({gameActions, roomActions}) => {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const fetchInterval = setInterval(async () => {
            const listRooms = await client.getAvailableRooms("lobby");
            setRooms(listRooms);
        }, REFRESH_RATE);

        return () => {
            clearInterval(fetchInterval);
        };
    });

    useEffect(() => {
        if (window.currentRoom) {
            roomActions.leave(window.currentRoom);
        }

        if (window.currentGame) {
            gameActions.leave(window.currentGame);
        }
    });

    return (
        <div>
            <h2>{strings.homeTitle} </h2>

            <p>
                {strings.homeDescription}
            </p>
            <p>
                {strings.homeDescription2}
            </p>
            <p>
                {strings.homeDescription3}
            </p>

            {rooms.length > 0 && <Button onClick={roomActions.create}>{strings.createLobby}</Button>}
            <br/><br/>

            <LobbyListing rooms={rooms}/>
        </div>
    );
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies};
}

function mapDispatchToProps(dispatch) {
    return {
        gameActions: bindActionCreators(allGameActions, dispatch),
        roomActions: bindActionCreators(allRoomActions, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
