<template>
  <div class="flex flex-wrap justify-between">
    <div v-for="pin in pins" :key="pin">
      <div :class="`pin-wrapper ${pinSelected(pin) ? 'active' : ''}`">
        <Pin @click="selectPin(pin)" :id="pin" width="96" height="96" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Pin from '~/components/pin.vue'
import {PINS} from "~/constants/pins";

@Component({
  components: { Pin },
})
export default class PinSelection extends Vue {
  @Prop() initial!: number
  selectedPin = null

  created() {
    this.selectedPin = parseInt(localStorage.getItem('pin')) || (Math.floor((Object.keys(PINS).length  - 1 )* Math.random()) + 1)
  }

  pinSelected(p) {
    return p === this.selectedPin
  }

  selectPin(p) {
    this.selectedPin = p
    this.$emit('change', { pin: p })
  }

  pins = Array.from({ length: 32 }).map((_, i) => i + 1)
}
</script>
<style lang="postcss" scoped>
.pin-wrapper {
  @apply text-center flex items-center p-2 m-1 sm:p-5 sm:m-2 cursor-pointer;
}

.pin-wrapper img {
  position: relative;
  left: 1px;
}

.pin-wrapper.active {
  @apply bg-white  rounded-xl shadow-sm dark:bg-gray-600;
}
</style>
