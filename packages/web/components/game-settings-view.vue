<template>
  <Panel v-if="room">
    <template #title>Wir spielen</template>
    <template #content>
      <div class="flex flex-col sm:flex-row justify-between mb-5 md:px-3" v-if="mode">
        <div :class="`game-mode w-full sm:w-1/2 md:mr-3`">
          <div v-html="mode.image"/>
          {{ $t(`settings.gameModes.${room.room}`) }}
        </div>
        <div :class="`game-mode w-full sm:w-1/2 md:ml-3`">
          <div v-html="mapSet.image"/>
          {{ $t(`settings.mapSets.${room.map}`) }}
        </div>
      </div>
      <div class="settings-panel">
        <div class="game-modes flex flex-col items-start justify-start content-start">
          <Checkbox :extra-classes="shade" readonly v-model='room.hasStrictMatches'
                    :label="$t('settings.directMatchesOnly')"/>
          <Checkbox v-if="false" :extra-classes="shade" readonly v-model='room.hasIslands' :label="$t('settings.islands')"/>
          <Checkbox v-if="false" :extra-classes="shade" readonly v-model='room.hasBorders' :label="$t('settings.borders')"/>
          <Checkbox v-if="shade === 'blue'" :extra-classes="shade" readonly v-model='room.isPublic'
                    :label="$t('settings.public')"/>

          <GameSettingsInput readonly disabled :value="room.roundTime" :label="$t('settings.roundTime')"/>
          <GameSettingsInput readonly disabled :value="room.maxPoints" :label="$t('settings.pointsNeeded')"/>
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

  get mode() {
    return this.modes.find(m => m.name === this.room.room);
  }

  get mapSet() {
    return this.maps.find(m => m.name === this.room.map);
  }

  modes = [
    {
      name: "countries",
      image: require("~/assets/gamemodes/countries.svg?raw")
    },
    {
      name: "capitals",
      image: require("~/assets/gamemodes/capitals.svg?raw"),
    },
    {
      name: "sightseeing",
      image: require("~/assets/gamemodes/sightseeing.svg?raw"),
    },
    {
      name: "domainhunt",
      image: require("~/assets/gamemodes/domains.svg?raw"),
    },
    {
      name: "flags",
      image: require("~/assets/gamemodes/flags.svg?raw"),
    },
    {
      name: "quiz",
      image: require("~/assets/gamemodes/quiz.svg?raw"),
    },
    {
      name: "speedrun",
      image: require("~/assets/gamemodes/speedrun.svg?raw"),
    },
    {
      name: "shapes",
      image: require("~/assets/gamemodes/shapes.svg?raw"),
    }
  ]

  maps = [
    {
      name: "earth",
      image: require("~/assets/mapsets/earth.svg?raw")
    },
    {
      name: "africa",
      image: require("~/assets/mapsets/africa.svg?raw"),
    },
    {
      name: "america",
      image: require("~/assets/mapsets/america.svg?raw"),
    },
    {
      name: "asia",
      image: require("~/assets/mapsets/asia.svg?raw"),
    },
    {
      name: "europe",
      image: require("~/assets/mapsets/europe.svg?raw"),
    },
    {
      name: "oceania",
      image: require("~/assets/mapsets/islands.svg?raw"),
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
