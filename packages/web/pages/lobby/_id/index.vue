<template>
  <div class="main-menu">
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

    <GameSettingsView :room="room"/>

    <template v-if="room">
      <h2 class="mt-5">Players</h2>
      <ul>
        <li class="player-item" v-for="player in room.players">
          <span v-if="player.isReady">✅</span>
          <span v-else>🕖</span>
          {{ player.displayName }}
        </li>
      </ul>

      <template v-if="room.isLeader(user)">
        <Button v-if="Object.values(room.players).length === 1" disabled variant="green">
          <template #icon>🕖</template>
          Waiting for players
        </Button>

        <Button v-else @click="start" variant="green">
          <template #icon>🌎</template>
          Start Game
        </Button>
      </template>

      <template v-else>
        <Button v-if="room.player(user).isReady" @click="unready" :loading="true" variant="gray">
          <template #icon>🕖</template>
          Waiting...
        </Button>

        <Button v-else @click.stop="ready" variant="green">
          <template #icon>🌎</template>
          I'm ready!
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
import {Component, Watch} from "vue-property-decorator";
import {Room} from "~/models";
import GameSettingsView from "~/components/GameSettingsView.vue";

@Component({
  components: {Button, Logo, Icon, GameSettings, GameSettingsView}
})
export default class LobbyPage extends Vue {
  loading = false;
  imReady = false;
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
      await this.$store.dispatch("room/subscribe", room);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async start() {
    await this.$store.dispatch("room/ready", this.room);
  }

  async ready() {
    await this.$store.dispatch("room/ready", this.room);
  }

  async unready() {
    await this.$store.dispatch("room/unready", this.room);
  }

  get room() {
    const roomId = this.$route.params.id;
    return Room.query().withAll().with("players").find(roomId);
  }


  get user() {
    return this.$user.get();
  }
}
</script>
<style>
.player-item {
  @apply p-3 bg-gray-200 rounded mb-2;
}
</style>
