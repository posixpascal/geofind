<template>
  <div class="dialog" v-if="room">
    <h2>Game starts in...</h2>
    <h3>{{ room.gameStartsIn }}</h3>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";

@Component
export default class GameStartingDialog extends Vue {
  @Prop() room!: Room;
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

.dialog h3 {
  @apply text-center text-6xl mt-5;
}
</style>
