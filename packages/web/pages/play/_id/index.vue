<template>
  <div>
    <div :class='`map-wrapper ${room && room.state === states.ROUND_END ? "gray-map" : ""}`'>
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

        <l-polyline v-if='room && room.state === states.ROUND_END && marker.position' :lat-lngs="getPolyline(marker.position)" :color='pinColor'></l-polyline>

        <l-marker
          v-if='room && room.state === states.ROUND_END && room.country.lat'
          :lat-lng="convertLatLng([room.country.lat, room.country.lng])"
        >

        </l-marker>
      </l-map>
      <template v-if="room">
        <RoundPrepareDialog :country="room.country" v-if="room.country && room.state === states.ROUND_PREPARE"/>
        <MultiplayerScoreBoardDialog :room="room" v-if="room.country && room.state === states.SCOREBOARD"/>
        <GameEndDialog :room="room" v-if="room.state === 'game_end'"/>

        <Overlay position="bottomright">
          Runde: {{room.rounds}}
        </Overlay>
        <Overlay position="bottomcenter" v-if="room.state === 'round_start'" class="pt-15">
          <Countdown :initial="room.timer"/>
        </Overlay>
        <Overlay position="topleft" v-if="room.country && room.state === 'round_start'" animation="animate__flipInY">
          <CountryFlagWithName :country="room.country"
                               :distance-point="marker.position"
                               :hint-level="room.state === states.ROUND_END ? 2 : 0">
          </CountryFlagWithName>
        </Overlay>
        <Overlay position="bottomleft">
         <ScoreBoardOverlay  :room="room"/>
        </Overlay>

        <Overlay :interactive='true' position="topright" animation="animate__fadeIn">
          <Button variant='red' xx-small @click="leave" class="ml-10">
            <span class="px-3 text-xl">X</span>
          </Button>
        </Overlay>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Watch} from "vue-property-decorator";
import {Room} from "~/models";
import {PIN_COLORS, PINS} from "~/constants/pins";
import LoadingDialog from "~/components/dialogs/loading-dialog.vue";
import GameEndDialog from "~/components/dialogs/game-end-dialog.vue";
import ScoreBoardDialog from "~/components/dialogs/score-board-dialog.vue";
import RoundPrepareDialog from "~/components/dialogs/round-prepare-dialog.vue";
import GameStartingDialog from "~/components/dialogs/game-starting-dialog.vue";
import GamePage from "~/components/game/GamePage.vue";
import Overlay from "~/components/overlay.vue";
import CountryFlagWithName from "~/components/country-flag-with-name.vue";
import Countdown from "~/components/countdown.vue";
import ScoreBoardOverlay from "~/components/score-board-overlay.vue";
import Loading from "~/components/loading.vue";
import {LControl, LGeoJson, LPolyline, LPopup, LTooltip} from "vue2-leaflet";
import {icon} from "leaflet";
import MultiplayerScoreBoardDialog from "~/components/dialogs/multiplayer-score-board-dialog.vue";
import {states} from '~/constants/states';
import {VOTE_MESSAGE} from "~/constants/messages";

@Component({
  layout: 'play',
  components: {
    Loading,
    Overlay,
    CountryFlagWithName,
    LoadingDialog,
    GameStartingDialog,
    RoundPrepareDialog,
    ScoreBoardDialog,
    GameEndDialog,
    MultiplayerScoreBoardDialog,
    Countdown,
    ScoreBoardOverlay,
    LControl,
    LTooltip,
    LPopup,
    LGeoJson,
    LPolyline
  }
})
export default class Index extends GamePage {
  loading = true;
  marker: any = {}
  targetMarker: any = false
  timer = null;
  showMapOverview = false;
  showBounds = false;
  pinSet = false;

  get roomId(){
    return this.$route.params.id;
  }

  get room(){
    return Room.query().where('roomId', this.roomId).first();
  }

  async mounted() {
    this.pinSet = false;

    if (!this.room){
      await this.$store.dispatch('room/join', this.roomId)
    }
  }

  @Watch('room', {immediate: true})
  lobby(){
    if (!this.room) {
      return;
    }

    if (this.room.phase === 'lobby'){
      this.$router.push('/lobby/' + this.room.roomId);
    }
  }

  @Watch('room.votes', {immediate: true})
  setPin(){
    if (this.pinSet){ return; }
    if (!this.room){ return; }
    if (!this.room.votes) { return; }

    if (this.room.votes[this.room.player.sessionId]){
      this.pinSet = true;
      this.marker.position = [
        this.room.votes[this.room.player.sessionId].lat,
        this.room.votes[this.room.player.sessionId].lng
      ]
    }
  }

  get showOwnMarker() {
    const inRoundStart = (this.room && this.room.state === this.states.ROUND_START)
    const inRoundEnd = (this.room && this.room.state === this.states.ROUND_END)

    return inRoundStart || inRoundEnd;
  }

  get inRoundEnd(){
   return (this.room && this.room.state === this.states.ROUND_END);
  }

  get gameVotes(){
    if (!this.room.players){
      return [];
    }
    const votes = [];
    const factor = 1.5;
    for (const [playerID, vote] of Object.entries(this.room.votes)){
      if (playerID === this.room.player.sessionId || !this.room.players[playerID]){
        continue;
      }

      votes.push({
        lat: vote.lat,
        lng: vote.lng,
        player: this.room.players[playerID],
        color: PIN_COLORS[this.room.players[playerID].pin],
        pin:  icon({
          iconUrl: PINS[this.room.players[playerID].pin],
          iconSize: [32 * factor, 37 * factor],
          iconAnchor: [13.4 * factor, 37 * factor]
        })
      })
    }

    return votes;
  }

  voteColor(pin){
    return PIN_COLORS[pin];
  }

  get mapOptions() {
    return {
      zoomControl: false,
      scrollWheelZoom: false, // disable original zoom function
      smoothWheelZoom: true,  // enable smooth zoom
      smoothSensitivity: 1,   // zoom speed. default is 1
    }
  }

  get states() {
    return states;
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
    if (!this.canMoveMarker){
      return;
    }
    this.marker = {...this.marker, position: [ev.latlng.lat, ev.latlng.lng]};
  }

  leave() {
    this.$router.push('/')
  }

  showingAnswer = false;

  get canMoveMarker() {
    return this.room && (this.room.state === this.states.ROUND_START);
  }


  @Watch('room.state', {immediate: true, deep: true})
  async gameStateChanged(newState) {
    if (!newState || !this.$refs.map) {
      return;
    }

    if (newState.state === this.states.ROUND_PREPARE) {
      this.showMap();
      return;
    }

    if (newState.state === this.states.ROUND_END) {
      if (this.showingAnswer) {
        return;
      }
      this.showingAnswer = true;
      this.showAnswer();
      return;
    }

    this.showingAnswer = false;
    this.showMapOverview = false;
  }

  showMap() {
    this.showBounds = false;
    const map = (this.$refs.map as any).mapObject;
    map.flyTo([32, -5], 2.5, {
      animate: true,
      duration: 1
    });

    setTimeout(() => {
      this.showBounds = true;
    }, 1000)
  }


  showAnswer() {
    this.showBounds = true;
    const map = (this.$refs.map as any).mapObject;
    this.showMap();
    this.showMapOverview = true;
  }


  beforeDestroy() {
    return clearInterval(this.timer);
  }

  get gameId() {
    return this.$route.params.id;
  }


  getPolyline(position) {
    if (!this.room.state){
      return [];
    }
    return [
      position,
      this.convertLatLng([this.room.country.lat, this.room.country.lng])
    ]
  }

  get pinColor() {
    return PIN_COLORS[this.room.player.pin];
  }

  get state() {
    return this.room.state!;
  }

  get pins() {
    return PINS;
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
}
</script>
<style>
body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

.map-wrapper .leaflet-layer > .leaflet-tile-container {
  transition: filter ease-in-out 0.3s;
}
.gray-map .leaflet-layer > .leaflet-tile-container {
  filter: grayscale(100%);
}

</style>
<style lang="postcss" scoped>
.banner, .footer {
  @apply absolute z-10 bg-opacity-20 bg-white w-full py-5 flex items-center h-2 text-xs;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  height: 50px;
  background-color: rgba(255, 255, 255, .5);
}

.banner > div {
  @apply flex items-center;
}

.banner h2 {
  @apply relative  pl-2 top-0.5 text-xl;
}

.close {
  @apply bg-red-700 text-white;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  @apply bottom-0 h-2;
}

.map {
  width: 100%;
  cursor: crosshair;
}

.map * {
  cursor: crosshair !important;
}

.flag {
  position: relative;
  top: 4px;
}

.counter {
  @apply font-lucky text-6xl sm:text-9xl fixed bottom-0 opacity-40 z-20 flex content-end;
  left: 30px;
}

::v-deep .vue-map .gm-style div {
  cursor: crosshair !important;
}

</style>
