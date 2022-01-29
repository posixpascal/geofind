<template>
  <div>
    <ul class="player-list">
      <li
        class="flex items-center justify-between"
        v-for="player in room.players"
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
            <span class="hidden sm:inline">{{ $t('lobby.changeName') }}</span>
            <span class="inline sm:hidden">{{ $t('lobby.profile') }}</span>
          </Button>
        </div>
        <div v-else-if="player.sessionId === room.creatorId">
          <h2>{{ $t('lobby.roomLeader')}}</h2>
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
