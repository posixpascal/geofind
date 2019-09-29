import React from "react";
import LobbyListing from "../../components/lobbyListing";
import {strings} from "../../i18n";
import {Content} from "../../components/uiWidgets/Content";
import {GameMap} from "../game";
import {NavLink, withRouter} from "react-router-dom";
import styled from "styled-components";
import {Button} from "../../components/uiWidgets/Button";
export const Overlay = styled.div`
    position: absolute;
    left: 0;
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
`;



export const HomePage = (props) => {
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

            <center><NavLink to={"/lobby/new"}>
                <Button>{strings.createLobby}</Button>
            </NavLink></center>
            <br/><br/>

                <LobbyListing/>
        </div>
    );
};
