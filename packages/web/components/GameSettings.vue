<template>
  <div class="settings-wrapper">
    <h3>Spielmodi</h3>
    <div class="settings-panel">
      <div class="game-modes">
        <div @click="settings = {...settings, mode: mode.name}" v-for="mode in modes" :class="`game-mode ${shade} w-half ${settings.mode === mode.name ? 'active' : ''} ${mode.disabled ? 'disabled': ''}`">
          <img :src="mode.image"/>
          {{ mode.name }}
        </div>
      </div>
    </div>

    <h3>Kartenset</h3>
    <div class="settings-panel">
      <div class="game-modes">
        <div @click="settings = {...settings, set: set.name}" v-for="set in sets" :class="`game-mode ${shade} w-half ${settings.set === set.name ? 'active' : ''} ${set.disabled ? 'disabled': ''}`">
          <img :src="set.image"/>
          {{ set.name }}
        </div>
      </div>
    </div>

    <h3>Sonstiges</h3>
    <div class="settings-panel">
      <div class="game-modes flex flex-col items-start justify-start content-start">
        <Checkbox :extra-classes="shade" v-model='settings.directMatchesOnly' label="Nur genaue Treffer zählen" />
        <Checkbox :extra-classes="shade" v-model='settings.suddenDeath' label="Sudden Death" />
        <Checkbox :extra-classes="shade" v-model='settings.borders' label="Ländergrenzen" />
        <Checkbox v-if="shade === 'blue'" :extra-classes="shade" v-model='settings.public' label="Public"/>

        <GameSettingsInput v-model="settings.roundTime" label="Rundenzeit" />
        <GameSettingsInput v-model="settings.maxRounds" label="Maximale Runden" />
        <GameSettingsInput v-model="settings.pointsNeeded" label="Punkte zum Sieg" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Emit, Model, Prop, VModel} from "vue-property-decorator";
import GameSettingsInput from "~/components/GameSettingsInput.vue";
import Checkbox from "~/components/Checkbox.vue";

@Component({
  components: {Checkbox, GameSettingsInput}
})
export default class GameSettings extends Vue {
  @VModel() settings!: any;
  @Prop({default: "green"}) shade!: string;

  modes = [
    {
      name: "countries",
      image: require("~/assets/gamemodes/countries.svg")
    },
    {
      name: "capitals",
      image: require("~/assets/gamemodes/capitals.svg"),
      disabled: true
    },
    {
      name: "sightseeing",
      image: require("~/assets/gamemodes/sightseeing.svg"),
      disabled: true
    },
    {
      name: "random",
      image: require("~/assets/gamemodes/random.svg"),
      disabled: true
    },
  ]

  sets = [
    {
      name: "earth",
      image: require("~/assets/mapsets/earth.svg")
    },
    {
      name: "continents",
      image: require("~/assets/mapsets/earth.svg"),
      disabled: true
    },
    {
      name: "africa",
      image: require("~/assets/mapsets/africa.svg"),
      disabled: true
    },
    {
      name: "europe",
      image: require("~/assets/mapsets/europe.svg"),
      disabled: true
    },
    {
      name: "asia",
      image: require("~/assets/mapsets/asia.svg"),
      disabled: true
    },
    {
      name: "us",
      image: require("~/assets/mapsets/us.svg"),
      disabled: true
    },
    {
      name: "islands",
      image: require("~/assets/mapsets/islands.svg"),
      disabled: true
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
  @apply flex justify-between flex-wrap w-full;
  margin-left: 8px;
  margin-right: 8px;
}

.game-mode {
  @apply justify-center items-center flex flex-col bg-gray-200 rounded p-5 text-center cursor-pointer;
  width: calc(33% - 8px);
  margin-bottom: 8px;
  margin-top: 8px;
  font-family: 'Luckiest Guy';
}

.game-mode.green {
  @apply hover:bg-green-200;
}

.game-mode.green.active {
  @apply bg-green-400;
}

.game-mode.blue {
  @apply hover:bg-blue-200;
}

.game-mode.blue.active {
  @apply bg-blue-400;
}

.game-mode.w-half {
  width: calc(50% - 8px);
}

.game-mode.disabled {
  opacity: 0.5;
  cursor: no-drop;
  pointer-events: none;
}

.game-mode.active svg {
  color: #fff;
}

.game-mode img {
  max-height: 64px;
}
</style>
