import React, {useRef, useState, useEffect} from "react";
import moment from "moment";
import {strings} from "../../i18n";
import {Send} from "react-feather";
import * as actions from '../../actions/rooms';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

const randomInsecurityInsult = () => {
    const insecurities = [
        "I’m wrestling with some insecurity issues in my life but thank you all for playing with me.",
        "Well played. I salute you all.",
        "For glory and honor! Huzzah comrades!",
        "It’s past my bedtime. Please don’t tell my mommy.",
        "Gee whiz! That was fun. Good playing!",
        "I feel very, very small... please hold me..."];

    return insecurities[Math.floor(Math.random() * insecurities.length)];
};

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

export default ({inGame = false, players = {}, messages = []}) => {
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
        // filter value
        let chatMessage = chatInput.current.value;
        switch (chatMessage.toLowerCase()){
            case "gg ez":
            case "rekt":
            case "pwnd":
            case "owned":
                chatMessage = randomInsecurityInsult();
                break;
        }
        if ((window as any).currentGame) {
            (window as any).currentGame.send({type: "chat:message:new", payload: chatMessage})
        } else {
            (window as any).currentRoom.send({type: "chat:message:new", payload: chatMessage})
        }
        chatInput.current.value = "";
    };

    useEffect(() => {
       const chatView = document.getElementById("chatView");
       if (chatView){
           chatView.scrollTop = chatView.scrollHeight;
       }
    });

    const formatDate = (input) => {
        return moment(input).format("HH:MM");
    };

    return (
        <ChatWindowWrapper>
            <ChatLog id="chatView">
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
