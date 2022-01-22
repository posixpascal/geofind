import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { Client } from 'colyseus'
import { RoomSettings } from '../constants/room'
import { OnUpdateMetadataCommand } from './OnUpdateMetadataCommand'
import { SpeedrunRoomState } from '../rooms/schema/SpeedrunRoomState'
import { LOBBY_PHASE, ROUND_PREPARE_STATE } from '../constants/game'
import { CountryRoomState } from '../rooms/schema/CountryRoomState'

export class OnRoomSettingsCommand extends Command<
  CountryRoom,
  {
    client: Client
    settings: Partial<RoomSettings>
  }
> {
  async execute({
    settings,
    client,
  }: {
    settings: RoomSettings
    client: Client
  }) {
    if (client.sessionId !== this.state.creatorId) {
      return
    }

    if ('hasStrictMatches' in settings) {
      this.state.hasStrictMatches = settings.hasStrictMatches
    }

    if ('maxPoints' in settings && settings.maxPoints) {
      this.state.maxPoints = parseInt(settings.maxPoints, 10)
    }

    if ('hasIslands' in settings) {
      this.state.hasIslands = settings.hasIslands
    }

    if ('hasBorders' in settings && settings.hasBorders) {
      this.state.hasBorders = settings.hasBorders
    }

    if ('roundTime' in settings && settings.roundTime) {
      this.state.roundTime = parseInt(settings.roundTime, 10)
    }

    if ('isPublic' in settings) {
      this.state.isPublic = settings.isPublic
      await this.room.setPrivate(!this.state.isPublic)
    }

    if ('room' in settings) {
      this.state.room = settings.room
    }

    if ('map' in settings) {
      this.state.map = settings.map
    }

    this.room.dispatcher.dispatch(new OnUpdateMetadataCommand())
  }
}
