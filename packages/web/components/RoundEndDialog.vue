<template>
  <div class="dialog" v-if="room && show">
    <h4 class="text-2xl sm:text-3xl pb-3 border-b-2 border-gray-400 flex justify-between flex-col w-full">
      <div>{{ $t("t.round") }} #{{ room.round }} {{ $t('t.of')}} {{ room.maxRounds }}</div>
      <div>
        <Flag class="mini-flag" size="l" :code="room.country.alpha2Code"/>
        {{ room.country.translations[$i18n.locale] }}
      </div>
    </h4>
    <div class="text-xl sm:text-2xl">
      <transition v-for="(vote, index) in votes"
                  :key="vote.player.id"
                  enter-active-class="transition-all transition-fastest ease-out-quad"
                  enter-class="opacity-0 scale-70"
                  enter-to-class="opacity-100 scale-100"
                  leave-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-70"
      >
        <div
          :class="`py-3 border-b-2 border-gray-400 flex flex-col-reverse sm:flex-row justify-between sm:items-center ${vote.hasWon ? 'bg-green-100' : 'bg-red-100'}`">
          <div class="flex">
            <span v-if="vote.country" class="flex">
            <Flag class="mini-flag" size="l" :code="vote.country.alpha2Code"/>&nbsp;
            {{ vote.country.translations[$i18n.locale] }}
          </span>
            <span v-else>
            &mdash;
          </span>
          </div>
          <div class="flex">
            <span v-if="vote.player">
               <Pin :id="vote.player.pin" width="32"/>
            </span>
            <span class="text-xl sm:text-2xl sm:pr-4">{{ vote.player.displayName }}</span>
            <span>
              <span v-if="validVote(vote)">👑</span>
              <span v-else-if="vote.distanceInKm">{{ vote.distanceInKm.toFixed(2) }}km</span>
              <span v-else>&mdash;</span>
          </span>
          </div>
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
  show: boolean;

  created() {
    this.show = true;
  }

  get votes() {
    return Object.values(this.room.votes).filter(v => !!v).sort((a, b) => {
      if (a.distanceInKm > b.distanceInKm) {
        return 1;
      }

      if (b.distanceInKm > a.distanceInKm) {
        return -1;
      }

      return 0
    });
  }

  validVote(vote) {
    if (!vote.country) {
      return false;
    }
    return vote.country.alpha2Code === (this.room as any).country.alpha2Code
  }
}
</script>
<style lang="postcss" scoped>
.dialog {
  @apply absolute bg-opacity-90 bg-white left-1/2 w-20 z-10 p-5 rounded shadow-2xl;
  @apply flex content-center justify-center bg-gray-100 bg-opacity-90 text-gray-700 flex-col;
  font-family: "Luckiest Guy";
  top: 80px;
  width: 90%;
  max-width: 750px;
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
