<template>
  <div>
    <ul class="player-list">
      <li
        class="flex items-center justify-between"
        v-for="player in room.players"
        :key="player.key"
      >
        <div class="flex items-center">
          <Pin :id="player.pin" width="48" style="min-width: 48px" />
          <div class="pl-3">
            <h3>{{ player.username }}</h3>
            <span class="thatsyou text-gray-400">
              <template v-if="player.sessionId === room.sessionId">{{
                $t('lobby.thatsYou')
              }}</template
              >&nbsp;
            </span>
          </div>
        </div>
        <div v-if="player.sessionId === room.sessionId">
          <Button @click="rename = true" variant="blue" xx-small>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="margin: 0 8px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 relative -top-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

          </Button>
        </div>
        <div v-else-if="player.sessionId === room.creatorId">
          <h2>{{ $t('lobby.roomLeader') }}</h2>
        </div>
      </li>
    </ul>
    <RenameDialog
      @close="update"
      :player="room.player"
      :room="room"
      v-show="rename"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Prop } from 'vue-property-decorator'
import RenameDialog from '~/components/rename-dialog.vue'
import { Room } from '~/models'

@Component({
  components: { RenameDialog },
})
export default class LobbyPlayers extends Vue {
  @Prop() room: Room

  rename = false

  get session() {
    return this.$colyseus
  }

  async update() {
    this.rename = false
  }
}
</script>
<style lang="postcss" scoped>
.player-list {
}

.player-list li {
  @apply border-dashed border-b-2  dark:border-gray-800 border-gray-100 py-3 px-1;
}

.player-list li h3 {
  @apply text-xl sm:text-3xl relative;
  top: 12px;
}

.thatsyou {
  text-transform: uppercase;
  font-size: 12px;
}
</style>
<style>
.player-list img {
  position: relative;
  top: 8px;
}
</style>
