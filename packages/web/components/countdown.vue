<template>
  <div class="count">
    {{ width }} ini
    <div
      :class="`fixed top-0 h-3 bg-blue-400 px-5 text-sm ${initial <= 0 || initial >= room.roundTime ? '' : 'transition-all linear duration-1000'}`"
      :style="{width: width}"
    >
  </div>
  </div>
</template>
<script lang="ts">
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import Vue from 'vue'
import { Room } from '~/models'

@Component
export default class Countdown extends Vue {
  @Prop() initial
  @Prop() room;
  
  count = null
  timer = null

  get width(){
    return `${100 * ((this.room.timer) / this.room.roundTime)}%`;
  }
}
</script>
<style scoped lang="postcss">

</style>
