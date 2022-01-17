<template>
  <l-map :center="[32, -5]"
         :zoom="3"
         :options="mapOptions"
         :class='`game-map`'

         @click="moveMarker"
         ref="map">
    <l-tile-layer :url="tileserver"
                  :attribution="`&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a>. Tileset is (C) Geofind.IO`"/>
    <l-marker
      v-if="room && room.player && showOwnMarker && marker.position"
      :draggable="canMoveMarker"
      @dragend="dragMarker"
      :lat-lng="marker.position"
      :icon="playerPin"
    >
    </l-marker>

    <template v-if="inRoundEnd">
      <template v-for="vote in gameVotes">
        <l-marker
          v-if="vote.lat"
          :lat-lng="[vote.lat, vote.lng]"
          :icon="vote.pin"
        >
          <l-tooltip :content="vote.player.username" :options="{permanent: true, direction: 'bottom'}"></l-tooltip>
        </l-marker>
        <l-polyline v-if="vote.lat" :lat-lngs="getPolyline([vote.lat, vote.lng])" :color='vote.color'></l-polyline>
      </template>
    </template>

    <l-polyline v-if='room && room.state === states.ROUND_END && marker.position'
                :lat-lngs="getPolyline(marker.position)" :color='pinColor'></l-polyline>

    <l-marker
      v-if='room && room.state === states.ROUND_END && room.country.lat'
      :lat-lng="convertLatLng([room.country.lat, room.country.lng])"
    >

    </l-marker>
  </l-map>
</template>
<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue, Watch} from "vue-property-decorator";
import {Room} from "../../models";
import {VOTE_MESSAGE} from "../../constants/messages";
import {icon, Point} from "leaflet";
import {PIN_COLORS, PINS} from "../../constants/pins";
import {states} from "~/constants/states";
import {LControl, LGeoJson, LPolyline, LPopup, LTooltip} from "vue2-leaflet";

@Component({
  components: {
    LControl,
    LTooltip,
    LPopup,
    LGeoJson,
    LPolyline
  }
})
export default class GameMap extends Vue {
  @Prop() room: Room;

  pinSet = false;

  get inRoundEnd() {
    return (this.room && this.room.state === this.states.ROUND_END);
  }

  convertLatLng(coordinates) {
    if (!this.$refs.map) {
      return;
    }

    const [lng, lat] = coordinates;

    if (!lat || !lng) {
      return;
    }

    return (window as any).L.Projection.LonLat.unproject({x: lat, y: lng})
  }

  get gameVotes() {
    if (!this.room.players) {
      return [];
    }
    const votes = [];
    const factor = 1.5;
    for (const [playerID, vote] of Object.entries(this.room.votes)) {
      if (playerID === this.room.player.sessionId || !this.room.players[playerID]) {
        continue;
      }

      votes.push({
        lat: vote.lat,
        lng: vote.lng,
        player: this.room.players[playerID],
        color: PIN_COLORS[this.room.players[playerID].pin],
        pin: icon({
          iconUrl: PINS[this.room.players[playerID].pin],
          iconSize: [32 * factor, 37 * factor],
          iconAnchor: [13.4 * factor, 37 * factor]
        })
      })
    }

    return votes;
  }

  get showOwnMarker() {
    const inRoundStart = (this.room && this.room.state === this.states.ROUND_START)
    const inRoundEnd = (this.room && this.room.state === this.states.ROUND_END)

    return inRoundStart || inRoundEnd;
  }

  getPolyline(position) {
    if (!this.room.state) {
      return [];
    }
    return [
      position,
      this.convertLatLng([this.room.country.lat, this.room.country.lng])
    ]
  }

  get states() {
    return states;
  }

  @Watch('room.votes', {immediate: true})
  setPin() {
    if (this.pinSet) {
      return;
    }
    if (!this.room) {
      return;
    }
    if (!this.room.votes) {
      return;
    }

    if (this.room.votes[this.room.player.sessionId]) {
      this.pinSet = true;
      this.marker.position = [
        this.room.votes[this.room.player.sessionId].lat,
        this.room.votes[this.room.player.sessionId].lng
      ]
    }
  }


  @Watch('marker')
  async vote(newPosition, oldPosition) {
    if (!this.canMoveMarker) {
      return;
    }

    // Use different geographical encoding by switching lng and lat.
    const [lng, lat] = this.marker.position
    const position = [lng, lat];

    await this.$store.dispatch('room/message', {
      room: this.room,
      type: VOTE_MESSAGE,
      data: {
        position
      }
    })
    //await this.$socket.emit('game/vote', {gameId: this.gameId, position});
  }

  moveMarker(ev: any) {
    if (!this.canMoveMarker) {
      return;
    }
    this.marker = {...this.marker, position: [ev.latlng.lat, ev.latlng.lng]};
  }

  get canMoveMarker() {
    return this.room && (this.room.state === this.states.ROUND_START);
  }

  get mapOptions() {
    return {
      zoomControl: false,
      scrollWheelZoom: false, // disable original zoom function
      smoothWheelZoom: true,  // enable smooth zoom
      smoothSensitivity: 1,   // zoom speed. default is 1
    }
  }

  marker: { position?: number[] } = {};

  get user() {
    return this.room.player;
  }

  get tileserver() {
    return this.$config.borderedTileServer;
  }

  get playerPin() {
    const factor = 1.5;
    return icon({
      iconUrl: PINS[this.room.player.pin],
      iconSize: [32 * factor, 37 * factor],
      iconAnchor: [13.4 * factor, 37 * factor]
    })
  }

  otherPlayerPin(playerPinIndex) {
    const factor = 1.5;
    return icon({
      iconUrl: PINS[playerPinIndex],
      iconSize: [32 * factor, 37 * factor],
      iconAnchor: [13.4 * factor, 37 * factor]
    })
  }

  dragMarker(ev: any) {
    const {lat, lng} = ev.target.getLatLng();
    this.marker = {...this.marker, position: [lat, lng]};
  }

  get pinTooltipOffset() {
    return new Point(1, -29 * 1.5);
  }

  get countryTooltipOffset() {
    return new Point(-15, 0);
  }

  get pinColor() {
    return PIN_COLORS[this.room.player.pin];
  }

}
</script>
