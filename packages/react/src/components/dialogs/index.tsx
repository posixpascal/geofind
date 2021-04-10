import React, {useState} from "react";
import styled, {keyframes, css} from "styled-components";
import {FancyButton} from "../buttons";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {ChangeNameDialog} from "./changeNameDialog";

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

export const FancyDialogHeaderWrapper = styled.div`
  border-bottom: 2px solid #999;
  margin: -20px -20px 20px;
  padding: 24px 24px 14px;
  font-family: "Luckiest Guy";
  display: flex;
  justify-content: space-between;
  font-size: 36px;
  ${props => props.variant === "yellow" && `
    background: linear-gradient(to top, #ffb319 0%, #ffe000  100%);
    border-bottom: 2px solid #ffb319 ;
    border-top: 4px solid rgba(255,255,255,.4);
    :hover { box-shadow: 0 0 8px #ffe000, inset 0 -3px 3px #ffb319; }
    text-shadow: 1px 1px 0 rgba(0,0,0,.3);
    box-shadow: 0 3px 15px rgba(0,0,0,.2);
  `}
  
  .close {
    cursor: pointer;
  }
`;

const FancyDialogWrapper = styled.div`
   position: relative;
  
   ${FancyButton}{
      transition: all ease-in-out 0.3s;
       z-index: 2;
   }
   
   ${props => props.inline && css`
     ${FancyDialogContentWrapper} {
        transform: scale(0.0);
     }
    `}
   
     ${props => css`
         ${FancyDialogContentWrapper} {
            transition: transform cubic-bezier(.52,1.22,.8,1.1) 0.3s, box-shadow ease-in-out 0.2s, height ease-in-out 0.3s;
         }
     `}
   ${props => props.visible && css`
        ${FancyButton} {
            transform: rotate(0deg)  scale(1.15) translate3d(0,0,2px);
            transition: transform ease-in-out 0.3s;
            box-shadow: 0 8px 8px rgba(0,0,0,.2);
        }
        
        ${FancyDialogContentWrapper} {
            overflow: hidden;
            transition: transform cubic-bezier(.52,1.22,.8,1.1) 0.3s, box-shadow ease-in-out 0.2s, height ease-in-out 0.3s;
            ${props => props.inline && css`
              transform: scale(1.0);
              max-width: 500px;
              margin: 0 auto;
              
              > div {
                padding: 20px;
              }
            `}
            animation: ${shadowAnimation} 0.2s ease-in-out, ${spring} 0.6s cubic-bezier(.52,1.22,.8,1.1);
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            border-radius: 4px;
        }
      `}
   
   ${FancyDialogHeaderWrapper} {
    box-shadow: none;
    :hover {
      box-shadow: none;
    }
   }
   
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

export const FancyDialog = ({inline = false, visible, children}) => {
    return <FancyDialogWrapper inline={inline} visible={visible}>
        {children}
    </FancyDialogWrapper>;
};

export const FancyDialogTrigger = ({children}) => {
    return <div>
        {children}
    </div>;
};


export const FancyDialogHeader = ({
                                      variant, children, onClose = () => {
    }
                                  }) => {
    return <FancyDialogHeaderWrapper variant={variant}>
        {children}
        <div className={"close"} onClick={onClose}>X</div>
    </FancyDialogHeaderWrapper>
}

export const FancyDialogFooter = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  
  ${FancyButton} {
    margin: 0 !important;
    max-width: 100%;
  }
`;

export const FancyDialogContent = ({children}) => {
    return <FancyDialogContentWrapper>
        <div>{children}</div>
    </FancyDialogContentWrapper>
};

export default {
    FancyDialog,
    FancyDialogTrigger,
    FancyDialogContent,
    FancyDialogHeader,
    ChangeNameDialog
}
