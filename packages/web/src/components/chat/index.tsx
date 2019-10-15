import moment from "moment";
import React, {useEffect, useRef} from "react";

import {Send} from "react-feather";
import {strings} from "../../i18n";
import {
    ChatLog,
    ChatMessage,
    ChatMessageDate, ChatMessageText, ChatMessageUser,
    ChatWindowWrapper, NewChatMessage,
} from "./widgets";

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

export default ({inGame = false, players = {}, messages = []}) => {
    const chatInput: any = useRef();

    if (messages === null) {
        return <span>Loading...</span>;
    }

    const chatMessageKeyDown = (event) => {
        if (event.keyCode === 13) {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (!chatInput.current || !chatInput.current.value) {
            return;
        }
        // filter value
        let chatMessage = chatInput.current.value;
        switch (chatMessage.toLowerCase()) {
            case "gg ez":
            case "rekt":
            case "pwnd":
            case "owned":
                chatMessage = randomInsecurityInsult();
                break;
        }
        if (window.currentGame) {
            window.currentGame.send({type: "chat:message:new", payload: chatMessage});
        } else {
            window.currentRoom.send({type: "chat:message:new", payload: chatMessage});
        }
        chatInput.current.value = "";
    };

    useEffect(() => {
        const chatView = document.getElementById("chatView");
        if (chatView) {
            chatView.scrollTop = chatView.scrollHeight;
        }
    });

    const formatDate = (input) => {
        return moment(input).format("HH:MM");
    };

    const ChatLine = ({message, player}) => {
        return (
            <>
                <ChatMessageUser style={{color: player.color}}>
                    {player.displayName}
                </ChatMessageUser>
                <ChatMessageText>{message}</ChatMessageText>
            </>
        );
    };

    const chatMessages = messages.map((chatMessage) => {
        const player = players[chatMessage.player.id] || chatMessage.player;

        return (
            <ChatMessage bold={!!chatMessage.bold} key={chatMessage.id}>
                <ChatMessageDate>{formatDate(chatMessage.date)}</ChatMessageDate>
                <ChatLine player={player} message={chatMessage.message}/>
            </ChatMessage>
        );
    });

    return (
        <ChatWindowWrapper>
            <ChatLog id="chatView">
                {chatMessages}
            </ChatLog>
            <NewChatMessage>
                <input
                    ref={chatInput}
                    type="text"
                    onKeyDown={chatMessageKeyDown}
                    placeholder={strings.newMessagePlaceholder}
                />
                <Send onClick={sendMessage}/>
            </NewChatMessage>
        </ChatWindowWrapper>
    );
};
