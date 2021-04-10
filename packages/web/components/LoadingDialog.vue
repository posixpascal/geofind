<template>
  <div class="dialog" v-if="room">
    <h2>Waiting for Players...</h2>
    <div v-for="player in room.players">
      <span v-if="player.active">✅</span>
      <span v-else>🕐</span>
      {{ player.displayName }} ({{ player.connected }})
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class LoadingDialog extends Vue {
  @Prop() room!;
}
</script>
<style lang="postcss" scoped>
.dialog {
  @apply absolute bg-opacity-90 bg-white top-1/2 left-1/2 w-20 z-10 p-5 rounded shadow-2xl;
  @apply flex content-center justify-center bg-gray-100 bg-opacity-90 text-gray-700 flex-col;
  font-family: "Luckiest Guy";
  min-width: 400px;
  transform: translateX(-50%) translateY(-50%);
}

.dialog h2 {
  @apply text-center text-4xl pt-6;
}
</style>
