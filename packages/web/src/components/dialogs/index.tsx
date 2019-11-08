import React, {useState} from "react";
import styled, {keyframes, css} from "styled-components";
import {FancyButton} from "../buttons";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";

const spring = keyframes`
  from {
    transform: skew(1.1) scale(0.3);
    height: 0;
  }
  to {
    transform: skew(1.0) scale(1);
    height: 400px;
  }
`;

const shadowAnimation = keyframes`
  from {
    box-shadow: 0 0 5px 3px rgba(0,0,0,.1);
    opacity: 0;
  }
  
  to {
    box-shadow: 0 8px 15px 5px rgba(0,0,0,.1);
    opacity: 1;
  }
`;

const FancyDialogWrapper = styled.div`
   position: relative;
   
   ${FancyButton}{
      transition: all ease-in-out 0.3s;
       z-index: 2;
   }
   
   
   ${props => props.visible && css`
        ${FancyButton} {
            transform: rotate(0deg)  scale(1.15) translate3d(0,0,2px);
            transition: transform ease-in-out 0.3s;
            box-shadow: 0 8px 8px rgba(0,0,0,.2);
        }
        
        ${FancyDialogContentWrapper} {
            overflow: hidden;
            transition: box-shadow ease-in-out 0.2s, height ease-in-out 0.4s;
            animation: ${shadowAnimation} 0.2s ease-in-out, ${spring} 0.6s cubic-bezier(.52,1.22,.8,1.1);
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            border-radius: 4px;
        }
      `}
   
`;
const FancyDialogContentWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
 
  // ptop: -30px;
  top: 50px;
  left: 0px;
  right: 0px;
  height: 0px;
  overflow: hidden;
  transition: box-shadow ease-in-out 0.3s;
  background: #fff;
  > div {
    padding: 50px 20px 30px;
    width: 100%;
  }
  
  @media (prefers-color-scheme: dark){
    background: #4d4d4d;
    color: #fff;
  }
  
  ${HorizontalAlignment} {
    margin-bottom: 20px;
  }
  
  
  z-index: 1;
  transform: translate3d(0,0,2px);
  margin: 0 20px;
`;

export const FancyDialog = ({visible, children}) => {
    return <FancyDialogWrapper visible={visible}>
        {children}
    </FancyDialogWrapper>;
};

export const FancyDialogTrigger = ({children}) => {
    return <div>
        {children}
    </div>;
};

export const FancyDialogContent = ({children}) => {
    return <FancyDialogContentWrapper>
        <div>{children}</div>
    </FancyDialogContentWrapper>
};
