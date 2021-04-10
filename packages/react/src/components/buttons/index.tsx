import React from "react";
import styled, {keyframes, css} from "styled-components";

const shining = keyframes`
  0% {
    opacity: 0;
    left: 0;
  }
  5% {
    opacity: 100;
  }
  15% {
    opacity: 0;
    left: 120%;
  }
  100% {
    opacity: 0;
    left: 120%;
  }
`;

const dancing = keyframes`
  0% {
     transform: scale(1.05) rotate(2deg);
  }
  
  33% {
    transform: scale(1.10) rotate(-2deg);
  }
  
  66% {
    transform: scale(1.025) rotate(0deg);
  }
  
  100% {
     transform: scale(1.05) rotate(2deg);
  }
`;


export const FancyButton = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 20px 20px 8px;
    border-radius: 6px;
    border: none;
    font-family: 'Luckiest Guy', cursive;
    font-size: 48px;
    color: #fff;
    font-weight: 300;
    background:#ffb319;
    overflow: hidden;
    max-width: 450px;
    margin: 30px auto;
    position: relative;
    text-shadow: 0 2px 3px rgba(0,0,0,.4), 0 0 50px rgba(216,216,216,.3);
    
    
    ${props => props.variant === "orange" && `
        background: linear-gradient(to top, #ff7a00 0%, #ff8e00  100%);
        border-top: 4px solid rgba(255,255,255,.3);
        :hover { box-shadow: 0 0 8px #ffb319, inset 0 -3px 3px #ff7a00; }
    `}
    
    ${props => props.variant === "blue" && `
        background: linear-gradient(to top, #0F6BD7 0%, #2D9FD7  100%);
        border-top: 4px solid rgba(255,255,255,.4);
        :hover {box-shadow: 0 0 8px #2D9FD7, inset 0 -3px 3px #0F6BD7; }
    `}
    
    ${props => props.variant === "green" && `
        background: linear-gradient(to top, #4AB63B 0%, #6BCF3F  100%);
        border-top: 4px solid rgba(255,255,255,.4);
        :hover { box-shadow: 0 0 8px #6BCF3F, inset 0 -3px 3px #4AB63B; }
    `}
    
     ${props => props.variant === "green" && `
        background: linear-gradient(to top, #4AB63B 0%, #6BCF3F  100%);
        border-top: 4px solid rgba(255,255,255,.4);
        :hover { box-shadow: 0 0 8px #6BCF3F, inset 0 -3px 3px #4AB63B; }
    `}
     
     ${props => props.variant === "yellow" && `
        background: linear-gradient(to top, #ffb319 0%, #ffe000  100%);

        border-top: 4px solid rgba(255,255,255,.4);
        :hover { box-shadow: 0 0 8px #ffe000, inset 0 -3px 3px #ffb319; }
    `}
     
      ${props => props.variant === "purple" && `
        background: linear-gradient(to top, #4540b6 0%, #624bcf  100%);
        border-top: 4px solid rgba(255,255,255,.4);
        :hover { box-shadow: 0 0 8px #624bcf, inset 0 -3px 3px #4540b6; }
    `}
    

     ${props => props.variant === "red" && `
         background: linear-gradient(to top, #9e2a1d 0%, #ea422e  100%);
        border-top: 4px solid rgba(255,122,122,.4);
        :hover { box-shadow: 0 0 8px #ea422e, inset 0 -3px 3px #9e2a1d; }
    `}
    
     ${props => props.variant === "disabled" && `
         background: linear-gradient(to top, #ccc 0%, #e1e1e1 100%);
         border-top: 4px solid rgba(122,122,122,.4);
         pointer-events: none;
    `}
       
     ${props => props.variant === "gray" && `
         background: linear-gradient(to top, #ccc 0%, #e1e1e1 100%);
         border-top: 4px solid rgba(122,122,122,.4);
    `}
     
     ${props => props.loading && css`
        animation: ${dancing} ease-in-out 1.6s infinite;
     `}
    
    transition: all ease-in-out 0.3s;
    
    ${props => !props.loading && `:hover {
      transform: scale(1.05) rotate(1deg);
      cursor: pointer;
    }`}
    
    ${props => !props.loading && ':hover'}:after {
        content: '';
        position: absolute;
        z-index: 40;
        width: 1px;
        top: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        background: rgba(255,255,255,.1);
        box-shadow: 0 0 25px 5px rgba(255,255,255,.6);
        animation: ${shining} 3s infinite;
        position: absolute;
        z-index: 50;
        transition: all .2s ease;
        -webkit-backface-visibility: hidden;
    }
    
    ${props => props.small && `
        font-size: 24px;
        padding-top: 14px;
        margin: 10px auto;
    `}
    
    &:active {
      border-top: 2px solid rgba(122,122,122,.4);
      border-bottom: 2px solid rgba(122,122,122,.4); 
    }
  
`;

export const SmallButton = ({onClick, title, variant, loading = false}) => {
    return <FancyButton onClick={onClick} variant={variant} small={true} loading={loading}>{title}</FancyButton>;
};

export const TextButton = ({ title, onClick, variant }) => {
    return <FancyButton onClick={onClick} variant={variant} small={true} outline={true}>{title}</FancyButton>;
};

export const MultiPlayerButton = ({title}) => {
    return <FancyButton variant={"blue"}>{title}</FancyButton>;
};

export const CreateRoomButton = ({onClick, title}) => {
    return <FancyButton onClick={onClick} variant={"green"}>{title}</FancyButton>;
};

export const FriendsListButton = ({title}) => {
    return <FancyButton variant={"purple"}>{title}</FancyButton>;
};

export const ProfileButton = ({title}) => {
    return <FancyButton variant={"yellow"}>{title}</FancyButton>;
};

export const Button = ({
                           onClick = () => {
                           }, title, variant = "red", loading = false
                       }) => {
    return <FancyButton onClick={onClick} loading={loading} variant={variant}>{title}</FancyButton>;
};
