import React from "react";
import styled from "styled-components";

export const Button = styled.button`
    border: none;
    border-radius: 0;
    display: block;
    position: relative;
    margin: 0 -10px 0 20px;
    padding: 0 25px 0 20px;
    border-left: 10px solid #9b4dca;
    background: #F3F3F3;
    color: #333;
    font-size: 24px;
    text-align: center;
    -webkit-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
    -webkit-transform: skew(-10deg,0);
    -moz-transform: skew(-10deg,0);
    -ms-transform: skew(-10deg,0);
    -o-transform: skew(-10deg,0);
    transform: skew(-10deg,0);
    -webkit-backface-visibility: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    span {
        display: block;
        position: relative;
        z-index: 100;
        text-transform: uppercase;
        font-size: 16px;
        color: #666;
        -webkit-transform: skew(10deg,0);
        -moz-transform: skew(10deg,0);
        -ms-transform: skew(10deg,0);
        -o-transform: skew(10deg,0);
        transform: skew(10deg,0);
        -webkit-transition: all .2s linear;
        -o-transition: all .2s linear;
        transition: all .2s linear;
        -webkit-backface-visibility: hidden;
    }
    
    :hover {
      background-color: #9b4dca;
      border-left: 10px solid #4e2867;
      color: #fff !important;
      span {
      color: #fff !important;
      }
    }
`;
