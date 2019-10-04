import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import {strings} from "../../i18n";
import {Send} from "react-feather";
import * as actions from '../../actions/lobby';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {webSocketConnection} from "../../helper/webSockets";

import {
    ChatLog,
    ChatMessage,
    ChatMessageDate,
    ChatMessageText,
    ChatMessageUser,
    ChatWindowWrapper,
    NewChatMessage
} from "./widgets";

const ChatWindow = (props) => {
    const [chatMessages, setChatMessages] = useState([{
        id: Math.random(),
        date: +new Date(),
        user: {
            color: "#9b4dca",
            name: "geofind.io"
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
    });


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
