import { Client, Room } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { ConnectOptions } from '../constants/clients'
import { LobbyRoomState } from './schema/game_modes/LobbyRoomState'
import { logger } from '../logger'

export class LobbyRoom extends Room<LobbyRoomState> {
  dispatcher = new Dispatcher(this)
  autoDispose = false
  async onCreate(options: any) {
    this.clock.start()
    this.roomId = "lobby";
    this.autoDispose = false;
    this.maxClients = Infinity;

    this.setState(
      new LobbyRoomState({
        
      })
    )

    this.setPatchRate(1000);
  }

  onJoin(client: Client, options: ConnectOptions) {
    logger.debug(`${client.sessionId} joined`, { room: "lobby"})
    this.state.players.set(client.sessionId, true);
  }

  onLeave(client: Client, consented: boolean) {
    logger.debug(`${client.sessionId} left`, { room: "lobby"})
    this.state.players.delete(client.sessionId);
  }

  onDispose() {}
}
