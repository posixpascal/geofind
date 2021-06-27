<template>
  <div>
    <ul class="player-list">
      <li class="flex items-center justify-between" v-for="player in lobby.players">
        <div class="flex items-center">
          <Pin :id="player.pin" width="48"/>
          <div class="pl-3">
            <h3>{{ player.displayName }}</h3>
            <span class="thatsyou text-gray-400">
              <template v-if="player.id === user._id">{{ $t('t.thatsYou') }}</template>&nbsp;
            </span>
          </div>
        </div>
        <div v-if="player.id === user._id">
          <Button @click='rename = true' variant="blue" xx-small>Name ändern</Button>
        </div>
      </li>
    </ul>
    <RenameDialog @close='update' v-if="rename" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import {Prop} from "vue-property-decorator";
import RenameDialog from "~/components/rename-dialog.vue";

@Component({
  components: {RenameDialog}
})
export default class LobbyPlayers extends Vue {
  @Prop() lobby;

  rename = false;

  get user() {
    return this.$user.get();
  }

  async update(){
    await this.$store.dispatch("room/updatePlayer",{room: this.lobby, name: this.$collyseus.auth.displayName});
    this.rename = false;
  }
}
</script>
<style lang="postcss" scoped>
.player-list {

}

.player-list li {
  @apply border-dashed border-b-2 border-gray-100 py-3 px-1;
}

.player-list li h3 {
  @apply text-3xl relative;
  top: 12px;
}

.thatsyou {
  text-transform: uppercase;
  font-size: 12px;
}
</style>
<style>
.player-list img {
  position: relative;
  top: 8px;
}
</style>
