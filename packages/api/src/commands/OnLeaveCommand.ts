import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { Client } from 'colyseus'
import { ALLOW_RECONNECTION_FOR_SECONDS } from '../config'
import { LOBBY_PHASE } from '../constants/game'

export class OnLeaveCommand extends Command<
  CountryRoom,
  {
    client: Client
    consented: boolean
  }
> {
  async execute({ client, consented }) {
    if (this.state.state === LOBBY_PHASE) {
      this.state.players.delete(client.sessionId)
      return
    }

    this.state.players.get(client.sessionId).connected = false

    try {
      if (consented){
        throw new Error("consented");
      }

      await this.room.allowReconnection(client, ALLOW_RECONNECTION_FOR_SECONDS)
      console.log(client.sessionId, ' has returned');
      this.state.players.get(client.sessionId).connected = true
    } catch (e) {
      console.log(client.sessionId, ' has left');

      this.state.players.delete(client.sessionId)
      if (
          this.state.creatorId && client.sessionId
      ) {
        console.log("Was room owner, changing room owner to next user");
        this.state.players.forEach((p) => {
          if (this.state.creatorId == client.sessionId){
            this.state.creatorId = p.sessionId;
          }
        })
      }
    }
  }
}
