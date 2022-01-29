import { Vote } from '../rooms/schema/entities/VoteState'
import distanceBetween from '../functions/distanceBetween'
import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { Client } from 'colyseus'
import { getCountryByLatLng } from '../db/getCountryByLatLng'
import { OnEndRoundCommand } from './OnEndRoundCommand'

export class OnVoteCommand extends Command<
  CountryRoom,
  {
    client: Client
    latlng: [number, number]
  }
> {
  async execute({ client, latlng }) {
    const [lat, lng] = latlng
    let country = await getCountryByLatLng(latlng)

    const vote = new Vote({
      lat: lat,
      lng: lng,
      hasCountry: !!country,
      isCorrect:
        country && country.alpha2code === this.state.country.alpha2code,
    })

    if (country) {
      vote.country = country
    }

    vote.distance = distanceBetween(latlng, [
      this.state.country.lat,
      this.state.country.lng,
    ])

    vote.time = this.state.roundSecondsElapsed
    vote.sessionId = client.sessionId
    this.state.votes.set(client.sessionId, vote)

    // forcefully end round
    if (vote.isCorrect && this.state.room === 'speedrun') {
      if (this.room.roundTimer) {
        ;(this.room.roundTimer as any).clear()
      }
      this.room.dispatcher.dispatch(new OnEndRoundCommand())
    }
  }
}
