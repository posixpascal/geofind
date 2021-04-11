<template>
  <div class="container">
    <Logo>
      <template #before>
        <nuxt-link to="/">
          <Icon name="chevron-left"></Icon>
        </nuxt-link>
      </template>
      <template #after>
        <Icon name="cog"></Icon>
      </template>
    </Logo>

    <GameSettingsView :room="room" />

    <template v-if="room">
      <h2 class="mt-5">Players</h2>
      <ul>
        <li class="player-item" v-for="player in room.players">
          {{ player.displayName }}
        </li>
      </ul>


      <template v-if="Object.values(room.players).length === 1">
        <Button @click="create" disabled variant="green">
          <template #icon>🕖</template>
          Waiting for players
        </Button>
      </template>

      <template v-else>
        <Button @click="create" variant="green">
          <template #icon>🌎</template>
          Start Game
        </Button>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from "~/components/Button.vue";
import Logo from "~/components/Logo.vue";
import Icon from "~/components/Icon.vue";
import GameSettings from "~/components/GameSettings.vue";
import {Component} from "vue-property-decorator";
import {Room} from "~/models";
import GameSettingsView from "~/components/GameSettingsView.vue";

@Component({
  components: {Button, Logo, Icon, GameSettings, GameSettingsView}
})
export default class LobbyPage extends Vue {
  settings = {
    mode: "countries",
    set: "earth"
  };

  async created() {
    this.loading = true;
    const roomId = this.$route.params.id;

    if (this.room) {
      this.loading = false;
      this.$store.dispatch("room/message", {roomId, action: "ready", payload: {}})
      return;
    }

    // Possible reconnect.
    try {
      const room = await this.$store.dispatch("room/join", roomId);
      console.log(this.room);
      await this.$store.dispatch("room/subscribe", room);

    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  get room() {
    const roomId = this.$route.params.id;
    return Room.query().find(roomId);
  }
}
</script>
<style>
.player-item {
  @apply p-3 bg-gray-200 rounded mb-2;
}
</style>
