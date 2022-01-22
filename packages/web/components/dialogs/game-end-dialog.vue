<template>
  <Dialog>
    <canvas id="confetti" ref="canvas"></canvas>
    <h4 class="text-2xl sm:text-3xl pb-3">
      {{ $t('t.gameFinished') }}
    </h4>

    <h2 class="text-center" v-if="winner">
      👑 {{ winner.username }}
      <span v-if="winnerPoints">| {{ winnerPoints }}</span>
    </h2>

    <Button
      variant="green"
      :disabled="room.creatorId !== room.player.sessionId"
      @click="restart"
      small
    >
      {{ $t('t.restart') }}
    </Button>
    <Button
      variant="blue"
      @click="lobby"
      :disabled="room.creatorId !== room.player.sessionId"
      small
      >{{ $t('t.toLobby') }}</Button
    >

    <small class="text-gray-400 block text-center mb-2 w-full">{{
      $t('t.onlyLeaderCan')
    }}</small>
    <Button variant="red" to="/" small> Startseite </Button>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Room } from '~/models'
import confetti from 'canvas-confetti'

@Component
export default class GameEndDialog extends Vue {
  @Prop() room!: Room
  confetti = null
  interval = null
  winner = null
  winnerPoints = null

  created() {
    this.confetti = confetti.create(this.$refs.canvas, {
      resize: true,
      useWorker: true,
      disableForReducedMotion: true,
      particleCount: 150,
      spread: 80,
    })

    this.confetti()
    this.interval = setInterval(() => this.confetti(), 2000)
    this.winner = this.sortedPlayers[0]
    if (this.winner) {
      this.winnerPoints = this.room.scoreboard[this.winner.sessionId].points
    }
  }

  get sortedPlayers() {
    if (!this.room.players) {
      return []
    }

    const players = Object.values(this.room.players)
    return players.sort((playerA: any, playerB: any) => {
      if (!playerA?.sessionId || !playerB?.sessionId) {
        return 0
      }
      const playerAPts = this.room.scoreboard[playerA.sessionId].points || 0
      const playerBPts = this.room.scoreboard[playerB.sessionId].points || 0
      if (playerAPts > playerBPts) {
        return -1
      }

      if (playerBPts > playerAPts) {
        return 1
      }

      return 0
    })
  }

  get user() {
    return this.$auth.user
  }

  restart() {
    this.$store.dispatch('room/message', {
      room: this.room,
      type: 'room/restart',
    })
  }

  lobby() {
    this.$store.dispatch('room/message', {
      room: this.room,
      type: 'room/lobby',
    })
  }

  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
<style lang="postcss" scoped>
#confetti {
  @apply absolute bottom-0 h-full left-0 right-0;
  pointer-events: none;
}
</style>
