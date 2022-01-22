<template>
  <div class="main-menu">
    <Loading>{{ $t('t.searchingForPlayers') }}</Loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Box from '~/components/box.vue'
import GameSettingsView from '~/components/game-settings-view.vue'
import Loading from '~/components/loading.vue'

@Component({
  components: { Box, Loading, GameSettingsView },
})
export default class Matchmaking extends Vue {
  timer = null

  created() {
    this.checkRooms()
    this.timer = setInterval(() => {
      this.checkRooms()
    }, 3000)
  }

  checkRooms() {
    this.$colyseus
      .getAvailableRooms('countries')
      .then((rooms) => {
        if (rooms.length) {
          clearInterval(this.timer)
          this.$router.push(this.localePath('/lobby/' + rooms[0].roomId))
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
</script>
<style lang="postcss">
.player-item {
  @apply p-3 bg-gray-200 rounded mb-2;
}
</style>
