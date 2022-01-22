<template>
  <div class="main-menu pt-10">
    <Button
      :icon="true"
      :loading="loading"
      @click="create"
      small
      variant="blue"
    >
      {{ $t(loading ? 't.loading' : 'multiplayer.cta') }}
    </Button>

    <hr class="mb-10 mt-10" />

    <GameSettings
      shade="blue"
      v-model="settings"
      :excluded="excludedSettings"
      :excluded-games="excludedGames"
    />

    <Button :icon="true" :loading="loading" @click="create" variant="blue">
      {{ $t(loading ? 't.loading' : 'multiplayer.cta') }}
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/button.vue'
import Logo from '~/components/logo.vue'
import Icon from '~/components/icon.vue'
import GameSettings from '~/components/game-settings.vue'
import { Component } from 'vue-property-decorator'
import { Room } from '~/models'
import { DEFAULT_GAME_SETTINGS, GameRoom } from '~/constants/games'

@Component({
  components: { Button, Logo, Icon, GameSettings },
})
export default class Multiplayer extends Vue {
  room: Room = null
  loading = false
  settings = DEFAULT_GAME_SETTINGS

  get excludedGames(): GameRoom[] {
    return []
  }

  get excludedSettings() {
    return ['hasHints']
  }

  async create() {
    try {
      this.loading = true
      await this.$store.dispatch('room/create', this.settings)
    } catch (e) {
      console.info(e)
    } finally {
      this.loading = false
    }
  }

  mounted() {}
}
</script>
