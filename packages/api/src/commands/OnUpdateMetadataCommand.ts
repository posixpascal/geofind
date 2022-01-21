import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'

export class OnUpdateMetadataCommand extends Command<CountryRoom, {}> {
  async execute() {
    await this.room.setMetadata({
      room: this.state.room,
      map: this.state.map,
      hasBorders: this.state.hasBorders,
      maxPoints: this.state.maxPoints,
      roundTime: this.state.roundTime,
      hasIslands: this.state.hasIslands,
      isPublic: this.state.isPublic,
      hasStrictMatches: this.state.hasStrictMatches,
    })
  }
}
