<template>
  <geo-dialog>
    <h4 class="text-2xl sm:text-3xl pb-3 border-b-2 border-gray-400 flex justify-between flex-col w-full">
      <div>{{ $t("t.round") }} #{{ room.round }} {{ $t('t.of') }} {{ room.maxRounds }}</div>
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
          :class="`py-3 border-b-2 border-gray-400 flex items-center justify-between sm:items-center ${vote.hasWon ? 'bg-green-100' : 'bg-red-100'}`">
          <div class="pl-2 sm:pl-0 flex">
            <span v-if="vote.country" class="flex">
            <Flag class="mini-flag" size="l" :code="vote.country.alpha2Code"/>&nbsp;
              <span class="hidden sm:inline-block">{{ vote.country.translations[$i18n.locale] }}</span>
        </span>
            <span v-else>
            &mdash;
          </span>
          </div>
          <div class="flex">
            <span v-if="vote.player">
               <Pin :id="vote.player.pin" width="32"/>
            </span>
            <span class="inline-block text-xl sm:text-2xl pl-2 pr-4">{{ vote.player.displayName }}</span>
            <span>
              <span v-if="validVote(vote)">👑</span>
              <span v-else-if="vote.distanceInKm">{{ vote.distanceInKm.toFixed(2) }}km</span>
              <span v-else>&mdash;</span>
          </span>
          </div>
        </div>
      </transition>
    </div>
  </geo-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";
import Dialog from "~/components/dialog.vue";
@Component({
  components: {Dialog}
})
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

</style>
