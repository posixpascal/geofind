<template>
  <div class="dialog" v-if="room">
    <h3>
      Round end
    </h3>
    <div v-for="vote in votes">
      <span v-if="vote.country && vote.country.countryCode === room.country.countryCode">👑</span> {{ vote.player.displayName }}
      (Score: {{ room.scoreboard[vote.player.playerId].score }} Pts.)
      <br/><Flag v-if="vote.country" class="mini-flag" :code="vote.country.countryCode"></Flag>
      <small v-if="vote.country">{{ vote.country.countryNameDe }}
        <small v-if="vote.country.countryCode !== room.country.countryCode">
          ({{ vote.distanceInKm.toFixed(2) }}km)
        </small>
      </small>
      <small v-else>
        (unknown location) ({{ vote.distanceInKm.toFixed(2) }}km)
      </small>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";
import {Flag} from 'vue-flagpack'

@Component
export default class RoundEndDialog extends Vue {
  @Prop() room!: Room;

  created(){
    console.log(this.room.scoreboard);
  }

  get votes(){
    return Object.values(this.room.votes).sort((a, b) => {
      if (a.distanceInKm > b.distanceInKm){
        return 1;
      }

      if (b.distanceInKm > a.distanceInKm){
        return -1;
      }

      return 0
    });
  }
}
</script>
<style lang="postcss" scoped>
.dialog {
  @apply absolute bg-opacity-90 bg-white top-1/2 left-1/2 w-20 z-10 p-5 rounded shadow-2xl;
  @apply flex content-center justify-center bg-gray-100 bg-opacity-90 text-gray-700 flex-col;
  font-family: "Luckiest Guy";
  min-width: 500px;
  transform: translateX(-50%) translateY(-50%);
}

.dialog h2 {
  @apply text-center text-4xl pt-6;
}

.dialog h3 {
  @apply text-center text-5xl mt-5;
}

.dialog .flag {
  width: 72px;
  position: relative;
  top: 9px;
}

.dialog .mini-flag {
  position: relative;
  top: 2px;
}
</style>
