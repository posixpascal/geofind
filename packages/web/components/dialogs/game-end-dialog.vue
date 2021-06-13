<template>
  <geo-dialog v-if="room">
    <canvas id="confetti" ref="canvas"></canvas>
    <h4 class="text-2xl sm:text-3xl pb-3">
      {{ $t('t.gameFinished') }}
    </h4>
    <div class="text-lg sm:text-2xl">
      <transition v-for="(playerScore, index) in playerScores"
                  :key="playerScore.player.id"
                  enter-active-class="transition-all transition-fastest ease-out-quad"
                  enter-class="opacity-0 scale-70"
                  enter-to-class="opacity-100 scale-100"
                  leave-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-70"
      >
        <div class="my-3 border-b-2 border-gray-400 flex justify-between items-center">
          <div class="flex">
            <span class="inline-block pr-3">
            #{{ playerScore.rank }}
          </span>
            <span>{{ playerScore.player.displayName }}</span>
            <span v-if="playerScore.rank === 1">👑</span>
          </div>
          <div class="pl-3 flex">
            {{ playerScore.score }}&nbsp;&nbsp;<small class="text-xl">PINs</small>
          </div>
        </div>
      </transition>
    </div>

    <Button variant="green" :disabled="!room.isLeader(user)" @click="restart" small>
      {{ $t('t.restart') }}
    </Button>
    <Button variant="blue" :to="`/lobby/${room.id}`" small>{{ $t('t.toLobby') }}</Button>

    <small class="text-gray-400 block text-center mb-2 w-full"
           v-if="!room.isLeader(user)">{{ $t('t.onlyLeaderCan') }}</small>
    <Button variant="red" to="/" small>
      {{ $t('t.close') }}
    </Button>
  </geo-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";
import confetti from 'canvas-confetti';

@Component
export default class GameEndDialog extends Vue {
  @Prop() room!: Room;
  confetti = null;
  interval = null;

  created() {
    console.log(this.room);
    this.confetti = confetti.create(this.$refs.canvas, {
      resize: true,
      useWorker: true,
      disableForReducedMotion: true,
      particleCount: 150,
      spread: 80,
    });

    this.confetti();
    this.interval = setInterval(() => this.confetti(), 2000)
  }

  get user() {
    return this.$user.get();
  }

  restart() {
    this.$store.dispatch("room/message", {roomId: this.room.id, action: "restart"})
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }

  get playerScores() {
    return Object.values(this.room.scoreboard).sort((a: any, b: any) => {
      if (a.score > b.score) {
        return -1;
      }

      if (b.score > a.score) {
        return 1;
      }

      return 0
    }).map((entry: any) => {
      return {
        ...entry,
        rank: this.rankFor(entry)
      }
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
#confetti {
  @apply absolute bottom-0 h-full left-0 right-0;
}
</style>
