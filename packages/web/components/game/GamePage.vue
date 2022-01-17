<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {PINS} from "~/constants/pins";
import {icon, Point} from 'leaflet';

@Component
export default class GamePage extends Vue {
  get room(): any{
    return {};
  }

  marker: { position?: number[] } = {
  };

  get user() {
    return this.room.player;
  }

  async vote(newPosition, oldPosition) {
  }

  get canMoveMarker(){
    return false;
  }

  get tileserver() {
    return this.$config.borderedTileServer;
  }

  get mapOptions() {
    return {
      zoomControl: false,
      scrollWheelZoom: false, // disable original zoom function
      smoothWheelZoom: true,  // enable smooth zoom
      smoothSensitivity: 1,   // zoom speed. default is 1
    }
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

  moveMarker(ev: any) {
    if (!this.canMoveMarker) {
      return;
    }

    this.marker = {...this.marker, position: [ev.latlng.lat, ev.latlng.lng]};
  }

  dragMarker(ev: any) {
    const {lat, lng} = ev.target.getLatLng();
    this.marker = {...this.marker, position: [lat, lng]};
  }

  get pinTooltipOffset(){
    return new Point(1, -29 * 1.5);
  }

  get countryTooltipOffset(){
    return new Point(-15, 0);
  }
}
</script>
