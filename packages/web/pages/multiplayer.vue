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

    <GameSettings shade="blue" v-model="settings"/>

    <Button @click="create" variant="blue">
      <template #icon>🌎</template>
      Host Game
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
export default class Multiplayer extends Vue {
  room : any = null;
  settings = {
    mode: "countries",
    set: "earth"
  };

  get gameLink() {
    return `/lobby/${this.room.id}`
  }

  async create() {
    this.room = await this.$store.dispatch('room/create', this.settings);
    await this.$store.dispatch("room/subscribe", this.room);

    this.$router.push(this.gameLink);
  }

  mounted() {
  }
}
</script>
