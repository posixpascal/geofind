import React from "react";
import styled from "styled-components";

export const ChatLog = styled.div`
  background: #000;
  color: #fff;
  padding: 15px;
  height: 400px;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 380px;
  font-size: 14px;

    @media (max-width: 767px){
    width: 100% !important;
    }
`;

export const NewChatMessage = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    margin:0;
    border-radius: 0;
    font-size: 16px !important;

  }

  svg {
    position: absolute;
    right: 10px;
    path, line, polygon {
      stroke: #9b4dca;
    }
  }
`;

export const ChatMessage = styled.div`
  margin-bottom: 5px;
  ${(props) => props.bold && `font-weight: 700`}
`;

export const ChatMessageDate = styled.span`
   color: rgb(117, 133, 140);
   padding-right: 8px;
`;
export const ChatMessageText = styled.span``;
export const ChatMessageUser = styled.span`
  padding-right: 8px;
`;

export const ChatWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
