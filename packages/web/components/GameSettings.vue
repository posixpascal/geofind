<template>
  <div class="settings-wrapper">
    <h3>Spielmodi</h3>
    <div class="settings-panel">
      <div class="game-modes">
        <div @click="settings = {...settings, mode: mode.name}" v-for="mode in modes" :class="`game-mode w-half ${settings.mode === mode.name ? 'active' : ''}`">
          <img :src="mode.image"/>
          {{ mode.name }}
        </div>
      </div>
    </div>

    <h3>Kartenset</h3>
    <div class="settings-panel">
      <div class="game-modes">
        <div @click="settings = {...settings, set: set.name}" v-for="set in sets" :class="`game-mode w-half ${settings.set === set.name ? 'active' : ''}`">
          <img :src="set.image"/>
          {{ set.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Emit, Model, VModel} from "vue-property-decorator";

@Component
export default class GameSettings extends Vue {
  @VModel() settings

  modes = [
    {
      name: "countries",
      image: require("~/assets/gamemodes/countries.svg")
    },
    {
      name: "capitals",
      image: require("~/assets/gamemodes/capitals.svg")
    },
    /*{
      name: "sightseeing",
      image: require("~/assets/gamemodes/sightseeing.svg")
    }*/
  ]

  sets = [
    {
      name: "earth",
      image: require("~/assets/mapsets/earth.svg")
    },
    {
      name: "continents",
      image: require("~/assets/mapsets/earth.svg")
    },
    {
      name: "africa",
      image: require("~/assets/mapsets/africa.svg")
    },
    {
      name: "europe",
      image: require("~/assets/mapsets/europe.svg")
    },
    {
      name: "asia",
      image: require("~/assets/mapsets/asia.svg")
    },
    {
      name: "us",
      image: require("~/assets/mapsets/us.svg")
    },
    {
      name: "islands",
      image: require("~/assets/mapsets/islands.svg")
    },
  ]
}
</script>
<style scoped lang="postcss">
h3 {
  @apply mt-10;
}

.settings-wrapper {
  @apply my-10;
}

.settings-panel {
  @apply bg-gray-100 rounded p-5 flex justify-center items-center w-full;
}

.game-modes {
  @apply flex items-center justify-between flex-wrap w-full items-center;
  margin-left: 8px;
  margin-right: 8px;
}

.game-mode {
  @apply justify-center items-center flex flex-col bg-gray-200 rounded p-5 text-center hover:bg-green-100 cursor-pointer;
  width: calc(33% - 8px);
  margin-bottom: 8px;
  margin-top: 8px;
  font-family: 'Luckiest Guy';
}

.game-mode.w-half {
  width: calc(50% - 8px);
}

.game-mode.active {
  @apply bg-green-400;
}

.game-mode.active svg {
  color: #fff;
}

.game-mode img {
  max-height: 64px;
}
</style>
