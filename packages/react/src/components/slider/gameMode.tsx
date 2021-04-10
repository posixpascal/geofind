import React from "react";
import Slider from "react-slick";
import {strings} from "../../i18n";
import {SLIDER_SETTINGS, SliderWrapper} from "./mapSet";
import COUNTRIES_SVG from "../../assets/categories/countries.svg";
import CAPITALS_SVG from "../../assets/categories/capitals.svg";
import SIGHTSEEING_SVG from "../../assets/categories/sightseeing.svg";

export const GameModeSlider = ({onChange}) => {
    const modes = [
        {
            name: "countries",
            image: COUNTRIES_SVG
        },
        {
            name: "capitals",
            image: CAPITALS_SVG
        },
        {
            name: "sightseeing",
            image: SIGHTSEEING_SVG
        }
    ];

    const changeItem = (index) => {
        onChange(modes[index].name);
    }

    return (
        <SliderWrapper>
            <h3>{strings.gameMode}</h3>
            <Slider afterChange={changeItem} {...SLIDER_SETTINGS}>
                {modes.map(mode => (<div key={mode.name}>
                    <img alt={mode.name} src={mode.image}/>
                    <h4>{mode.name}</h4>
                </div>))}
            </Slider>
        </SliderWrapper>
    );
};
