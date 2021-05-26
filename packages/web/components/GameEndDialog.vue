<template>
  <div class="dialog" v-if="room">
    <canvas id="confetti" ref="canvas"></canvas>
    <h4 class="text-2xl sm:text-3xl pb-3">
      Game finished.
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
          <span>
            #{{ playerScore.rank }}
          </span>
          <span>{{ playerScore.player.displayName }}
            <span v-if="playerScore.rank === 1">👑</span>
          </span>
          <div class="pl-3">
            {{ playerScore.score }} <small class="text-xl">PTS</small>
          </div>
        </div>
      </transition>
    </div>

    <Button variant="green" :disabled="!room.isLeader(user)" @click="restart" small>Restart</Button>
    <small class="text-gray-400 block text-center mb-2 w-full" v-if="!room.isLeader(user)">Nur der Leader kann neustarten.</small>
    <Button variant="red" to="/" small>Close Game</Button>
  </div>
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

  restart(){
    this.$store.dispatch("room/message", {roomId: this.room.id, action: "restart"})
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }

  get playerScores() {
    console.log(Object.values(this.room.scoreboard));
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
      if (entry.score > score) {
        rank += 1
      }
    }

    return rank;
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
  top: 2px;
}

#confetti {
  @apply absolute bottom-0 h-full left-0 right-0;
}
</style>
