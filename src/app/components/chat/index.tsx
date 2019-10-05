import React, {useRef, useState, useEffect} from "react";
import moment from "moment";
import {strings} from "../../i18n";
import {Send} from "react-feather";
import * as actions from '../../actions/rooms';
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
import {hashCode} from "../../helper/hash";

export default ({players = {}, messages = []}) => {
    const chatInput = useRef();

    if (messages === null) {
        return <span>Loading...</span>;
    }

    const chatMessageKeyDown = (event) => {
        if (event.keyCode === 13) {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (!chatInput.current.value) {
            return;
        }

        (window as any).currentRoom.send({type: "chat:message:new", payload: chatInput.current.value})
        chatInput.current.value = "";

    };

    const formatDate = (input) => {
        return moment(input).format("HH:MM");
    };

    return (
        <ChatWindowWrapper>
            <ChatLog>
                {messages.map(chatMessage => {
                    return <ChatMessage bold={!!chatMessage.bold} key={chatMessage.id}>
                        <ChatMessageDate>{formatDate(chatMessage.date)}</ChatMessageDate>
                        {// fetch uptodate user to reflect name changes
                            players[chatMessage.player.id] &&
                            <>
                                <ChatMessageUser style={{color: players[chatMessage.player.id].color}}>
                                    {players[chatMessage.player.id].displayName}
                                </ChatMessageUser>
                                <ChatMessageText>{chatMessage.message}</ChatMessageText>
                            </>}
                        {//user left meanwhile so we render the cached properties
                            !players[chatMessage.player.id] &&
                            <>
                                <ChatMessageUser style={{color: chatMessage.player.color}}>
                                    {chatMessage.player.displayName}
                                </ChatMessageUser>
                                <ChatMessageText>{chatMessage.message}</ChatMessageText>
                            </>
                        }
                    </ChatMessage>
                })}
            </ChatLog>
            <NewChatMessage>
                <input ref={chatInput} type="text" onKeyDown={(event) => chatMessageKeyDown(event)}
                       placeholder={strings.newMessagePlaceholder}/>
                <Send onClick={sendMessage}/>
            </NewChatMessage>
        </ChatWindowWrapper>
    )
};
