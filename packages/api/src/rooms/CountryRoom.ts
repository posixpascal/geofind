import { Client, Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { CountryRoomState } from "./schema/CountryRoomState";
import { OnJoinCommand } from "./commands/OnJoinCommand";
import { OnPrepareRoundCommand } from "./commands/OnPrepareRoundCommand";
import { OnStartRoundCommand } from "./commands/OnStartRoundCommand";
import { OnVoteCommand } from "./commands/OnVoteCommand";
import { OnEndRoundCommand } from "./commands/OnEndRoundCommand";
import { OnScoreboardCommand } from "./commands/OnScoreboardCommand";
import { OnLeaveCommand } from "./commands/OnLeaveCommand";
import { GAME_END_STATE, LOBBY_PHASE } from "../constants/game";
import { OnRoomStartCommand } from "./commands/OnRoomStartCommand";
import { OnRoomSettingsCommand } from "./commands/OnRoomSettingsCommand";
import { OnLobbyCommand } from "./commands/OnLobbyCommand";
import { OnRoomRestartCommand } from "./commands/OnRoomRestartCommand";
import { OnUserUpdateCommand } from "./commands/OnUserUpdateCommand";
import { ConnectOptions } from "../constants/clients";
import { OnUpdateMetadataCommand } from "./commands/OnUpdateMetadataCommand";
import {
  ROOM_LOBBY,
  ROOM_RESTART,
  ROOM_SETTINGS,
  ROOM_START,
  ROOM_VOTE,
  USER_UPDATE,
} from "../constants/messages";

export class CountryRoom extends Room<CountryRoomState> {
  dispatcher = new Dispatcher(this);
  autoDispose = false;

  async onCreate(options: any) {
    this.clock.start();

    this.setState(new CountryRoomState());
    this.registerMessageHandlers();

    this.state.room = options.room;
    this.state.map = options.map;
    this.state.hasBorders = options.hasBorders;
    this.state.maxPoints = parseInt(options.maxPoints, 10);
    this.state.roundTime = parseInt(options.roundTime, 10);
    this.state.hasIslands = options.hasIslands;
    this.state.isPublic = options.isPublic;
    this.state.hasStrictMatches = options.hasStrictMatches;
    this.state.phase = LOBBY_PHASE;

    this.dispatcher.dispatch(new OnUpdateMetadataCommand());
    await this.setPrivate(!this.state.isPublic);
  }

  onJoin(client: Client, options: ConnectOptions) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
      client,
      options,
    });
  }

  async onLeave(client: Client, consented: boolean) {
    this.dispatcher.dispatch(new OnLeaveCommand(), { client, consented });
  }

  onDispose() {}

  async prepareRound() {
    this.dispatcher.dispatch(new OnPrepareRoundCommand());
  }

  async startRound() {
    this.dispatcher.dispatch(new OnStartRoundCommand());
  }

  async endRound() {
    this.dispatcher.dispatch(new OnEndRoundCommand());
  }

  async scoreboard() {
    this.dispatcher.dispatch(new OnScoreboardCommand());
  }

  async gameEnd() {
    this.state.state = GAME_END_STATE;
  }

  registerMessageHandlers() {
    this.onMessage(USER_UPDATE, (client, message) => {
      this.dispatcher.dispatch(new OnUserUpdateCommand(), { client, message });
    });

    this.onMessage(ROOM_RESTART, (client, message) => {
      this.dispatcher.dispatch(new OnRoomRestartCommand(), {
        client,
      });
    });

    this.onMessage(ROOM_LOBBY, (client, message) => {
      this.dispatcher.dispatch(new OnLobbyCommand(), {
        client,
      });
    });

    this.onMessage(ROOM_SETTINGS, (client, message) => {
      this.dispatcher.dispatch(new OnRoomSettingsCommand(), {
        client,
        settings: message,
      });
    });

    this.onMessage(ROOM_VOTE, (client, message) => {
      this.dispatcher.dispatch(new OnVoteCommand(), {
        client,
        latlng: message.position,
      });
    });

    this.onMessage(ROOM_START, (client, message) => {
      this.dispatcher.dispatch(new OnRoomStartCommand(), { client });
    });
  }
}
