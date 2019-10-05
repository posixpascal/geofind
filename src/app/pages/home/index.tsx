import React, {useEffect, useState} from "react";
import LobbyListing from "../../components/lobbyListing";
import {strings} from "../../i18n";
import {Content} from "../../components/uiWidgets/Content";
import {GameMap} from "../game_countries";
import styled from "styled-components";
import {Button} from "../../components/uiWidgets/Button";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import * as actions from "../../actions/rooms";
import * as gameActions from "../../actions/game";
import {client} from "../../helper/webSockets";
import {sharedHistory} from "../../helper/sharedHistory";
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


const HomePage = ({ leaveRoom, leaveGame, createRoom }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        let fetchInterval = setInterval(async () => {
            const rooms = await client.getAvailableRooms("lobby");
            setRooms(rooms);
        }, REFRESH_RATE);
        return () => {
            clearInterval(fetchInterval);
        }
    });

    useEffect(() => {
        if ((window as any).currentRoom){
            leaveRoom((window as any).currentRoom);
        }

        if ((window as any).currentGame){
            leaveGame((window as any).currentGame);
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

            {rooms.length > 0 && <center>
                <Button onClick={createRoom}>{strings.createLobby}</Button>
            </center>}
            <br/><br/>

            <LobbyListing rooms={rooms}/>
        </div>
    );
};



function mapStateToProps(state) {
    return {lobbies: state.lobbies}
}

export default withRouter(connect(mapStateToProps, {...actions, ...gameActions})(HomePage));
