<template>
  <div class="bg-gray-50 relative">
    <l-map :center="[32, -5]"
           :zoom="3"
           :options="mapOptions"
           class='map-bg'
           ref="background">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    :attribution="`&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors`"/>
    </l-map>
    <div class=" relative z-10"><slot></slot></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class MapBackground extends Vue {
  timerId: NodeJS.Timeout = null;
  lng = 1;
  lat = 32;

  mounted() {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches){
      return;
    }

    let lat = 32;
    let lng = 1;
    // Automatically scroll background
    this.timerId = setInterval(() => {
      if (!(this.$refs.background as any).mapObject) {
        return;
      }

      (this.$refs.background as any).mapObject.panTo({lat: lat, lng: this.lng++});
    }, 50);
  }

  beforeDestroy() {
    clearInterval(this.timerId);
  }

  get mapOptions() {
    return {
      zoomControl: false,
      scrollWheelZoom: false, // disable original zoom function
      smoothWheelZoom: true,  // enable smooth zoom
      smoothSensitivity: 1,   // zoom speed. default is 1
    }
  }
}
</script>
<style lang="postcss">
.map-bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0.15;
  z-index:0;
  pointer-events: none;
}

</style>
