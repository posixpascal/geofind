import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import {strings} from "../../i18n";
import {Button} from "../uiWidgets/Button";
import {Send} from "react-feather";
import * as actions from '../../actions/lobby';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import useForm from "react-hook-form/dist/useForm";
import {webSocketConnection} from "../../helper/webSockets";
import {LOBBY_MESSAGE} from "../../actions/types";

const ChatLog = styled.div`
  background: #000;
  color: #fff;
  padding: 15px;
  height: 400px;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 380px;
  font-size: 14px;
`;

const NewChatMessage = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    margin:0;
    border-radius: 0;
    
  }
  
  svg {
    position: absolute;
    right: 10px;
    path, line, polygon {
      stroke: #9b4dca;
    }
  }
`;

const ChatMessage = styled.div`
  margin-bottom: 5px;
  ${props => props.bold && `font-weight: 700`}
`;

const ChatMessageDate = styled.span`
   color: rgb(117, 133, 140);
   padding-right: 8px;
`;
const ChatMessageText = styled.span`
  
`;
const ChatMessageUser = styled.span`
  padding-right: 8px;
`;

export const ChatWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatWindow = (props) => {
    const [chatMessages, setChatMessages] = useState([{
        date: +new Date(),
        user: {
            color: "#9b4dca",
            name: "Ländergame"
        },
        bold: true,
        message: strings.chatWelcome
    }]);

    useEffect(() => {
        const messageHandler = (message) => {
            setChatMessages([...chatMessages, message]);
        };

        webSocketConnection.on("userChatMessage", messageHandler);
        return () => {
            webSocketConnection.off("userChatMessage", messageHandler);
        }
    };


    const chatInput = useRef();
    const chatMessageKeyDown = (event) => {
        if (event.keyCode === 13){
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (!chatInput.current.value){ return; }

        webSocketConnection.emit("userChatMessage", { text: chatInput.current.value });
        chatInput.current.value = "";

    };

    const formatDate = (input) => {
        return moment(input).format("HH:MM");
    };

    console.log(props.chatMessages);


    return (
        <ChatWindowWrapper>
            <ChatLog>
                {chatMessages.map(chatMessage => {
                    return <ChatMessage bold={!!chatMessage.bold} key={chatMessage.id}>
                        <ChatMessageDate>{formatDate(chatMessage.date)}</ChatMessageDate>
                        <ChatMessageUser
                            style={{color: chatMessage.user.color}}>{chatMessage.user.name}</ChatMessageUser>
                        <ChatMessageText>{chatMessage.message}</ChatMessageText>
                    </ChatMessage>
                })}
            </ChatLog>
            <NewChatMessage>
                <input ref={chatInput} type="text" onKeyDown={(event) => chatMessageKeyDown(event)} placeholder={strings.newMessagePlaceholder}/>
                <Send onClick={sendMessage}/>
            </NewChatMessage>
        </ChatWindowWrapper>
    )
};


function mapStateToProps(state) {
    return {chatMessages: state.lobby.chatMessages}
}

export default withRouter(connect(mapStateToProps, actions)(ChatWindow));
