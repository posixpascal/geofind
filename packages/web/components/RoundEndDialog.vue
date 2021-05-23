<template>
  <div class="dialog" v-if="room">
    <h4 class="text-3xl pb-3 border-b-2 border-gray-400 flex justify-between flex-col w-full">
      <div>Runde #{{ room.round }} von {{ room.maxRounds }}</div>
      <div><Flag class="mini-flag" size="l" :code="room.country.countryCode" /> {{ room.country.countryNameDe }}</div>
    </h4>
    <div class="text-2xl">
      <transition v-for="(vote, index) in votes"
                  :key="vote.player.id"
                  enter-active-class="transition-all transition-fastest ease-out-quad"
                  enter-class="opacity-0 scale-70"
                  enter-to-class="opacity-100 scale-100"
                  leave-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-70"
      >
        <div class="my-3 py-1 border-b-2 border-gray-400 flex justify-between items-center">
          <span v-if="vote.country" class="flex">
            <Flag class="mini-flag" size="l" :code="vote.country.countryCode" />&nbsp;
            {{ vote.country.countryNameDe }}
          </span>
          <span v-else>
            &mdash;
          </span>
          <div class="flex">
            <span v-if="vote.player">
               <Pin :id="vote.player.pin" width="32" />
            </span>
            <span class="text-2xl">{{ vote.player.displayName }}</span>
          </div>
          <span>
              <span v-if="validVote(vote)">👑</span>
              <span v-else-if="vote.distanceInKm">{{ vote.distanceInKm.toFixed(2) }}km</span>
              <span v-else>&mdash;</span>
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";

@Component
export default class RoundEndDialog extends Vue {
  @Prop() room!: Room;

  created(){
    console.log(this.room.scoreboard);
  }

  get votes(){
    return Object.values(this.room.votes).filter(v => !!v).sort((a, b) => {
      if (a.distanceInKm > b.distanceInKm){
        return 1;
      }

      if (b.distanceInKm > a.distanceInKm){
        return -1;
      }

      return 0
    });
  }

  validVote(vote){
    if (!vote.country){
      return false;
    }
    return vote.country.countryCode === (this.room as any).country.countryCode
  }
}
</script>
<style lang="postcss" scoped>
.dialog {
  @apply absolute bg-opacity-90 bg-white left-1/2 w-20 z-10 p-5 rounded shadow-2xl;
  @apply flex content-center justify-center bg-gray-100 bg-opacity-90 text-gray-700 flex-col;
  font-family: "Luckiest Guy";
  top: 80px;
  min-width: 500px;
  transform: translateX(-50%);
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
  top: 0px;
}
</style>
