<template>
  <transition name="fade">
    <div class="dialog-backdrop pt-10 mb-10 overflow-auto" v-if="show">
      <transition :duration="1000" name="slide">
        <div class="dialog">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script lang="ts">
import {Component, Prop} from "vue-property-decorator";
import Vue from 'vue';

@Component
export default class Dialog extends Vue {
  @Prop({default: true}) show;
}
</script>
<style lang="postcss">
.dialog-backdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 52;
  transform: translate3d(0,0, 10px);
  background: rgba(0, 0, 0, .7);
}

.dialog-backdrop > div {
  width: 100%;
  max-width: 600px;
}

.dialog {
  @apply absolute bg-opacity-90 bg-white left-1/2 w-20 z-10 p-5 rounded shadow-2xl lg:mt-20;
  @apply flex content-center justify-center bg-gray-100 bg-opacity-90 text-gray-700 flex-col;
  font-family: "Luckiest Guy";
  top: 20px;
  width: 90%;
  max-width: 750px;
  transform: translateX(-50%);
}

.dialog h2 {
  @apply text-center text-4xl pt-6;
}

.dialog h3 {
  @apply text-center text-3xl mt-5;
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
