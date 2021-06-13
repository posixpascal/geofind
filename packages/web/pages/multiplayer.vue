<template>
  <div class="main-menu">
    <geo-game-settings shade="blue" v-model="settings"/>

    <Button :icon='true' :loading="loading" @click="create" variant="blue">
      <template #icon>🌎</template>
      {{ $t(loading ? 't.loading' : 'multiplayer.cta') }}
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from "~/components/button.vue";
import Logo from "~/components/logo.vue";
import Icon from "~/components/icon.vue";
import GameSettings from "~/components/game-settings.vue";
import {Component} from "vue-property-decorator";
import {Room} from "~/models";

@Component({
  components: {Button, Logo, Icon, GameSettings}
})
export default class Multiplayer extends Vue {
  room: any = null;
  loading = false;

  settings = {
    mode: "countries",
    set: "earth",
    directMatchesOnly: true,
    roundTime: 15,
    maxRounds: 50,
    pointsNeeded: 10,
    borders: true,
    suddenDeath: true,
    islands: true,
    public: true
  };

  get gameLink() {
    return `/lobby/${this.room.id}`
  }

  async create() {
    try {
      this.loading = true;
      this.room = await this.$store.dispatch('room/create', this.settings);
      await this.$store.dispatch("room/subscribe", this.room);

      this.$router.push(this.gameLink);
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }

  mounted() {
  }
}
</script>
