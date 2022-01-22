<template>
  <div class="main-menu pt-10">
    <Panel
      v-if="games.length"
      class="flex flex-col"
      v-for="game of games"
      :key="game.roomId"
    >
      <template #title>
        <div class="flex items-center w-full px-5 justify-between">
          {{ game.roomId }}
          <div class="flex items-center">
            🕹 {{ game.clients }}
            <Button
              class="hidden md:flex ml-3"
              variant="purple"
              x-small
              :to="localePath(`/lobby/${game.roomId}`)"
            >
              {{ $t('lobbies.join') }}
            </Button>
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex justify-between"></div>
        <OpenRoomSettingsView :game="game.metadata" />
        <Button variant="purple" small :to="localePath(`/lobby/${game.id}`)">
          {{ $t('lobbies.join') }}
        </Button>
      </template>
    </Panel>
    <Panel class="text-center" back="/">
      <template #title>{{ $t('lobbies.title') }}</template>
      <template #content>
        <p>{{ $t('lobbies.noRoomsFound1') }}</p>
        <p class="mt-5">{{ $t('lobbies.noRoomsFound2') }}</p>
        <Button :to="localePath('/multiplayer')" variant="purple" small>{{
          $t('multiplayer.cta')
        }}</Button>
      </template>
    </Panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import OpenRoomSettingsView from '~/components/open-room-settings-view.vue'
import Button from '~/components/button.vue'
import Box from '~/components/box.vue'
import Panel from '~/components/panel.vue'

@Component({
  components: { Box, Button, Panel, OpenRoomSettingsView },
})
export default class LobbiesPage extends Vue {
  timer = null

  games = []

  created() {
    this.fetchGames()
    this.timer = setInterval(() => {
      this.fetchGames()
    }, 3000)
  }

  async fetchGames() {
    const rooms = await this.$colyseus.getAvailableRooms('countries')
    for (const room of rooms) {
      const previousGame = this.games.findIndex(
        (game) => game.roomId === room.roomId
      )
      if (previousGame >= 0) {
        this.games[previousGame] = { ...this.games[previousGame], ...room }
        return
      }

      this.games.push(room)
    }
    console.log(this.games)
  }

  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
