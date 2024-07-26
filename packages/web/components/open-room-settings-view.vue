<template>
  <div>
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:w-1/2 sm:mr-5">
        <h5>Spielmodi</h5>
        <div :class="`game-mode w-half`">
          <div v-html="mode.image" />
          {{ mode.name }}
        </div>
      </div>
      <div class="w-full sm:w-1/2 sm:ml-5">
        <h5>Kartenset</h5>
        <div :class="`game-mode w-half`">
          <div v-html="mapSet.image" />
          {{ mapSet.name }}
        </div>
      </div>
    </div>
    <div class="hidden sm:block">
      <div class="game-modes mt-3">
        <GameSettingsInput
          readonly
          disabled
          :value="game.roundTime"
          label="Rundenzeit"
        />
        <GameSettingsInput
          readonly
          disabled
          :value="game.maxPoints"
          label="Punkte zum Sieg"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Model, Prop, VModel } from 'vue-property-decorator'

@Component
export default class OpengameSettingsView extends Vue {
  @Prop() game!: any

  get mode() {
    return this.modes.find((m) => m.name === this.game.room)
  }

  get mapSet() {
    return this.maps.find((m) => m.name === this.game.map)
  }

  modes = [
    {
      name: 'countries',
      image: require('~/assets/gamemodes/countries.svg?raw'),
    },
    {
      name: 'party',
      image: require('~/assets/gamemodes/party.svg?raw'),
    },
    {
      name: 'capitals',
      image: require('~/assets/gamemodes/capitals.svg?raw'),
    },
    {
      name: 'sightseeing',
      image: require('~/assets/gamemodes/sightseeing.svg?raw'),
    },
    {
      name: 'domainhunt',
      image: require('~/assets/gamemodes/domains.svg?raw'),
    },
    {
      name: 'flags',
      image: require('~/assets/gamemodes/flags.svg?raw'),
    },
    {
      name: 'quiz',
      image: require('~/assets/gamemodes/quiz.svg?raw'),
    },
    {
      name: 'speedrun',
      image: require('~/assets/gamemodes/speedrun.svg?raw'),
    },
    {
      name: 'shapes',
      image: require('~/assets/gamemodes/shapes.svg?raw'),
    },
  ]

  maps = [
    {
      name: 'earth',
      image: require('~/assets/mapsets/earth.svg?raw'),
    },
    {
      name: 'africa',
      image: require('~/assets/mapsets/africa.svg?raw'),
    },
    {
      name: 'america',
      image: require('~/assets/mapsets/america.svg?raw'),
    },
    {
      name: 'asia',
      image: require('~/assets/mapsets/asia.svg?raw'),
    },
    {
      name: 'europe',
      image: require('~/assets/mapsets/europe.svg?raw'),
    },
    {
      name: 'oceania',
      image: require('~/assets/mapsets/islands.svg?raw'),
    },
  ]
}
</script>
<style scoped lang="postcss">
.settings-wrapper {
  @apply my-10 flex justify-between;
  margin-left: -8px;
  margin-right: -8px;
}

.settings-panel {
  @apply rounded w-full p-5 flex flex-col justify-center items-center;
  margin-left: -12px;
  margin-right: -12px;
}

.game-modes {
  @apply flex items-center justify-between flex-wrap w-full items-center;
  margin-left: 8px;
  margin-right: 8px;
}

.game-mode {
  @apply justify-center items-center flex flex-col bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded p-5 text-center cursor-pointer;
  width: 100% !important;
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
