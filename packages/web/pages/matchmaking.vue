<template>
  <div class="main-menu">
    <Logo>
      <template #before>
        <nuxt-link to="/">
          <Icon name="chevron-left"></Icon>
        </nuxt-link>
      </template>
      <template #after>
        <span style="width: 40px;"></span>
      </template>
    </Logo>

    <template v-if="room">
      <GameSettingsView :room="room" />
      <h2 class="mt-10">
        #{{ roomId }}
      </h2>
      <h2 class="mt-5">Players</h2>
      <ul>
        <li class="player-item" v-for="player in room.players">
          <span v-if="player.isReady">✅</span>
          <span v-else>🕖</span>
          {{ player.displayName }}
        </li>
      </ul>
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
@Component({
  components: {GameSettingsView, GameSettings}
})
export default class Matchmaking extends Vue {
  state = "search"
  roomId = null;

  created(){
    this.findOrCreateMatch();
  }

  beforeDestroy(){
    if (this.roomId){
      this.$store.dispatch("room/leave", this.roomId);
    }
  }

  get room(){
    return Room.find(this.roomId);
  }

  async findOrCreateMatch(){
    const openGames = await this.$collyseus.getAvailableRooms();
    const openMatches = openGames.filter(room => room.metadata.matchmaking === true);
    if (openMatches.length){
      this.state = "found";
      this.join(openMatches[0]);
      console.log(openMatches[0]);
      return;
    }

    this.state = "created";
    const room = await this.$store.dispatch('room/create', {
      mode: "countries",
      set: "earth",
      matchmaking: true
    });
    console.log(room);
    await this.$store.dispatch("room/subscribe", room);
    this.roomId = room.id;
  }

  async join(match){
    const room = await this.$store.dispatch('room/join', match.roomId);
    await this.$store.dispatch("room/subscribe", room);
    this.roomId = match.roomId;
    this.state = "joined";
  }

  get stateMessage(){
    switch (this.state){
      case "search":
        return "Looking for a Match";
        case "found":
          return "Found Match..."
      case "created":
        return "Creating Match...";
    }
  }
}
</script>

