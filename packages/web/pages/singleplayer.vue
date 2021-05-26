<template>
  <div class="main-menu">
    <Logo>
      <template #before>
        <nuxt-link :to="localePath('/')">
          <Icon name="chevron-left"></Icon>
        </nuxt-link>
      </template>
      <template #after>
      </template>
    </Logo>
    <h1 class="mt-5 mb-0">{{ $t('singleplayer.title') }}</h1>

    <GameSettings v-model="settings"/>

    <Button :loading="loading" @click="create" variant="green">
      <template #icon>🌎</template>
      {{ $t(loading ? 't.loading' : 'singleplayer.cta') }}
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from "~/components/Button.vue";
import Logo from "~/components/Logo.vue";
import Icon from "~/components/Icon.vue";
import GameSettings from "~/components/GameSettings.vue";
import {Component} from "vue-property-decorator";
import {Room} from "~/models";

@Component({
  components: {Button, Logo, Icon, GameSettings}
})
export default class Singleplayer extends Vue {
  room : any = null;
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
    singleplayer: true,
  };

  get gameLink() {
    return `/play/${this.room.id}`
  }

  async create() {
    try {
      this.loading = true;

      this.room = await this.$store.dispatch('room/create', this.settings);
      await this.$store.dispatch("room/subscribe", this.room);

      this.$router.push(this.gameLink);
    } catch (e){
    } finally {
      this.loading = false;
    }
  }

  mounted() {
  }
}
</script>
