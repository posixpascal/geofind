<template>
  <Dialog v-if="room">
    <h2>Waiting for Players...</h2>
    <div v-for="player in room.players">
      <span v-if="player.isReady">✅</span>
      <span v-else>🕐</span>
      {{ player.displayName }}
    </div>
  </Dialog>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import Dialog from "~/components/dialog.vue";

@Component({
  components: {Dialog}
})
export default class LoadingDialog extends Vue {
  @Prop() room!: any;
}
</script>
<style lang="postcss" scoped>
</style>
