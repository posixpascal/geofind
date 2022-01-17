<template>
  <div class="main-menu pt-10">
    <GameSettings v-model="settings" :excluded="excludedSettings" :excluded-games="excludedGames"/>

    <Button :loading="loading" @click="create" variant="green">
      <template #icon>
        <Icon name="teach" height="48"/>
      </template>
      {{ $t(loading ? 't.loading' : 'singleplayer.cta') }}
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

@Component({
  components: {Button, Logo, Icon, GameSettings}
})
export default class Singleplayer extends Vue {
  room: any = null;
  loading = false;

  settings = {
    mode: "countries",
    map: "earth",
    hasStrictMatches: true,
    roundTime: 15,
    maxRounds: 50,
    maxPoints: 10,
    hasBorders: true,
    hasIslands: true,
    isPublic: true,
    hasHints: true
  };

  get gameLink() {
    return `/play/${this.room.id}`
  }

  async create() {
    try {
      this.loading = true;
     // await this.$pub('tutor/create', this.settings);
    } catch (e) {

    } finally {
      this.loading = false;
    }
  }

  get excludedGames() {
    return [
      "capitals",
      "sightseeing",
      "domainhunt",
      "flags",
      "quiz",
      "speedrun",
      "shapes",
    ]
  }

  get excludedSettings() {
    return [
      'roundTime',
      'maxRounds',
      'maxPoints',
      'hasBorders',
      'isPublic'
    ]
  }

  mounted() {
  }
}
</script>
