import { Vote } from '../rooms/schema/VoteState'
import distanceBetween from '../functions/distanceBetween'
import { Command } from '@colyseus/command'
import { CountryRoom } from '../rooms/CountryRoom'
import { Client } from 'colyseus'
import { getCountryByLatLng } from '../db/getCountryByLatLng'

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

    this.state.votes.set(client.sessionId, vote)
  }
}
