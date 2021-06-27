<template>
  <div class="dialog">
   <slot></slot>
  </div>
</template>
<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from 'vue';

@Component
export default class Dialog extends Vue {

}
</script>
<style lang="postcss">
.dialog {
  @apply absolute bg-opacity-90 bg-white left-1/2 w-20 z-10 p-5 rounded shadow-2xl lg:mt-20;
  @apply flex content-center justify-center bg-gray-100 bg-opacity-90 text-gray-700 flex-col;
  font-family: "Luckiest Guy";
  top: 80px;
  width: 90%;
  max-width: 750px;
  transform: translateX(-50%);
}

.dialog h2 {
  @apply text-center text-4xl pt-6;
}

.dialog h3 {
  @apply text-center text-5xl mt-5;
}

.dialog .flag {
  width: 72px;
  position: relative;
  top: 9px;
}

.dialog .mini-flag {
  position: relative;
  top: 0px;
}
</style>
