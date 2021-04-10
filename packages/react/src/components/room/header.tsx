import React from "react";
import {Edit3, Settings} from "react-feather";
import styled from "styled-components";
import {strings} from "../../i18n";
import {arePlayersReady, isRoomLeader} from "../../shared/selectors";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {RoomSettingsView} from "./settings";
import {Button} from "../buttons";

const RoomHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      padding: 0 20px;
    }
    h2 {
        font-family: 'Luckiest Guy', cursive;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        
        // better alignment for the eye
        svg {
          position: relative;
          top: -4px;
          left: -5px;
        }
    }  
`;

export const WithHint = styled.p`
  position: relative;
  :after {
    content: "${(attr) => attr.hint}";
    font-size: 16px;
    color: #aaa;
    position: absolute;
    bottom: 5px;
    left: 15px;
    text-transform: uppercase;
    font-family: "Luckiest Guy", cursive;
    text-align: center;
    width: 100%;
    white-space:nowrap;
  }
`;

export const RoomHeader = ({settingsClick, room}) => {
    const isLeader = isRoomLeader(room);

    console.log(room);
    return (
        <RoomHeaderWrapper>
            <HorizontalAlignment>
                <WithHint hint={strings.roomNameInfo} as={"h2"}>
                    <span>{room.name || room.id}</span>
                    {isLeader && <span><Settings onClick={settingsClick}/></span>}
                </WithHint>
            </HorizontalAlignment>
        </RoomHeaderWrapper>
    );
};
