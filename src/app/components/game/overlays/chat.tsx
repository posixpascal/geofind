import React from "react";
import ChatWindow from "../../chat";
import {ChatOverlay} from "./widgets";

export const GameChatOverlay = ({players, messages}) => {
    if (window.innerWidth > 767){
        return <></>;
    }
    return <ChatOverlay>
        <ChatWindow inGame={true} players={players} messages={messages}/>
    </ChatOverlay>;
};
