<template>
  <div class="main-menu">
    <template v-if="room">
      <h2 class="mt-5">{{ $t("t.players") }}</h2>
      <ul>
        <li class="player-item" v-for="player in room.players">
          <span v-if="player.isReady">✅</span>
          <span v-else>🕖</span>
          {{ player.displayName }}
        </li>
      </ul>
      <h3 class="mt-5">{{ $t("matchmaking.waitingForPlayers") }}</h3>
      <Box>{{ $t("matchmaking.infoBox") }}</Box>
      <GameSettingsView :room="room"/>
    </template>
    <Loading v-else>{{ stateMessage }}</Loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import GameSettings from "~/components/GameSettings.vue";
import GameSettingsView from "~/components/GameSettingsView.vue";
import {Room} from "~/models";
import {Watch} from "vue-property-decorator";

@Component({
  components: {GameSettingsView, GameSettings}
})
export default class Matchmaking extends Vue {
  state = "search"
  roomId = null;

  created() {
    this.findOrCreateMatch();
  }

  beforeDestroy() {
  }

  @Watch("room")
  startGame(){
    if (this.room.mode && this.room.mode !== 'preparing'){
      this.$router.push(`/play/${this.room.id}`);
    }
  }

  get room() {
    return Room.find(this.roomId);
  }

  async findOrCreateMatch() {
    const openGames = await this.$collyseus.getAvailableRooms();
    const openMatches = openGames.filter(room => room.metadata.matchmaking === true && room.metadata.mode === 'preparing');
    if (openMatches.length) {
      this.state = "found";
      this.join(openMatches[0]);
      return;
    }

    this.state = "created";
    const room = await this.$store.dispatch('room/create', {
      mode: "countries",
      set: "earth",
      matchmaking: false,
      directMatchesOnly: true,
      roundTime: 15,
      maxRounds: 50,
      pointsNeeded: 10,
      borders: true,
      suddenDeath: true
    });
    console.log(room);
    await this.$store.dispatch("room/subscribe", room);
    this.roomId = room.id;
  }

  async join(match) {
    const room = await this.$store.dispatch('room/join', match.roomId);
    await this.$store.dispatch("room/subscribe", room);
    this.roomId = match.roomId;
    this.state = "joined";
  }

  get stateMessage() {
    switch (this.state) {
      case "search":
        return this.$t("matchmaking.searching");
      case "found":
        return this.$t("matchmaking.found");
      case "created":
        return this.$t("matchmaking.created");
    }
  }
}
</script>
<style lang="postcss">
.player-item {
  @apply p-3 bg-gray-200 rounded mb-2;
}
</style>
