import React from "react";
import {Award, Eye, GitHub, Globe, Hexagon, Home, PlayCircle, Watch} from "react-feather";
import {strings} from "../../../i18n";
import {RoomSetting, RoomSettingsWrapper} from "./widgets";

const GAME_MODE_ICONS = {
    game_animals: <GitHub/>,
    game_buildings: <Home/>,
    game_countries: <Globe/>,
    game_shapeguessing: <Hexagon/>,
    game_streetview: <Eye/>,
};

export const RoomSettingsView = ({room}) => {
    const gameModeIcon = GAME_MODE_ICONS[room.gameMode] || <Globe/>;

    return (
        <RoomSettingsWrapper>
            <RoomSetting>
                {gameModeIcon}
                {strings.gameMode}
            </RoomSetting>
            <RoomSetting>
                <Watch/>
                {room.roundTime}s
            </RoomSetting>
            <RoomSetting>
                <PlayCircle/>
                {room.maxRounds}
            </RoomSetting>
            <RoomSetting>
                <Award/>
                {room.victoryScore}
            </RoomSetting>
        </RoomSettingsWrapper>
    );
};
