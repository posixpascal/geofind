import React from "react";
import {strings} from "../../../i18n";
import {SelectInput} from "./widgets";

export const GameModeSelection = ({onChange}) => {
    return <SelectInput onChange={onChange}>
        <option value={"game_countries"}>{strings.gameModeCountries}</option>
        <option value={"game_animals"}>{strings.gameModeAnimals}</option>
        <option value={"game_streetview"}>{strings.gameModeStreetview}</option>
        <option value={"game_shapeguessing"}>{strings.gameModeShapeguessing}</option>
        <option value={"game_buildings"}>{strings.gameModeBuildings}</option>
    </SelectInput>
};
