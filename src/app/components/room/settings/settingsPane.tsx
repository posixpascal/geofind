import React from "react";
import styled from "styled-components";
import {HorizontalAlignment} from "../../uiWidgets/HorizontalAlignment";
import {strings} from "../../../i18n";
import {
    MaxRoundsInput,
    RoomSettingsHeader,
    RoomSettingsPaneWrapper,
    RoundTimeInput,
    SelectInput,
    VictoryScoreInput
} from "./widgets";
import {GameModeSelection} from "./gameModeSelection";

export const RoomSettingsPane = ({collapsed, roomSettings, updateRoomSettings}) => {
    const updateSettingFromEvent = (key) => {
        return (event) => {
            updateRoomSettings({[key]: event.target.value})
        }
    };

    return (<RoomSettingsPaneWrapper collapsed={collapsed}>
        <HorizontalAlignment className="ha" style={{justifyContent: "space-between"}}>
            <div>
                <RoomSettingsHeader>{strings.gameMode}</RoomSettingsHeader>
                <GameModeSelection onChange={updateSettingFromEvent("gameMode")} />
            </div>
            <div>
                <RoomSettingsHeader>{strings.roundTime}</RoomSettingsHeader>
                <RoundTimeInput onChange={updateSettingFromEvent("roundTime")} maxLength={2}
                                defaultValue={roomSettings.roundTime}/>
            </div>
            <div>
                <RoomSettingsHeader>{strings.maxRound}</RoomSettingsHeader>
                <MaxRoundsInput onChange={updateSettingFromEvent("maxRounds")} maxLength={2}
                                defaultValue={roomSettings.maxRounds}/>
            </div>
            <div>
                <RoomSettingsHeader>{strings.victoryScore}</RoomSettingsHeader>
                <VictoryScoreInput onChange={updateSettingFromEvent("victoryScore")} maxLength={2}
                                   defaultValue={roomSettings.victoryScore}/>
            </div>
        </HorizontalAlignment>
        <div>
            <input type={"checkbox"} defaultChecked={roomSettings.insultMode}
                   onChange={() => updateRoomSettings({insultMode: !roomSettings.insultMode})}/> Insult
            Mode? <small>(Insults users randomly based on their bad answers)</small>
        </div>
    </RoomSettingsPaneWrapper>)
}
