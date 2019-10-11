import React from "react";
import styled from "styled-components";
import {strings} from "../../../i18n";
import {HorizontalAlignment} from "../../uiWidgets/HorizontalAlignment";
import {GameModeSelection} from "./gameModeSelection";
import {
    MaxRoundsInput,
    RoomSettingsHeader,
    RoomSettingsPaneWrapper,
    RoundTimeInput,
    SelectInput,
    VictoryScoreInput,
} from "./widgets";

export const RoomSettingsPane = ({collapsed, roomSettings, updateRoomSettings}) => {
    const updateSettingFromEvent = (key) => {
        return (event) => {
            updateRoomSettings({[key]: event.target.value});
        };
    };

    const settings = [
        {key: "gameMode", component: GameModeSelection},
        {key: "roundTime", component: RoundTimeInput},
        {key: "maxRounds", component: MaxRoundsInput},
        {key: "victoryScore", component: VictoryScoreInput},
    ];

    return (<RoomSettingsPaneWrapper collapsed={collapsed}>
        <HorizontalAlignment className="ha" style={{justifyContent: "space-between"}}>
            {settings.map(settingsField => {
                return <div>
                    <RoomSettingsHeader>{strings[settingsField.key]}</RoomSettingsHeader>
                    <settingsField.component onChange={updateSettingFromEvent(settingsField.key)}/>
                </div>
            })}
        </HorizontalAlignment>
        <div>
            <input type={"checkbox"} defaultChecked={roomSettings.insultMode}
                   onChange={() => updateRoomSettings({insultMode: !roomSettings.insultMode})}/> Insult
            Mode? <small>(Insults users randomly based on their bad answers)</small>
        </div>
    </RoomSettingsPaneWrapper>);
};
