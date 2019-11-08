import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import {strings} from "../../i18n";
import {SLIDER_SETTINGS, SliderWrapper} from "./mapSet";
import COUNTRIES_SVG from "../../assets/categories/countries.svg";
import ANIMALS_SVG from "../../assets/categories/animals.svg";
import CAPITALS_SVG from "../../assets/categories/capitals.svg";
import SIGHTSEEING_SVG from "../../assets/categories/sightseeing.svg";


export const GameModeSlider = () => {
    return (
        <SliderWrapper>
            <h3>{strings.gameMode}</h3>
            <Slider {...SLIDER_SETTINGS}>
                <div>
                    <img src={COUNTRIES_SVG} />
                    <h4>Länder</h4>
                </div>
                <div>
                    <img src={ANIMALS_SVG} />
                    <h4>Tiere</h4>
                </div>
                <div>
                    <img src={CAPITALS_SVG} />
                    <h4>Hauptstädte</h4>
                </div>
                <div>
                    <img src={SIGHTSEEING_SVG} />
                    <h4>Sehenswürdigkeiten</h4>
                </div>
        </Slider>
        </SliderWrapper>
    );
};
