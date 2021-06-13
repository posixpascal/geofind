<template>
  <div class="main-menu">
    <Box v-if="openRooms.length" class="flex flex-col" v-for="openRoom of openRooms" :key="openRoom.roomId">
      <div class="flex justify-between">
        <h2>#{{ openRoom.roomId }}</h2>
        <div>
          🕹 {{ openRoom.clients }} / {{ openRoom.maxClients || 32 }}
        </div>
      </div>
      <geo-open-room-settings-view :room="openRoom" />
      <Button variant="purple" small :to="`/lobby/${openRoom.roomId}`">
        {{ $t('lobbies.join') }}
      </Button>
    </Box>
    <Box v-if="!openRooms.length" class="text-center">
      <h4>{{ $t('lobbies.noRoomsFound') }}</h4>
      <Button to="/multiplayer" variant="purple" small>{{ $t('multiplayer.cta') }}</Button>
    </Box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import {OpenRoom} from "~/models";
@Component
export default class LobbiesPage extends Vue {
  timer = null;

  created() {
    this.timer = setInterval(() => {
      this.$store.dispatch("room/fetchAll");
    }, 700);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }

  get openRooms() {
    return OpenRoom.all()
  }

  async joinRoom(openRoom: OpenRoom){
    console.log(openRoom);
    const route = await this.$router.push(`/lobby/${openRoom.roomId}`);
    console.log(route);
  }
}
</script>

