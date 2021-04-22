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

    <h3 class="mt-5 mb-0">Public Rooms</h3>
    <Box v-if="openRooms.length" class="flex flex-col" v-for="openRoom of openRooms" :key="openRoom.roomId">
      <div class="flex justify-between">
        <h2>{{ openRoom.roomId }}</h2>
        <div>
          🕹 {{ openRoom.clients }} / {{ openRoom.maxClients || 32 }}
        </div>
      </div>
      <OpenRoomSettingsView :room="openRoom" />
      <Button variant="purple" small @click="joinRoom(openRoom)">
        Join Room
      </Button>
    </Box>
    <Box v-if="!openRooms.length" class="text-center">
      <h4>There are no public rooms available. You can create one yourself.</h4>
      <Button to="/multiplayer" variant="blue" small>Host Game</Button>
    </Box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import {OpenRoom} from "~/models";
import OpenRoomSettingsView from "~/components/OpenRoomSettingsView.vue";
@Component({
  components: {OpenRoomSettingsView}
})
export default class LobbiesPage extends Vue {
  timer = null;

  created() {
    this.timer = setInterval(() => {
      this.$store.dispatch("room/fetchAll");
    }, 600);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }

  get openRooms() {
    return OpenRoom.all()
  }

  joinRoom(openRoom: OpenRoom){
    console.log(openRoom);
  }
}
</script>

