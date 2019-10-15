import {Client} from "colyseus";
import {ChatMessageTypes} from "../schema/ChatMessage";
import {md5} from "../util/md5";
import {handle, Handler} from "./index";

export class UserHandler extends Handler {
    @handle("user:color:set")
    public changeColor(client: Client, newColor: any) {
        client.auth.metadata.pin_color = newColor.hex;
        client.auth.updateOne(client.auth, {
            metadata: {
                ...client.auth.metadata,
                pin_color: newColor,
            },
        });
        this.room.state.players[client.sessionId].color = client.auth.metadata.pin_color;
    }

    @handle("user:displayName:set")
    public changeName(client: Client, newName: string) {
        const player = this.room.state.players[client.sessionId];

        client.auth.displayName = newName;
        client.auth.avatarUrl = `https://gravatar.com/avatar/${md5(newName)}?d=robohash`;
        client.auth.updateOne(client.auth, {
            displayName: newName,
        });

        this.room.handlers.chat.addMessage(client, {
            type: ChatMessageTypes.STATUS_MESSAGE,
            createdAt: +new Date(),
            message: `${player.displayName} changed his name to ${client.auth.displayName}`,
            player: false,
        });

        player.displayName = client.auth.displayName;
        player.avatarUrl = client.auth.avatarUrl;
    }

    @handle("user:readyState:toggle")
    public toggleReady(client: Client) {
        this.room.state.players[client.sessionId].isReady = !this.room.state.players[client.sessionId].isReady;
    }
}
