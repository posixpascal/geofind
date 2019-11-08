import React, {useState} from "react";
import styled, {css, keyframes} from "styled-components";
import {FancyButton, SmallButton} from "./index";
import {FancyDialog, FancyDialogContent, FancyDialogTrigger} from "../dialogs";
import {strings} from "../../i18n";
import {PinMarker} from "../game/maps/pinMarker";
import {PushPin} from "../../helper/svgs";
import {GameModeSelection} from "../room/settings/gameModeSelection";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {GameModeSlider, MapSetSlider} from "../slider";

const flyIn = keyframes`
    0% { transform: translateX(300px) translateY(-500px) rotate(0deg); }
    50% { transform: translateX(300px) translateY(-500px) rotate(20deg); }
    100% {
    transform: translateX(-50px) translateY(-38px) rotate(-35deg);
    }
`;

const WithPin = styled.div`
  display: flex;
  width: 350px;
  margin: 0 auto;
  ${FancyButton} {
    position: relative;
    left: 21px;
  }
  svg {
    position: relative;
    width: 42px;
    height: 42px;
    transform: translateX(300px) translateY(-500px);
   
    ${props => props.flyIn && css`
      animation: ${flyIn} ease-in-out 0.3s;
      animation-delay: 0.5s;
    `};
    animation-fill-mode: forwards;
  }
`;

export const SinglePlayerButton = ({title}) => {
    const [gameMode, setGameMode] = useState("countries");
    const [visible, setVisibility] = useState(false);
    const toggleVisibility = () => {
        setVisibility(!visible);
    };

    return <FancyDialog visible={visible}>
        <FancyDialogTrigger>
            <FancyButton onClick={toggleVisibility} variant={"orange"}>{title}</FancyButton>
        </FancyDialogTrigger>
        <FancyDialogContent>
            <HorizontalAlignment between={true}>
                <GameModeSlider />
                <MapSetSlider />
            </HorizontalAlignment>
            <WithPin flyIn={visible}>
                <SmallButton onClick={() => {}} variant={"green"} title={strings.startGame}/>
                <PushPin color={"#ff0000"}/>
            </WithPin>
        </FancyDialogContent>
    </FancyDialog>;
};
