import React from "react";
import {Award, Eye, GitHub, Globe, Hexagon, Home, PlayCircle, Watch} from "react-feather";
import styled from "styled-components";
import {strings} from "../../../i18n";
import {RoomSetting, RoomSettingsWrapper} from "./widgets";

const GAME_MODE_ICONS = {
    game_countries: <Globe />,
    game_animals: <GitHub/>,
    game_buildings: <Home/>,
    game_shapeguessing: <Hexagon />,
    game_streetview: <Eye />};

export const RoomSettingsView = ({roomSettings}) => {
    const gameModeIcon = GAME_MODE_ICONS[roomSettings.gameMode] || <Globe />;

    return <RoomSettingsWrapper>
        <RoomSetting>
            {gameModeIcon}
            {strings.gameMode}
        </RoomSetting>
        <RoomSetting>
            <Watch/>
            {roomSettings.roundTime}s
        </RoomSetting>
        <RoomSetting>
            <PlayCircle/>
            {roomSettings.maxRounds}
        </RoomSetting>
        <RoomSetting>
            <Award/>
            {roomSettings.victoryScore}
        </RoomSetting>
    </RoomSettingsWrapper >;
};
