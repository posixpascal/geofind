import { Client, Room } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { CountryRoomState } from './schema/game_modes/CountryRoomState'
import { OnJoinCommand } from '../commands/OnJoinCommand'
import { OnVoteCommand } from '../commands/OnVoteCommand'
import { OnLeaveCommand } from '../commands/OnLeaveCommand'
import { LOBBY_PHASE, ROUND_PREPARE_STATE } from '../constants/game'
import { OnRoomStartCommand } from '../commands/OnRoomStartCommand'
import { OnRoomSettingsCommand } from '../commands/OnRoomSettingsCommand'
import { OnLobbyCommand } from '../commands/OnLobbyCommand'
import { OnRoomRestartCommand } from '../commands/OnRoomRestartCommand'
import { OnUserUpdateCommand } from '../commands/OnUserUpdateCommand'
import { ConnectOptions } from '../constants/clients'
import { OnUpdateMetadataCommand } from '../commands/OnUpdateMetadataCommand'
import {
  ROOM_CONTINUE,
  ROOM_LOBBY,
  ROOM_RESTART,
  ROOM_SETTINGS,
  ROOM_START,
  ROOM_VOTE,
  USER_UPDATE,
} from '../constants/messages'
import { PartyRoomState } from './schema/game_modes/PartyRoomState'
import {OnContinueRoundCommand} from "../commands/OnContinueRoundCommand";

export class PartyRoom extends Room<PartyRoomState> {
  dispatcher = new Dispatcher(this)
  autoDispose = false
  roundTimer = false
  async onCreate(options: any) {
    this.clock.start();
    this.maxClients = 128;

    this.setState(
      new PartyRoomState({
        room: options.room,
        map: options.map,
        hasBorders: options.hasBorders,
        maxPoints: parseInt(options.maxPoints, 10) || 10,
        roundTime: parseInt(options.roundTime, 10) || 15,
        hasIslands: options.hasIslands,
        isPublic: options.isPublic,
        hasStrictMatches: options.hasStrictMatches,
        phase: LOBBY_PHASE,
        playersReady: 0,
        playersNeeded: 1,
        state: ROUND_PREPARE_STATE,
        roundSecondsElapsed: 0,
      })
    )

    this.clock.setInterval(() => {
        this.state.roundSecondsElapsed += 0.1
      }, 100)

    this.registerMessageHandlers()
    this.dispatcher.dispatch(new OnUpdateMetadataCommand())
    await this.setPrivate(!this.state.isPublic)
  }

  onJoin(client: Client, options: ConnectOptions) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
      client,
      options,
    })
  }

  async onLeave(client: Client, consented: boolean) {
    this.dispatcher.dispatch(new OnLeaveCommand(), { client, consented })
  }

  onDispose() {}

  registerMessageHandlers() {
    this.onMessage(USER_UPDATE, (client, message) => {
      this.dispatcher.dispatch(new OnUserUpdateCommand(), { client, message })
    })

    this.onMessage(ROOM_CONTINUE, (client, message) => {
      this.dispatcher.dispatch(new OnContinueRoundCommand(), {client, message});
    })

    this.onMessage(ROOM_RESTART, (client, message) => {
      this.dispatcher.dispatch(new OnRoomRestartCommand(), {
        client,
      })
    })

    this.onMessage(ROOM_LOBBY, (client, message) => {
      this.dispatcher.dispatch(new OnLobbyCommand(), {
        client,
      })
    })

    this.onMessage(ROOM_SETTINGS, (client, message) => {
      this.dispatcher.dispatch(new OnRoomSettingsCommand(), {
        client,
        settings: message,
      })
    })

    this.onMessage(ROOM_VOTE, (client, message) => {
      this.dispatcher.dispatch(new OnVoteCommand(), {
        client,
        latlng: message.position,
      })
    })

    this.onMessage(ROOM_START, (client, message) => {
      this.dispatcher.dispatch(new OnRoomStartCommand(), { client })
    })
  }
}
