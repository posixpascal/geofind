<template>
  <div>
    <l-map :center="[32, -5]"
           :zoom="1"
           :options="mapOptions"
           class='game-map'
           @click="moveMarker"
           @ready="showMap"
           ref="map">
      <l-tile-layer :url="tileserver"
                    :attribution="`&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> | Tiles &copy; Geofind.io | &copy; @posixpascal`"/>

      <l-geo-json v-if='tutor && tutor.state === states.ROUND_END' :geojson="tutor.country.shape"></l-geo-json>
      <l-marker
        v-if='tutor && tutor.state === states.ROUND_END && tutor.country.latlng'
        :lat-lng="convertLatLng(tutor.country.latlng.coordinates)"
      >
        <l-tooltip :options="{ offset: countryTooltipOffset, permanent: true, direction: 'top'}">
          <div class="country-tooltip">
            <span :data-random="Math.random()"></span>
            <CountryFlagWithName :country="tutor.country">
            </CountryFlagWithName>
          </div>
        </l-tooltip>
      </l-marker>
      <l-marker
        v-if="tutor && userVote && tutor.state === states.ROUND_START"
        :draggable="canMoveMarker"
        @dragend="dragMarker"
        :lat-lng="marker.position"
        :icon="playerPin"
      >
        <l-tooltip :options="{ offset: pinTooltipOffset, permanent: true, direction: 'top'}">
          <div class="country-tooltip">
            <span :data-random="Math.random()"></span>
            <CountryFlagWithName v-if='userVote && userVote.country' :country="userVote.country" flag-size="m">
            </CountryFlagWithName>
            <div v-else>
              Loading...
            </div>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>

    <template v-if="user">
      <TutorDialog v-if="!user.seenTutor" @close="startTutor"/>
    </template>

    <template v-if="tutor">
      <RoundPrepareDialog :country="tutor.country" v-if="tutor.country && tutor.state === states.ROUND_PREPARE"/>
      <ScoreBoardDialog
        :tutor="tutor"
        :marker='marker'
        :user-vote="userVote"
        :country="tutor.country"
        v-if="tutor.country && tutor.state === states.SCOREBOARD"/>
    </template>

    <template v-if="tutor && tutor.country">
      <Overlay position="bottomleft" v-if="tutor.state === states.ROUND_START" animation="animate__flipInY">
        <CountryFlagWithName :hint-level="tutor.hintLevel" :country="tutor.country" :distance-point="marker.position">
        </CountryFlagWithName>
      </Overlay>
    </template>

    <Overlay position="topleft" animation="animate__fadeIn">
      <Button variant='red' xx-small @click="leave" class="mr-3">
        <span class="px-3 text-xl">X</span>
      </Button>
      <Button variant='purple' xx-small class="mr-3" @click="help">
        <span class="px-3 text-xl">?</span>
      </Button>

      <Button variant='purple' xx-small @click="skip">
        <span class="px-3 text-xl">
          &raquo;
        </span>
      </Button>
    </Overlay>

    <Overlay position="topright" v-if="tutor">

    </Overlay>
  </div>
</template>
<script lang="ts">
import {Component, Watch} from "vue-property-decorator";
import LoadingDialog from "~/components/dialogs/loading-dialog.vue";
import GameEndDialog from "~/components/dialogs/game-end-dialog.vue";
import ScoreBoardDialog from "~/components/dialogs/score-board-dialog.vue";
import RoundPrepareDialog from "~/components/dialogs/round-prepare-dialog.vue";
import GameStartingDialog from "~/components/dialogs/game-starting-dialog.vue";
import GamePage from "~/components/game/GamePage.vue";
import Dialog from "~/components/dialog.vue";
import TutorDialog from "~/components/dialogs/tutor-dialog.vue";
import Button from "~/components/button.vue";
import {LControl, LGeoJson, LPopup, LTooltip} from "vue2-leaflet";
import Overlay from "~/components/overlay.vue";
import CountryFlagWithName from "~/components/country-flag-with-name.vue";

@Component({
  layout: 'play',
  components: {
    Button,
    Dialog,
    Overlay,
    LoadingDialog,
    CountryFlagWithName,
    GameStartingDialog,
    RoundPrepareDialog,
    ScoreBoardDialog,
    GameEndDialog,
    TutorDialog,
    LControl,
    LTooltip,
    LPopup,
    LGeoJson
  }
})
export default class Index extends GamePage {
  zoom = 3
  started = false;
  loading = false;
  showPopup = false;
  showVoteCorrect = false;

  async created() {
    this.loading = true;
    //this.$socket.on('tutor/correctVote', this.correctVote);
  }

  beforeDestroy(){
    //this.$socket.off('tutor/correctVote');
  }

  correctVote(){
    this.showVoteCorrect = true;
    setTimeout(() => {
      this.showVoteCorrect = false;
    }, 3000);
  }

  leave() {
    this.$router.push('/')
  }

  async start() {
    this.started = true;
    await this.$pub('tutor/play', {id: this.tutorId});
  }

  async help() {
    await this.$pub('tutor/help', {id: this.tutorId});
  }

  async skip() {
   if (this.tutor.state === this.states.ROUND_START) {
     return this.$pub('tutor/skip', {id: this.tutorId});
   }
    return this.$pub('tutor/nextRound', {id: this.tutorId});
  }

  @Watch('$auth.user', {deep: true, immediate: true})
  async startTutor() {
  }

  @Watch('marker')
  async vote(newPosition, oldPosition) {
    if (!this.canMoveMarker) {
      return;
    }

    this.showPopup = false;

    // Use different geographical encoding by switching lng and lat.
    const [lng, lat] = this.marker.position
    const position = [lng, lat];

    await this.$pub('tutor/vote', {id: this.tutorId, position});
    this.showPopup = true;
  }

  // TODO: Refactor this.
  @Watch('tutor.state', { deep: true })
  async tutorStateChanged(newState){
    if (newState === this.states.ROUND_PREPARE){
      this.showMap();
    }
    if (newState === this.states.ROUND_END){
      if (!this.tutor.country?.latlng?.coordinates){
        await this.$store.dispatch('country/discover', this.tutor.countryId);
        setTimeout(() => {
          this.showAnswer();
        }, 200);
        return;
      }
      if (!this.userVote){
        setTimeout(async () => {
          await this.$pub('tutor/nextRound', {id: this.tutor.id});
        }, 4000);
      }
     this.showAnswer();
    }
  }

  showAnswer(){
    const map = (this.$refs.map as any).mapObject;
    map.flyToBounds(this.tutor.country.bounds, {
      animate: true,
      duration: 2,
      maxZoom: 8,
      padding: {x: 20, y: 20}
    });
  }

  showMap(){
    const map = (this.$refs.map as any).mapObject;
    map.flyTo([32, -5], 2.5, {
      animate: true,
      duration: 3
    });
  }

  convertLatLng(coordinates){
    if (!this.$refs.map){
      return;
    }

    const [lat, lng] = coordinates;
    if (!lat || !lng){
      return;
    }
    return (window as any).L.Projection.LonLat.unproject({x: lat, y: lng})
  }

  get tutorId() {
    return this.$route.params.id;
  }

  get tutor() :any {
    return {};
  }

  get states() : any {
    return {}
  }

  get userVote(): any {
    return {}
  }

  get canMoveMarker() {
    return !!this.tutor ;
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
</style>
<style lang="postcss" scoped>
.banner > div {
  @apply flex items-center;
}

.banner h2 {
  @apply relative  pl-2 top-0.5 text-xl;
}

.country-tooltip {
  display: flex;
  justify-content: center;
}

.country-tooltip .flag {
  text-after-overflow: center;
}

.close {
  @apply bg-red-700 text-white;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.counter {
  @apply font-lucky text-6xl sm:text-9xl fixed bottom-0 opacity-40 z-20 flex content-end;
  left: 30px;
}

::v-deep .vue-map .gm-style div {
  cursor: crosshair !important;
}

.correct-vote {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(54, 169, 31, 0.5);
}
</style>
