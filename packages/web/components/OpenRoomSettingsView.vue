<template>
  <div>
    <div class="flex">
      <div class="w-1/2 mr-5">
        <h5>Spielmodi</h5>
        <div :class="`game-mode w-half`">
          <img :src="mode.image"/>
          {{ mode.name }}
        </div>
      </div>
      <div class="w-1/2 ml-5">
        <h5>Kartenset</h5>
        <div :class="`game-mode w-half`">
          <img :src="mapSet.image"/>
          {{ mapSet.name }}
        </div>
      </div>
    </div>
    <div>
      <div class="game-modes mt-3">
        <Checkbox readonly v-model='room.metadata.directMatchesOnly' label="Nur genaue Treffer zählen"/>
        <Checkbox readonly v-model='room.metadata.suddenDeath' label="Sudden Death"/>
        <Checkbox readonly v-model='room.metadata.borders' label="Ländergrenzen"/>
        <GameSettingsInput readonly disabled :value="room.metadata.roundTime" label="Rundenzeit"/>
        <GameSettingsInput readonly disabled :value="room.metadata.maxRounds" label="Maximale Runden"/>
        <GameSettingsInput readonly disabled :value="room.metadata.pointsNeeded" label="Punkte zum Sieg"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Emit, Model, Prop, VModel} from "vue-property-decorator";
import {OpenRoom, Room} from "~/models";

@Component
export default class OpenRoomSettingsView extends Vue {
  @Prop() room!: OpenRoom;

  created() {
    console.log(this.room);
  }

  get mapSet() {
    return this.sets.find(m => m.name === this.room.metadata.mapSet);
  }

  get mode() {
    return this.modes.find(m => m.name === this.room.metadata.gameMode);
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
