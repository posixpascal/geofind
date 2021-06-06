<template>
  <div class="settings-wrapper">
    <h3>{{ $t('settings.gameMode') }}</h3>
    <div class="settings-panel">
      <div class="game-modes">
        <div @click="settings = {...settings, mode: mode.name}" v-for="mode in modes" :class="`game-mode ${shade} w-half ${settings.mode === mode.name ? 'active' : ''} ${mode.disabled ? 'disabled': ''}`">
          <img :src="mode.image"/>
          {{ $t(`settings.gameModes.${mode.name}`) }} {{ mode.disabled ? `(${$t('t.soon')})` : ""}}
        </div>
      </div>
    </div>

    <h3>{{ $t('settings.mapSet') }}</h3>
    <div class="settings-panel">
      <div class="game-modes">
        <div @click="settings = {...settings, set: set.name}" v-for="set in sets" :class="`game-mode ${shade} w-half ${settings.set === set.name ? 'active' : ''} ${set.disabled ? 'disabled': ''}`">
          <img :src="set.image"/>
          {{ $t(`settings.mapSets.${set.name}`) }} {{ set.disabled ? `(${$t('t.soon')})` : ""}}
        </div>
      </div>
    </div>

    <h3>{{ $t('t.other') }}</h3>
    <div class="settings-panel">
      <div class="game-modes flex flex-col items-start justify-start content-start">
        <Checkbox :extra-classes="shade" v-model='settings.directMatchesOnly' :label="$t('settings.directMatchesOnly')" />
        <Checkbox :extra-classes="shade" v-model='settings.borders' :label="$t('settings.borders')" />
        <Checkbox v-if="shade === 'blue'" :extra-classes="shade" v-model='settings.public' :label="$t('settings.public')"/>

        <GameSettingsInput v-model="settings.roundTime" :label="$t('settings.roundTime')" />
        <GameSettingsInput v-model="settings.maxRounds" :label="$t('settings.maxRounds')" />
        <GameSettingsInput v-model="settings.pointsNeeded" :label="$t('settings.pointsNeeded')" />
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
    },
    {
      name: "sightseeing",
      image: require("~/assets/gamemodes/sightseeing.svg"),
    },
    {
      name: "domainhunt",
      image: require("~/assets/gamemodes/domains.svg"),
    },
    {
      name: "flags",
      image: require("~/assets/gamemodes/flags.svg"),
    },
    {
      name: "quiz",
      image: require("~/assets/gamemodes/quiz.svg"),
    },
    {
      name: "speedrun",
      image: require("~/assets/gamemodes/speedrun.svg"),
    },
    {
      name: "shapes",
      image: require("~/assets/gamemodes/shapes.svg"),
    }
  ]

  sets = [
    {
      name: "earth",
      image: require("~/assets/mapsets/earth.svg")
    },
    {
      name: "africa",
      image: require("~/assets/mapsets/africa.svg"),
    },
    {
      name: "america",
      image: require("~/assets/mapsets/america.svg"),
    },
    {
      name: "asia",
      image: require("~/assets/mapsets/asia.svg"),
    },
    {
      name: "europe",
      image: require("~/assets/mapsets/europe.svg"),
    },
    {
      name: "oceania",
      image: require("~/assets/mapsets/islands.svg"),
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
