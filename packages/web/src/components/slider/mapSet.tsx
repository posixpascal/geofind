import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import {strings} from "../../i18n";

import WORLD_SVG from "../../assets/mapsets/earth.svg";
import EUROPE_SVG from "../../assets/mapsets/europe.svg";
import AFRICA_SVG from "../../assets/mapsets/africa.svg";
import ISLANDS_SVG from "../../assets/mapsets/islands.svg";

import SVG_ARROW_RIGHT from "../../assets/icons/chevron-right.svg";
import SVG_ARROW_LEFT from "../../assets/icons/chevron-left.svg";
import SVG_ARROW_RIGHT_DARK from "../../assets/icons/chevron-right-dark.svg";
import SVG_ARROW_LEFT_DARK from "../../assets/icons/chevron-left-dark.svg";

export const SLIDER_SETTINGS = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
};

export const SliderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: calc(45% - 40px);
    margin: 20px;
    height: 180px;
    justify-content: space-between;
    h3, h4 {
      font-family: 'Luckiest Guy';
      text-align: center;
      font-size: 24px;
      color: #000;
        @media (prefers-color-scheme: dark){
          color: #fff;
        }
    }
    h4 {
    font-size: 18px;
    color: #aaa;
    height: 28px;
    line-height: 28px;
    }
    text-align: center;
    img {
       height: 100px;
       display: block;
       margin: 0 auto;
       object-fit: contain;
    }
    .slick-slide > div > div {
      height: 128px;
    }
    .slick-slide > div > div:focus {
      outline: none;
    }
    
    .slick-next, .slick-prev {
      color: #fff;
      width: 48px;
      height: 48px;
      :hover, :focus, :active {
        background: transparent !important;
      }
      :before {
        color: #fff;
        display: flex;
        width: 48px;
        height: 48px;
        background-size: 48px;
      }
    }
    
    .slick-prev:before {
      content: "";
      background-image: url(${SVG_ARROW_LEFT});
    }
    
    .slick-next:before {
      content: "";
      background-image: url(${SVG_ARROW_RIGHT});
    }
    
    @media (prefers-color-scheme: dark){
      .slick-prev:before {
          background-image: url(${SVG_ARROW_LEFT_DARK});
      }
        
      .slick-next:before {
          background-image: url(${SVG_ARROW_RIGHT_DARK});
      }
    }
`;


export const MapSetSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <SliderWrapper>
            <h3>Kartenset</h3>
            <Slider {...SLIDER_SETTINGS}>
                <div>
                    <img src={WORLD_SVG}/>
                    <h4>The world</h4>
                </div>
                <div>
                    <img src={EUROPE_SVG}/>
                    <h4>Europe</h4>
                </div>
                <div>
                    <img src={AFRICA_SVG}/>
                    <h4>Africa</h4>
                </div>
                <div>
                    <div>
                        <img src={ISLANDS_SVG}/>
                        <h4>Islands ☠️</h4>
                    </div>
                </div>
            </Slider>
        </SliderWrapper>
    );
};
