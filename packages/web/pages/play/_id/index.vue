<template>
  <div>
    <div class="banner">
      <div>
        <nuxt-link to="/">
          <Icon height="24" width="24" name="chevron-left"></Icon>
        </nuxt-link>
        <h2>Geofind</h2>
      </div>
      <h2>

      </h2>
    </div>
    <GmapMap
      v-if="room"
      ref="map"
      class="map"
      :center="{lat:10, lng:10}"
      :zoom="3"
      :options="mapOptions"
      @click="moveMarker"
    >
      <GmapMarker
        v-if="marker"
        :position="marker.position"
        @dragend="moveMarker"
        :clickable="true"
        :draggable="true"
        :icon="{ url: userPin }"
      ></GmapMarker>
    </GmapMap>
    <template v-if="room">
      <LoadingDialog v-if="room.mode === 'preparing'" :room="room"></LoadingDialog>
      <GameStartingDialog v-if="room.mode === 'starting'" :room="room"></GameStartingDialog>
      <RoundPrepareDialog v-if="room.mode === 'round_prepare'" :room="room"></RoundPrepareDialog>
      <RoundEndDialog v-if="room.mode === 'round_end'" :room="room"></RoundEndDialog>
    </template>

    <div class="footer flex justify-between">
      <span v-if="room && room.mode === 'round_start'">
        <h3>
          <Flag class="flag" :size="'L'" gradient="real-linear" :code="room.country.countryCode"/>
          {{ room.country.countryNameDe }}
        </h3>
      </span>
      <span v-if="room && room.mode === 'round_start'">
        <h3 class="flag">{{ room.roundTime }}</h3>
      </span>
    </div>
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
import {PINS} from "~/constants/pins";

@Component({
  components: {LoadingDialog, GameStartingDialog, RoundPrepareDialog, RoundEndDialog}
})
export default class Countries extends Vue {
  loading = true;

  marker = {}

  async created() {
    this.loading = true;
    const roomId = this.$route.params.id;

    if (this.room) {
      this.loading = false;
      this.$store.dispatch("room/message", {roomId, action: "ready", payload: {}})
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
  }

  get room() {
    const roomId = this.$route.params.id;
    return Room.query().find(roomId);
  }

  get user(){
    return this.$user.get();
  }

  get pins(){
    return PINS;
  }

  get userPin(){
    console.log(this.user.metadata.pin, PINS);
    return PINS[this.user.metadata.pin];
  }

  moveMarker(ev: any) {
    const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};
    (this.marker as any).position = vote;
    this.$store.dispatch("room/message", {roomId: this.room.id, action: "vote", payload: vote})
    this.$forceUpdate();
  }

  mapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    disableDefaultUI: false,
    styles: [
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
</script>
<style lang="postcss" scoped>
.banner, .footer {
  @apply absolute z-10 bg-opacity-80 bg-white w-full p-5 flex items-center h-2 text-xs;
}

.banner > div {
  @apply flex items-center;
}

.banner h2 {
  @apply relative  pl-2 top-0.5 text-xl;
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
</style>
