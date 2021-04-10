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
      />
    </GmapMap>
    <LoadingDialog :room="room"></LoadingDialog>
    <div class="footer">
      <span v-if="room">{{ room.name }} {{ room.roundTimeLeft }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {Room} from "~/models";
import LoadingDialog from "~/components/LoadingDialog.vue";

@Component({
  components: {LoadingDialog}
})
export default class Countries extends Vue {
  loading = true;

  marker = {}

  async created() {
    this.loading = true;
    const roomId = this.$route.params.id;

    if (this.room) {
      this.loading = false;
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

  moveMarker(ev){
      const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};
      this.marker.position = vote;
      this.$forceUpdate();
      console.log(vote);
  }

  target = {
    timezones: [
      "Europe/Tirane",
    ],
    latlng: [
      41,
      20,
    ],
    name: "Albania",
    country_code: "AL",
    capital: "Tirana",
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
</style>
