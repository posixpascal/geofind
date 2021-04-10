<template>
  <div class="container">
    <Logo>
      <template #before>
        <nuxt-link to="/">
          <Icon name="chevron-left"></Icon>
        </nuxt-link>
      </template>
      <template #after>
        <Icon name="cog"></Icon>
      </template>
    </Logo>

    <GameSettings v-model="settings"/>

    <Button @click="create" variant="green">
      <template #icon>🌎</template>
      Start Game
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
  room = null;
  settings = {
    mode: "countries",
    set: "earth"
  };

  get gameLink() {
    return `/play/${this.room.id}`
  }

  async create() {
    this.room = await this.$collyseus.joinOrCreate(`game_${this.settings.mode}`, {
      ...this.settings
    });

    await Room.insertOrUpdate({
      data: {
        id: this.room.id,
        name: this.room.name,
      }
    });

    await this.$store.dispatch("room/subscribe", this.room);

    this.$router.push(this.gameLink);
  }

  mounted() {
  }
}
</script>
