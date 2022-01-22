<template>
  <div class="count">
    <h1 :class="[room && room.timer <= 1 ? 'text-3xl text-black' : (room && room.timer <= 2) ? 'text-2xl text-gray-900' : (room && room.timer <= 3) ? 'text-xl text-gray' : 'd']">{{ count && count > 0 ? count : '' }}</h1>
  </div>
</template>
<script lang="ts">
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import Vue from 'vue'
import {Room} from "~/models";

@Component
export default class Countdown extends Vue {
  @Prop() initial
  @Prop() room: Room;

  count = null
  timer = null

  mounted() {
    this.count = this.initial
    this.timer = setInterval(() => {
      this.count -= 1
    }, 1000)
  }

  beforeDestroy() {
    return clearInterval(this.timer)
  }
}
</script>
<style scoped lang="postcss">
.count h1.d {
  font-size: 48px;
}

h1 {
  opacity: 0.5;
  margin: 0;
  padding: 0;
}

.count h1 {
  position: fixed;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  pointer-events: none;
}
.count h1.text-xl { font-size: 122px !important; opacity: 0.3 !important;}
.count h1.text-2xl { font-size: 144px !important; opacity: 0.4 !important;}
.count h1.text-3xl { font-size: 144px !important; opacity: 0.6 !important;}

</style>
