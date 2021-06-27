<template>
  <Panel v-if="room && mode && mapSet">
    <template #title>Gespielt wird</template>
    <template #content>
      <div class="flex justify-between mb-5 px-3">
        <div :class="`game-mode w-half mr-3`">
          <img :src="mode.image"/>
          {{ $t(`settings.gameModes.${mode.name}`) }}
        </div>
        <div :class="`game-mode w-half ml-3`">
          <img :src="mapSet.image"/>
          {{ $t(`settings.mapSets.${mapSet.name}`) }}
        </div>
      </div>
      <div class="settings-panel">
        <div class="game-modes flex flex-col items-start justify-start content-start">
          <Checkbox :extra-classes="shade" readonly v-model='room.directMatchesOnly'
                    :label="$t('settings.directMatchesOnly')"/>
          <Checkbox :extra-classes="shade" readonly v-model='room.islands' :label="$t('settings.islands')"/>
          <Checkbox :extra-classes="shade" readonly v-model='room.borders' :label="$t('settings.borders')"/>
          <Checkbox v-if="shade === 'blue'" :extra-classes="shade" v-model='room.public'
                    :label="$t('settings.public')"/>

          <GameSettingsInput readonly disabled :value="room.roundTime" :label="$t('settings.roundTime')"/>
          <GameSettingsInput readonly disabled :value="room.pointsNeeded" :label="$t('settings.pointsNeeded')"/>
        </div>
      </div>
    </template>
  </Panel>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Emit, Model, Prop, VModel} from "vue-property-decorator";
import {Room} from "~/models";
import GameSettingsInput from "~/components/game-settings-input.vue";
import Checkbox from "~/components/checkbox.vue";
import Panel from "~/components/panel.vue";

@Component({
  components: {Checkbox, GameSettingsInput, Panel}
})
export default class GameSettingsView extends Vue {
  @Prop() room!: Room;
  @Prop({default: "green"}) shade!: string;

  created() {
    console.log(this.room);
  }

  get mode() {
    return this.modes.find(m => m.name === this.room.gameMode);
  }

  get mapSet() {
    return this.sets.find(m => m.name === this.room.mapSet);
  }

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
      name: "america",
      image: require("~/assets/mapsets/america.svg"),
      disabled: true
    },
    {
      name: "oceania",
      image: require("~/assets/mapsets/islands.svg"),
      disabled: true
    },
  ]
}
</script>
<style scoped lang="postcss">

.settings-wrapper {
  @apply flex justify-between;
  margin-left: -8px;
  margin-right: -8px;
}

.settings-panel {
  @apply rounded w-full mx-3 flex flex-col justify-center items-center mt-0;
}

.game-modes {
  @apply flex justify-between flex-wrap w-full;
  margin-left: 8px;
  margin-right: 8px;
}

.game-mode {
  @apply justify-center items-center flex flex-col bg-gray-200 rounded p-5 text-center cursor-pointer;
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
