// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import styled from "styled-components";
import {Button} from "../buttons";

export const UserListingWrapper = styled.div`
  width: 100%;
  margin: 50px 0;
`;

export const UserListingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  margin: 0 20px 40px;
`;

export const UserActions = styled.div`
  svg {
    width: 42px;
    height: 42px;
    margin: 0 10px;
  }
`;

export const UserName = styled.div`
  margin: 0 8px;
  font-size: 32px;
  img {
     ${(props) => `
        border: 4px solid ${props.borderColor}
     `}
     border-radius: 50%;
     background: #fff;
     object-fit: cover;
     width: 64px;
     height: 64px;
  }
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Luckiest Guy';
  span {
    position: relative;
    top: 3px;
    padding-left: 20px;
  }
  
`;
export const UserColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #aaa;
`;
export const ReadyButton = styled(Button)`
  position: relative;
  float: right;
  overflow:hidden;
  border:none;
  ${(props) => props.isReady ? `
    background:  rgba(97,202,97,.9);
      border-left: 10px solid rgb(70,140,70) !important;
    span { color: #fff !important; }
  ` : ""}

  ${(props) => props.inactive ? `pointer-events:none` : ""}
  span {
  color: #212121;
  font-size:20px;
  }


  :hover {
    background: rgba(97,202,97,.9) !important;
    border-left: 10px solid rgb(70,140,70) !important;
    span {
    color: #fff !important;
    }
  }
  :focus {
    background: #f1f1f1;
    span { color: #212121 !important; }
    ${(props) => props.isReady ? `

    background:  #60a760;
    span { color: #fff !important; }
  ` : ""}
  }
  ${(props) => !props.inactive && `
    :after {
        content: '';
        position: absolute;
        z-index: 40;
        width: 1px;
        top: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        background: rgba(97,202,97,.7);
        box-shadow: 0 0 25px 5px rgba(97,202,97,.7);
        -webkit-animation: readyAnim 5s infinite;
        -moz-animation: readyAnim 5s infinite;
        -o-animation: readyAnim 5s infinite;
        animation: readyAnim 5s infinite;
        position: absolute;
        z-index: 50;
        top: 0;
        bottom: 0;
        left: 0;
        width: 0;
        background-image: -moz-linear-gradient(left,#60a760 0,#61ca61 100%);
        background-image: -webkit-gradient(linear,left top,right top,color-stop(0,#60a760),color-stop(100%,#61ca61));
        background-image: -webkit-linear-gradient(left,#60a760 0,#61ca61 100%);
        background-image: -o-linear-gradient(left,#60a760 0,#61ca61 100%);
        background: -ms-linear-gradient(left,#60a760 0,#61ca61 100%);
        background: linear-gradient(to right,#60a760 0,#61ca61 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$from', endColorstr='$to', GradientType=1);
        -webkit-transition: all .2s ease;
        -o-transition: all .2s ease;
        transition: all .2s ease;
        -webkit-backface-visibility: hidden;
    }

    :focus {
        background: rgb(96, 167, 96) !important;
        border-color: rgb(96, 140, 96) !important;
        span {
            color: #fff !important;
        }
    }
    `}
`;

export const UserIcon = styled.span`
  padding-right: 5px;
  svg {
  width: 32px;
  height: 32px;
  }
`;

export const ColorPickerWrapper = styled.div`position:relative;`;
