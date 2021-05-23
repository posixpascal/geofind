<template>
  <div class="flex flex-wrap">

    <div v-for="pin in pins" :key="pin">
      <div :class="`pin-wrapper ${pinSelected(pin) ? 'active' : ''}`">
        <Pin @click="selectPin(pin)" :id="pin" width="96" height="96"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class PinSelection extends Vue {
  @Prop() initial!: number;
  selectedPin = null;

  created(){
    this.selectedPin = this.initial;
  }

  pinSelected(p){
    return p === this.selectedPin;
  }

  selectPin(p){
    this.selectedPin = p;
    this.$emit("change", p);
  }

  pins = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ]
}
</script>
<style lang="postcss" scoped>
.pin-wrapper {
  @apply text-center flex justify-center items-center p-5 m-2 cursor-pointer;
}

.pin-wrapper.active {
  @apply bg-gray-200 rounded;
}
</style>
