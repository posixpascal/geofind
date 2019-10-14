import {Client, Presence, Room} from "colyseus";
import {Lobby} from "../schema/Lobby";
import {ChatMessageTypes} from "../schema/ChatMessage";
import {User, verifyToken} from "@colyseus/social";
import {Player} from "../schema/Player";
import {ChatHandler} from "../handlers/chatHandler";
import {UserHandler} from "../handlers/userHandler";
import {GameHandler} from "../handlers/gameHandler";
import {Handler, IMessage} from "../handlers";
import {RoomHandler} from "../handlers/roomHandler";

interface ILobbyRoomHandlers {
    chat?: ChatHandler,
    user?: UserHandler,
    game?: GameHandler,
    room?: RoomHandler,

    [index: string]: Handler;
}

export class LobbyRoom extends Room<Lobby> {
    public handlers: ILobbyRoomHandlers = {};
    public maxClients = 32;

    constructor(presence?: Presence) {
        super(presence);

        this.handlers = {
            "chat": new ChatHandler(this),
            "user": new UserHandler(this),
            "game": new GameHandler(this),
            "room": new RoomHandler(this),
        };
    }

    onMessage(client: any, data: IMessage): void {
        Handler.handleMessage(this, client, data);
    }

    public onCreate(options: any) {
        this.setState(new Lobby());
    }

    async onAuth(client, options) {
        const token = verifyToken(options.token);
        try {
            const user = await User.findById(token._id);
            if (user) {
                return user;
            }
        } catch (err) {
            return false;
        }
        return false;
    }

    onJoin(client: Client, options, user) {
        if (!this.state.leader) {
            this.state.leader = client.auth._id.toString();
        }

        const player = new Player();
        player.id = client.auth._id.toString();
        player.player_id = client.sessionId;
        player.displayName = client.auth.displayName;
        player.color = client.auth.metadata.pin_color;
        player.avatarUrl = client.auth.avatarUrl;
        player.isReady = false;

        this.state.players[client.sessionId] = player;

        this.handlers.chat.addMessage(client, {
            type: ChatMessageTypes.STATUS_MESSAGE,
            createdAt: +new Date(),
            message: `${client.auth.displayName} joined the lobby`,
            player: false
        });
    }


    onLeave(client: Client, options : any) {
        if (this.state.leader === this.state.players[client.sessionId].id) {
            // leader left the lobby. lets nominate the next player
            for (let playerID in this.state.players) {
                if (playerID !== client.sessionId) {
                    this.state.leader = this.state.players[playerID].id;
                    break;
                }
            }
        }

        delete this.state.players[client.sessionId];

        this.handlers.chat.addMessage(client, {
            type: ChatMessageTypes.STATUS_MESSAGE,
            createdAt: +new Date(),
            message: `${client.auth.displayName} left the lobby`,
            player: false
        });
    }
}
