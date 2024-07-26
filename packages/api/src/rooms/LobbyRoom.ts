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
  ROOM_LOBBY,
  ROOM_RESTART,
  ROOM_SETTINGS,
  ROOM_START,
  ROOM_VOTE,
  USER_UPDATE,
} from '../constants/messages'
import { LobbyRoomState } from './schema/game_modes/LobbyRoomState'

export class LobbyRoom extends Room<LobbyRoomState> {
  dispatcher = new Dispatcher(this)
  autoDispose = false
  roundTimer = false
  async onCreate(options: any) {
    this.clock.start()
    this.roomId = "lobby";
    this.autoDispose = false;
    this.maxClients = 9999999999999;

    this.setState(
      new LobbyRoomState({
        
      })
    )

    this.setPatchRate(1000);
  }

  onJoin(client: Client, options: ConnectOptions) {
    this.state.players.set(client.sessionId, true);
  }

  onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);
  }

  onDispose() {}
}
