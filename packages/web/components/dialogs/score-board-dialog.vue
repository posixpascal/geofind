<template>
  <Dialog v-if="room">
    <h4 class="text-2xl sm:text-3xl  pb-3">
      {{ $t("t.round") }} #{{ room.round }} {{ $t('t.of') }} {{ room.maxRounds }}
    </h4>
    <div class="text-2xl sm:text-3xl">
      <transition v-for="(playerScore, index) in playerScores"
                  :key="playerScore.player.id"
                  enter-active-class="transition-all transition-fastest ease-out-quad"
                  enter-class="opacity-0 scale-70"
                  enter-to-class="opacity-100 scale-100"
                  leave-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-70"
      >
        <div class="my-3 border-b-2 border-gray-400 flex justify-between items-center">
          <span class="text-xl sm:text-2xl flex">
            <span v-if="playerScore.player">
               <Pin :id="playerScore.player.pin" width="32"/>
            </span>
            {{ playerScore.player.displayName }}
          </span>
          <div class="pl-3 flex">
            {{ playerScore.score }}&nbsp;&nbsp;<small class="hidden sm:inline-block text-sm">PINs</small>
            <span v-if="playerScore.rank === 1">⭐</span>
          </div>
        </div>
      </transition>
    </div>
  </Dialog>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";
import Dialog from "~/components/dialog.vue";

@Component({components: {Dialog}})
export default class ScoreBoardDialog extends Vue {
  @Prop() room!: Room;

  created() {
    console.log(this.room);
  }

  get playerScores() {
    return Object.values(this.room.scoreboard).map((entry: any) => {
      return {
        ...entry,
        rank: this.rankFor(entry)
      }
    }).sort((a: any, b: any) => {
      if (a.rank > b.rank) {
        return 1;
      }

      if (b.rank > a.rank) {
        return -1;
      }

      return 0
    });
  }

  rankFor(entry) {
    const allScores = Object.values(this.room.scoreboard).map(s => (s as any).score);
    let rank = 1;

    for (const score of allScores) {
      if (entry.score < score) {
        rank += 1
      }
    }

    return rank;
  }
}
</script>
<style lang="postcss" scoped>
</style>
