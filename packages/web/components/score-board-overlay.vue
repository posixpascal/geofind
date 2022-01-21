<template>
  <div>
    <div class="scroll-area" v-if="room">
      <div
        :class="`flex items-center pin mp-pin align-middle mb-1 ${
          !player.connected ? 'opacity-50 text-gray-400' : ''
        }`"
        v-for="player in sortedPlayers"
      >
        <h4>{{ room.scoreboard[player.sessionId].points || 0 }}</h4>
        <h4 class="px-2">|</h4>
        <h4 :class="`pr-3`">{{ player.username }}</h4>
        <Pin :id="player.pin" :width="pinSize" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import Vue from 'vue'
import Pin from '~/components/pin.vue'

@Component({
  components: { Pin },
})
export default class ScoreBoardOverlay extends Vue {
  @Prop() room

  get pinSize() {
    return window.innerWidth > 768 ? 32 : 24
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
      const playerAPts = this.room.scoreboard[playerA.sessionId] || 0
      const playerBPts = this.room.scoreboard[playerB.sessionId] || 0
      if (playerAPts > playerBPts) {
        return -1
      }

      if (playerBPts < playerAPts) {
        return 1
      }

      return 0
    })
  }
}
</script>
<style scoped lang="postcss">
.pin h4 {
  position: relative;
  top: -2px;
  left: 8px;
  margin: 0;
}

.scroll-area {
  max-height: 400px;
  max-width: 500px;
  width: auto;
  overflow-y: scroll;
}
</style>
<style>
@media (min-width: 768px) {
  h4 {
    font-size: 28px;
  }
  .pin {
    display: flex;
    align-content: center;
    align-items: center;
  }
  .pin img {
    position: relative;
    top: -5px;
  }
}
</style>
