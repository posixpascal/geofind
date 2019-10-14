import {handle, Handler} from "./index";
import {Client} from "colyseus";
import {ChatMessage, ChatMessageTypes} from "../schema/ChatMessage";
import {uniqueID} from "../util/uniqueID";
import {Player} from "../schema/Player";

/**
 * A handler for chat messages
 */
export class ChatHandler extends Handler {
    /**
     * Handles new chat messages coming in from a user
     * @param client
     * @param message
     */
    @handle("chat:message:new")
    public newChatMessage(client : Client, message : any){
        this.room.handlers.chat.addMessage(client, {
            type: ChatMessageTypes.USER_MESSAGE,
            createdAt: +new Date(),
            message,
            player: {
                id: client.sessionId,
                color: client.auth.metadata.pin_color,
                displayName: client.auth.displayName
            }
        });
    }

    /**
     * Stores the message in the rooms state
     * @param client
     * @param message
     */
    public addMessage(client: Client, message : any) {
        const chatMessage = new ChatMessage();
        chatMessage.id = uniqueID("chat_message_");
        chatMessage.message = message.message;
        chatMessage.type = message.type;
        chatMessage.createdAt = +new Date();

        const player = new Player();
        if (message.player) {
            player.id = message.player.id;
            player.color = message.player.color;
            player.displayName = message.player.displayName;
        } else { // system message
            player.id = message.player.id;
            player.color = "#606c76";
            player.displayName = "whereabout.is";
        }

        chatMessage.player = player;
        this.room.state.messages.push(chatMessage);
    }
}
