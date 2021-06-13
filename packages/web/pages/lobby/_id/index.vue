<template>
  <div class="main-menu">
    <geo-logo>
      <template #before>
        <div @click="leave()">
          <Icon name="chevron-left"></Icon>
        </div>
      </template>
      <template #after>
        <span style="width: 40px;"></span>

      </template>
    </geo-logo>


    <template v-if="room">
      <h1 class="text-2xl sm:text-3xl">#{{ room.id }}</h1>
      <h2 class="mt-5">{{ $t('lobby.players')}}</h2>
      <ul>
        <li class="player-item flex justify-between" v-for="player in room.players">
          <span v-if="player.isReady">✅</span>
          <span v-else>🕖</span>
          <div class="flex">
            <span class="pl-3">{{ player.displayName }}</span>
            <geo-pin :id="player.pin" width="24"/>
          </div>
          <span @click="editProfile = true">
            <geo-icon name="pen" height="20" v-if="player.id === user._id"/>
          </span>
        </li>
      </ul>

      <template v-if="room.isLeader(user)">
        <geo-button v-if="!room.player(user).isReady" small @click.stop="ready" variant="blue">
          <template #icon>🌎</template>
          {{ $t('lobby.ready') }}
        </geo-button>

        <geo-button v-if="room.player(user).isReady" variant="red" small @click.stop="unready">
          <template #icon><span>&nbsp;</span></template>
          {{ $t('lobby.notReady') }}
        </geo-button>

        <geo-button small v-if="!allReady()" :loading="true" disabled variant="blue">
          <template #icon>🕖</template>
          {{ $t('lobby.waiting')}}
        </geo-button>

        <geo-button small v-else @click="start" :loading="true" variant="blue">
          <template #icon>🌎</template>
          {{ $t('lobby.startGame')}}
        </geo-button>
      </template>

      <template v-else>
        <geo-button variant="red" small v-if="room.player(user).isReady" @click="unready">
          <template #icon>🕖</template>
          {{ $t('lobby.notReady') }}
        </geo-button>

        <geo-button small v-else @click.stop="ready" variant="blue">
          <template #icon>🌎</template>
          {{ $t('lobby.ready') }}
        </geo-button>
      </template>
    </template>

    <geo-share :link="shareLink" />

    <geo-game-settings-view  shade='blue' :room="room" v-if="room && !room.isLeader(user)"/>
    <geo-game-settings shade='blue' v-model="settings" v-if="settings && room && room.isLeader(user)"/>

    <div class='dialog-backdrop' v-if="editProfile">
      <div class="dialog-p flex-col">
        <h2 class="flex justify-between items-center">
          Profil
          <geo-button x-small @click="saveProfile()" variant="yellow">
            Speichern
          </geo-button>
        </h2>
        <h3 class="mt-10">Name</h3>
        <Box class="flex items-center justify-between">
          <geo-input class="w-full" v-model="name" @change="setName()" :placeholder="user.displayName"/>
        </Box>

        <h3>Marker</h3>
        <Box>
          <geo-pin-selection :initial="user.metadata.pin" @change="setPin"/>
        </Box>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from "~/components/button.vue";
import Logo from "~/components/logo.vue";
import Icon from "~/components/icon.vue";
import {Component, Watch} from "vue-property-decorator";
import {Room} from "~/models";

@Component
export default class LobbyPage extends Vue {
  loading = false;
  imReady = false;
  editProfile = false;
  name = ""

  settings : any = false;

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
