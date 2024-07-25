<template>
  <div class="main-menu pt-10 gray-map">
    <l-map
      :center="[32, -5]"
      :zoom="3"
      :max-zoom="8"
      :options="mapOptions"
      :class="`game-map`"
      ref="map"
    >
      <l-tile-layer
        :url="tileserver"
        :attribution="`&copy; <a href='https://mapbox.com'>MapBox</a>. Geofind.io`"
      />
      <l-marker
        v-for="country in countries"
        :lat-lng="[country.latlng[1], country.latlng[0]]"
        :key="country.code"
      >
        <l-tooltip :options="{ permanent: false, interactive: false }">
          <Flag
            :hasDropShadow="true"
            :hasBorder="true"
            :hasBorderRadius="true"
            size="l"
            gradient="real-linear"
            :code="country.code"
          />
        </l-tooltip>
      </l-marker>
    </l-map>

    <Overlay :interactive="true" position="topleft">
      <div class="flex flex-col text-left justify-start">
        <h1 class="text-left m-0 p-0">{{ $t('achievements.title') }}</h1>
        <h1 class="text-lg sm:text-xl text-left m-0 p-0">
          {{ $t('achievements.description') }}
        </h1>
      </div>
    </Overlay>
    <Overlay :interactive="true" position="topright">
      <Button variant="red" xx-small :to="localePath('/')" class="ml-10">
        <span class="px-3 text-xl">X</span>
      </Button>
    </Overlay>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Box from '~/components/box.vue'
import PinSelection from '~/components/pin-selection.vue'
import Panel from '~/components/panel.vue'
import Button from '~/components/button.vue'
import Input from '~/components/input.vue'
import { LGeoJson, LMap, LTileLayer, LTooltip } from 'vue2-leaflet'
import Overlay from '~/components/overlay.vue'
import { collection, getDocs } from 'firebase/firestore'
import { Watch } from 'vue-property-decorator'

@Component({
  layout: 'play',
  components: {
    Overlay,
    LMap,
    LGeoJson,
    LTooltip,
    LTileLayer,
    Box,
    PinSelection,
    Input,
    Panel,
    Button,
  },
})
export default class SettingsPage extends Vue {
  get tileserver() {
    return this.$config.borderedTileServer
  }

  countries = []

  @Watch('$store.state.auth.user.uid', { immediate: true })
  async fetchShapes() {
    if (!this.$store.state.auth.user.uid) {
      return
    }

    const $firestore = (window.$nuxt as any).$firestore
    const path = `users/${(this.$store.state.auth.user as any).uid}/countries`
    const querySnapshot = await getDocs(collection($firestore, path))
    querySnapshot.forEach((doc) => {
      const country = doc.data()
      this.countries.push(country)
    })
  }

  get user() {
    return this.$store.state.auth.user
  }

  get mapOptions() {
    return {
      zoomControl: false,
      scrollWheelZoom: false, // disable original zoom function
      smoothWheelZoom: true, // enable smooth zoom
      smoothSensitivity: 1, // zoom speed. default is 1
    }
  }
}
</script>
<style lang="postcss">
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
