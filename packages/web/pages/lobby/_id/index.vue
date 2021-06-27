<template>
  <div class="main-menu">
    <template v-if="room">
      <h1 class="text-3xl mb-5 sm:text-6xl sm:mb-3">#{{ room.id }}</h1>
      <Panel>
        <template #title>{{ $t('lobby.players') }}</template>
        <template #content>
          <LobbyPlayers :lobby="room"/>

          <Button v-if="!room.player(user).isReady" small @click.stop="ready" variant="blue">
            {{ $t('lobby.ready') }}
          </Button>

          <Button v-if="room.player(user).isReady" variant="red" x-small @click.stop="unready">
            {{ $t('lobby.notReady') }}
          </Button>

          <Button small v-if="!allReady()" :loading="true" disabled variant="blue">
            {{ $t('lobby.waiting') }}
          </Button>

          <Button v-if="room.isLeader(user) && allReady()" small v-else @click="start" :loading="true"
                  variant="blue">
            {{ $t('lobby.startGame') }}
          </Button>

          <Button v-if="!room.isLeader(user) && allReady()" small v-else disabled :loading="true"
                  variant="blue">
            {{ $t('lobby.waiting') }}
          </Button>
        </template>
      </Panel>

      <Share :link="shareLink"/>

      <GameSettingsView shade='blue' :room="room" v-if="room && !room.isLeader(user)"/>
      <GameSettings shade='blue' v-model="settings" v-if="settings && room && room.isLeader(user)"/>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from "~/components/button.vue";
import Logo from "~/components/logo.vue";
import Icon from "~/components/icon.vue";
import {Component, Watch} from "vue-property-decorator";
import {Room} from "~/models";
import Panel from "~/components/panel.vue";
import Share from "~/components/share.vue";
import LobbyPlayers from "~/components/lobby-players.vue";
import GameSettingsView from "~/components/game-settings-view.vue";
import GameSettings from "~/components/game-settings.vue";

@Component({
  components: {Share, Panel, LobbyPlayers, GameSettings, GameSettingsView}
})
export default class LobbyPage extends Vue {
  loading = false;
  imReady = false;
  editProfile = false;
  name = ""

  settings: any = false;

  get shareLink() {
    return window.location.href;
  }

  @Watch('settings', {deep: true})
  updateSettings(newSettings) {
    if (!this.settings) {
      return;
    }

    if (!this.room) {
      return;
    }

    if (!this.room.isLeader(this.user)) {
      return;
    }

    this.$store.dispatch('room/updateSettings', {room: this.room, settings: newSettings});
  }


  async created() {
    this.loading = true;
    const roomId = this.$route.params.id;

    if (this.room) {
      this.syncSettings();

      this.loading = false;
      if (this.room.isLeader(this.user)) {
        await this.$store.dispatch("room/ready", this.room);
      }
      // this.$store.dispatch("room/message", {roomId, action: "ready", payload: {}})
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

  async saveProfile() {
    this.editProfile = false;
    await this.$store.dispatch("room/updatePlayer", this.room);
    window.location.reload();
  }

  leave() {
    this.$store.dispatch("room/leave", this.$route.params.id);
    this.$router.push(`/`)
  }

  async start() {
    await this.$store.dispatch("room/start", this.room);
  }

  async ready() {
    await this.$store.dispatch("room/ready", this.room);
  }

  async unready() {
    await this.$store.dispatch("room/unready", this.room);
  }

  @Watch("room")
  startGame() {
    this.syncSettings();

    if (this.room.mode && this.room.mode !== 'preparing' && this.room.mode !== 'ended') {
      this.$router.push(`/play/${this.room.id}`);
    }
  }

  syncSettings() {
    this.settings = {
      mode: this.room.gameMode,
      set: this.room.mapSet,
      directMatchesOnly: this.room.directMatchesOnly,
      roundTime: this.room.roundTime,
      maxRounds: this.room.maxRounds,
      pointsNeeded: this.room.pointsNeeded,
      borders: this.room.borders,
      suddenDeath: this.room.suddenDeath,
      public: this.room.public,
    }
  }

  get room() {
    const roomId = this.$route.params.id;
    return Room.query().withAll().with("players").find(roomId);
  }

  allReady() {
    let allReady = true;
    for (const player in this.room.players) {
      if (!this.room.players.hasOwnProperty(player)) {
        continue;
      }

      if (!this.room.players[player].isReady && this.user._id !== player) {
        allReady = false;
      }
    }

    return allReady;
  }


  get user() {
    return this.$user.get();
  }

  async setPin($event) {
    await this.$store.dispatch("user/setPin", $event);
  }

  async setName($event) {
    await this.$store.dispatch("user/setName", this.name);
  }
}
</script>
<style lang="postcss">
.player-item {
  @apply p-3 bg-gray-200 rounded mb-2;
}

.dialog-p {
  @apply z-20 fixed p-5 top-1/2 left-1/2 pb-10 shadow-2xl bg-white rounded bg-gray-200 flex w-3/4;
  height: 520px;
  overflow: auto;

  transform: translateX(-50%) translateY(-50%);
}

.dialog-backdrop {
  content: "";
  background: rgba(0, 0, 0, .3);
  position: fixed;
  @apply top-0 left-0 right-0 bottom-0 w-full h-full;
}
</style>
