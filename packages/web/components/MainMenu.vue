<template>
  <div style="width: 500px; margin: 0 auto">
    <Button to="/singleplayer" variant="green" :animated="true">
      <template #icon>🕹</template>
      Single Player
    </Button>
    <Button to="play/matchmaking" variant="red" :animated="true">
      <template #icon>⚡</template>
      ️ Quick Match!
    </Button>
    <Button to="play/multiplayer" variant="purple" :animated="true">
      <template #icon>🌟</template>
      Create Room
    </Button>
    <Button to="teachers" variant="blue" :animated="true">
      <template #icon>👩‍🏫</template>
      Teacher Zone
    </Button>
    <Button to="settings" variant="yellow" :animated="true">
      <template #icon>🎨</template>
      Look & Feel
    </Button>
    <!--<Button variant="green" :animated="true">
      <template #icon>🥇</template>
      Achievements
    </Button>
    <Button variant="blue" :animated="true">
      <template #icon>⚙️</template>
      ️ Settings
    </Button>-->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Button from "~/components/Button.vue";

@Component({
  components: {Button}
})
export default class MainMenu extends Vue {
}
</script>
