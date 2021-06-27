<template>
  <div>
    <div class="banner flex justify-between">
      <div>
        <div class="close">
          <nuxt-link to="/">
            <Icon height="24" width="24" name="close"/>
          </nuxt-link>
        </div>
        <span class="px-3 text-xl font-lucky" v-if="room && room.round > 0">
          <span class="hidden sm:inline">{{ $t('t.round') }} </span>{{ room.round }} / {{
            room.maxRounds
          }}</span>
      </div>
      <span v-if="room && room.mode === 'round_start'">
        <h3 class="pr-3">
          <Flag v-if="room.country && room.country.alpha2Code" class="flag" size="l" gradient="real-linear"
                :code="room.country.alpha2Code"/>
          {{ room.country.translations[$i18n.locale] }}
        </h3>
      </span>
    </div>

    <l-map :center="[32, -5]"
           :zoom="3"
           :options="mapOptions"
           class='game-map'
           @click="moveMarker"
           ref="background">
      <l-tile-layer :url="tileserver"
                    :attribution="`&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a>. Tileset is (C) Geofind.IO`"/>


      <!-- personal marker -->
      <l-marker
        :animation="2"
        v-if="marker.position"
        :lat-lng="marker.position"
        :draggable='room.mode === "round_start"'
      ></l-marker>

      <l-marker
        v-if="otherMarkers"
        :animation="2"
        v-for="(otherMarker, index) in otherMarkers"
        :lat-lng="otherMarker"
        :key="index"
        :clickable="false"
        :draggable="false"
        :icon="{
          url: pins[otherMarker.player.pin],
          anchor: { x: pinSizeX, y: pinSize },
          scaledSize: { height: pinSize, width: pinSize },
        }"
      ></l-marker>

      <l-polyline
        v-if="targetMarker" :path="markerPath" ref="polyline" :options="polylineOptions"
      />
    </l-map>

    <LoadingDialog v-if="room.mode === 'preparing'" :room="room"></LoadingDialog>
    <GameStartingDialog v-if="room.mode === 'starting'" :room="room"></GameStartingDialog>
    <RoundPrepareDialog v-if="room.mode === 'round_prepare'" :room="room"></RoundPrepareDialog>
    <RoundEndDialog v-if="room.mode === 'round_end'" :room="room"></RoundEndDialog>
    <ScoreBoardDialog v-if="room.mode === 'score_board'" :room="room"></ScoreBoardDialog>
    <GameEndDialog v-if="room.mode === 'ended'" :room="room"></GameEndDialog>


    <div class="counter" v-if="room.roundTime">{{ room.roundTime }}</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {Room} from "~/models";
import {PINS} from "~/constants/pins";
import {MAP_STYLES} from "~/constants/mapstyles";
import LoadingDialog from "~/components/dialogs/loading-dialog.vue";
import GameEndDialog from "~/components/dialogs/game-end-dialog.vue";
import ScoreBoardDialog from "~/components/dialogs/score-board-dialog.vue";
import RoundEndDialog from "~/components/dialogs/round-end-dialog.vue";
import RoundPrepareDialog from "~/components/dialogs/round-prepare-dialog.vue";
import GameStartingDialog from "~/components/dialogs/game-starting-dialog.vue";

@Component({
  layout: 'play',
  components: {
    LoadingDialog,
    GameStartingDialog,
    RoundPrepareDialog,
    RoundEndDialog,
    ScoreBoardDialog,
    GameEndDialog
  }
})
export default class Index extends Vue {
  loading = true;
  zoom = 3
  marker: any = {}
  targetMarker: any = false
  otherMarkers = []
  roundStats = {};

  get tileserver() {
    return 'http://127.0.0.1:20008/tile/geography-class/{z}/{x}/{y}.png';
    if (this.room.borders) {
      return '//{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'
    }
    return "//{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png";
  }

  get mapOptions() {
    return {
      zoomControl: false,
      scrollWheelZoom: false, // disable original zoom function
      smoothWheelZoom: true,  // enable smooth zoom
      smoothSensitivity: 1,   // zoom speed. default is 1
    }
  }

  async created() {
    this.loading = true;
    const roomId = this.$route.params.id;

    if (this.room) {
      this.loading = false;
      await this.$store.dispatch("room/message", {roomId, action: "ready", payload: {}})
      await this.setupEvents();
      return;
    }

    // Possible reconnect.
    try {
      const room = await this.$store.dispatch("room/join", roomId);
      await this.$store.dispatch("room/subscribe", room);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }

    await this.setupEvents();
  }

  get markerPath() {
    return [
      this.marker.position,
      this.targetMarker.position,
    ];
  }

  async setupEvents() {
    const room = await this.$store.dispatch("room/get", this.$route.params.id);
    if (!room) {
      return;
    }

    room.onMessage("marker:unset", (event) => {
      this.marker = {};
    });

    room.onMessage("targetmarker:place", (event) => {
      this.targetMarker = event;
    });

    room.onMessage("targetmarker:unset", (event) => {
      this.targetMarker = null;
    });

    room.onMessage("othermarkers:place", (event) => {
      this.otherMarkers = [];
      const otherMarkers = Object.values(event.markers).filter((m: any) => m.player.id !== this.user._id)
      otherMarkers.forEach((marker, index) => {
        setTimeout(() => {
          this.otherMarkers.push(marker)
        }, index * 300)
      })
    });

    room.onMessage("othermarkers:unset", (event) => {
      this.otherMarkers = [];
    });

    room.onMessage("map:position", (event) => {
      if (!this.$refs.map || !(this.$refs.map as any).$mapObject) {
        return;
      }
      (this.$refs.map as any).$mapObject.panTo(event);
      this.zoom = event.zoom || this.zoom;
    });

    room.onMessage("round:stats", (event) => {
      this.roundStats = event;
    });
  }

  beforeDestroy() {
    this.$store.dispatch("room/leave", this.$route.params.id);
  }

  get room() {
    const roomId = this.$route.params.id;
    return Room.query().find(roomId);
  }

  get user() {
    return this.$user.get();
  }

  get pins() {
    return PINS;
  }

  get pinSize() {
    return 48;
  }

  // Center of the Marker
  get pinSizeX() {
    return 22;
  }

  get userPin() {
    return PINS[this.user.metadata.pin || 1];
  }

  get fullHeight() {
    return window.innerHeight + "px";
  }

  moveMarker(ev: any) {
    if (this.room.mode !== "round_start") {
      return;
    }

    this.marker = {}

    const vote = {lat: ev.latlng.lat, lng: ev.latlng.lng};
    (this.marker as any).position = vote;
    this.$store.dispatch("room/message", {roomId: this.room.id, action: "vote", payload: vote})
    this.$forceUpdate();
  }


  get polylineOptions() {
    return {
      strokeOpacity: 0.9,
      strokeColor: this.user.pinColor,
      geodisic: true,
      icons: [
        {
          offset: "100%",
        },
      ],
    }
  }

  calculateMidPoint(latLngA: any, latLngB: any) {
    function toRadians(degress: number): number {
      return degress * (Math.PI / 180);
    }

    function toDegrees(radians: number): string {
      return (radians * (180 / Math.PI)).toFixed(4);
    }

    const lngDiff = toRadians(latLngB.lng - latLngA.lng);
    const latA = toRadians(latLngA.lat);
    const latB = toRadians(latLngB.lat);
    const lngA = toRadians(latLngA.lng);

    const bx = Math.cos(latB) * Math.cos(lngDiff);
    const by = Math.cos(latB) * Math.sin(lngDiff);

    const latMidway = toDegrees(
      Math.atan2(
        Math.sin(latA) + Math.sin(latB),
        Math.sqrt((Math.cos(latA) + bx) * (Math.cos(latA) + bx) + by * by)
      )
    );
    const lngMidway = toDegrees(lngA + Math.atan2(by, Math.cos(latA) + bx));

    return {lat: latMidway, lng: lngMidway}
  }

  get roomStyle() {
    let roomStyle = [];
    if (!this.room.borders) {
      roomStyle = [
        ...roomStyle,
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    }

    if (this.room.mapStyle) {
      roomStyle = [...roomStyle, ...MAP_STYLES[this.room.mapStyle]];
    }

    return roomStyle;
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
