<template>
  <div class="main-menu">
    <p class="text-center">The geographical multiplayer guessing game. Challenge your friends, strangers or
      yourself.</p>

    <Button to="/singleplayer" variant="green" :animated="true">
      <template #icon>🕹</template>
      Single Player
    </Button>
    <Button to="/matchmaking" variant="red" :animated="true">
      <template #icon>⚡</template>
      ️ Quick Match!
    </Button>
    <Button to="/multiplayer" variant="blue" :animated="true">
      <template #icon>🌟</template>
      Create Room
    </Button>
    <Button to="lobbies" variant="purple" :animated="true">
      <template #icon>🎮</template>
      Public Rooms
    </Button>
    <!--<Button to="teachers" variant="blue" :animated="true">
      <template #icon>👩‍🏫</template>
      Teacher Zone
    </Button>-->
    <Button to="settings" variant="yellow" :animated="true">
      <template #icon>🎨</template>
      Profile
    </Button>
    <!--
    <Button variant="orange" :animated="true">
      <template #icon>🥇</template>
      Achievements
    </Button>
    <Button variant="blue" :animated="true">
      <template #icon>⚙️</template>
      ️ Settings
    </Button>-->
    <small class="block text-center text-gray-400">
      Made with
      <span class="text-red-600">&hearts;</span>.
      <a href="//github.com/posixpascal/geofind.io" target="_blank">Open Source forever</a>.
    </small>
    <small class="block text-center text-gray-400">Imprint | Privacy | Support</small>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Button from "~/components/Button.vue";
import {User} from "~/models";

@Component({
  components: {Button}
})
export default class MainMenu extends Vue {
  get user() : User {
    return this.$user.get();
  }
}
</script>
<style lang="postcss">
.main-menu {
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-menu {
    margin: 0 20px;
  }
}

@media (min-width: 768px) {
  .main-menu {
    width: 500px;
  }
}
</style>
