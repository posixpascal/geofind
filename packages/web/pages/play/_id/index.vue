<template>
  <div>
    <div class="banner flex justify-between">
      <div>
        <div class="close">
          <nuxt-link to="/">
            <Icon height="24" width="24" name="close"></Icon>
          </nuxt-link>
        </div>
        <span class="px-3 text-xl font-lucky" v-if="room.round > 0">Round #{{ room.round }} / {{
            room.maxRounds
          }}</span>

        <span v-if="room.mapStyle == 'suddendeath'" class="px-3 text-xl font-lucky">
            ☠️ SuddenDeath
        </span>
      </div>
      <span v-if="room && room.mode === 'round_start'">
        <h3>
          <Flag v-if="room.country && room.country.countryCode" class="flag" size="l" gradient="real-linear"
                :code="room.country.countryCode"/>
          {{ room.country.countryNameDe }}
        </h3>
      </span>
      <span v-if="room && room.mode === 'round_start'" class="px-5 flex items-end">
        <h3 class="flag">{{ room.roundTime }}</h3>
        <span class="text-sm text-gray-600 lowercase">sec</span>
      </span>
    </div>
    <GmapMap
      v-if="room"
      ref="map"
      class="map"
      :center="{lat: 43.489565, lng: -168.7008533}"
      :zoom="zoom"
      :options="mapOptions"
      @click="moveMarker"
    >
      <!-- personal marker -->
      <GmapMarker
        :animation="2"
        v-if="marker"
        :position="marker.position"
        @dragend="moveMarker"
        :clickable="true"
        :draggable="true"
        :icon="{
          url: userPin,
          anchor: { x: pinSizeX, y: pinSize },
          scaledSize: { height: pinSize, width: pinSize },
        }"
      ></GmapMarker>

      <!-- target marker -->
      <GmapMarker
        v-if="targetMarker"
        :animation="2"
        :position="targetMarker.position"
        :clickable="false"
        :draggable="false"
        :icon="{
          anchor: { x: pinSizeX, y: pinSize },
          scaledSize: { height: pinSize, width: pinSize },
        }"
      ></GmapMarker>

      <!-- other player markers -->
      <GmapMarker
        v-if="otherMarkers"
        animated
        v-for="(otherMarker, index) in otherMarkers"
        :position="otherMarker"
        :key="index"
        :clickable="false"
        :draggable="false"
        :icon="{
          url: pins[otherMarker.player.pin],
          anchor: { x: pinSizeX, y: pinSize },
          scaledSize: { height: pinSize, width: pinSize },
        }"
      ></GmapMarker>

      <GmapPolyline
        v-if="targetMarker" :path="markerPath" ref="polyline" :options="polylineOptions"
      />
    </GmapMap>
    <template v-if="room">
      <LoadingDialog v-if="room.mode === 'preparing'" :room="room"></LoadingDialog>
      <GameStartingDialog v-if="room.mode === 'starting'" :room="room"></GameStartingDialog>
      <RoundPrepareDialog v-if="room.mode === 'round_prepare'" :room="room"></RoundPrepareDialog>
      <RoundEndDialog v-if="room.mode === 'round_end'" :room="room"></RoundEndDialog>
      <ScoreBoardDialog v-if="room.mode === 'score_board'" :room="room"></ScoreBoardDialog>
      <GameEndDialog v-if="room.mode === 'ended'" :room="room"></GameEndDialog>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {Room} from "~/models";
import LoadingDialog from "~/components/LoadingDialog.vue";
import RoundPrepareDialog from "~/components/RoundPrepareDialog.vue";
import GameStartingDialog from "~/components/GameStartingDialog.vue";
import RoundEndDialog from "~/components/RoundEndDialog.vue";
import Icon from "~/components/Icon.vue";
import ScoreBoardDialog from "~/components/ScoreBoardDialog.vue";
import GameEndDialog from "~/components/GameEndDialog.vue";
import {PINS} from "~/constants/pins";
import {MAP_STYLES} from "~/constants/mapstyles";

@Component({
  components: {
    LoadingDialog,
    Icon,
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
      const otherMarkers = Object.values(event.markers).filter(m => m.player.id !== this.user._id)
      otherMarkers.forEach((marker, index) => {
        setTimeout(() => {
          this.otherMarkers.push(marker)
        }, index * 400)
      })
    });

    room.onMessage("othermarkers:unset", (event) => {
      console.log(event)
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

  moveMarker(ev: any) {
    if (this.room.mode !== "round_start") {
      return;
    }

    this.marker = {}

    const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};
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
          icon: {
            path: (window as any).google.maps.SymbolPath.FORWARD_CLOSED_ARROW
          },
          offset: "100%",
        },
      ],
    }
  }

  get mapOptions() {
    return {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUI: true,
      styles: [
        ...this.user.mapStyle,
        ...this.roomStyle,
        {
          elementType: "labels",
          featureType: "all",
          stylers: [
            {visibility: "off"},
          ],
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
  height: 100vh;
}

.map * {
  cursor: pointer !important;
}

.flag {
  position: relative;
  top: 4px;
}

.counter {
  @apply text-9xl absolute bottom-1 left-1 text-opacity-80 z-20;
}
</style>
