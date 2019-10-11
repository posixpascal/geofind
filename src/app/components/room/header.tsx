import React from "react";
import {Edit3, Settings} from "react-feather";
import styled from "styled-components";
import {strings} from "../../i18n";
import {arePlayersReady, isRoomLeader} from "../../shared/selectors";
import {Button} from "../uiWidgets/Button";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {RoomSettingsView} from "./settings";

const RoomHeaderWrapper = styled.h2`
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

export const RoomHeader = ({settingsClick, leaveRoomClick, startGameClick, editClick, roomSettings}) => {
    const isLeader = isRoomLeader(roomSettings);
    const allReady = arePlayersReady(roomSettings);
    const canStartGame = isLeader && allReady;

    return (
        <RoomHeaderWrapper>
            <div>{roomSettings.name ? roomSettings.name : roomSettings.id}
                {isLeader && <span><Edit3 onClick={editClick}/></span>}
                {isLeader && <span><Settings onClick={settingsClick}/></span>}
            </div>
            <RoomSettingsView roomSettings={roomSettings}/>
            <HorizontalAlignment className={"ha"}>
                <Button onClick={leaveRoomClick}>
                    {strings.leaveLobby}
                </Button>
                {canStartGame ? <Button onClick={startGameClick}>{strings.startGame}</Button> : <></>}
            </HorizontalAlignment>
        </RoomHeaderWrapper>
    );
};
