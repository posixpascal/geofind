<template>
  <div
    :class="[
      room.hasBorders ? '' : 'text-white',
      !interactive ? 'pointer-events-none' : '',
      position,
    ]"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Overlay extends Vue {
  @Prop() position
  @Prop() room;
  @Prop() interactive
  @Prop({ type: String }) animation
}
</script>
<style lang="postcss">
.overlay {
}
.topcenter {
  text-align: center;
  width: auto;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 40px;
}

.bottomcenter {
  text-align: center;
  width: auto;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
}

.topleft {
  position: absolute;
  top: 20px;
  left: 20px;
  text-align: center;
  width: auto;
  display: flex;
  justify-content: center;
}

.topright {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
  width: auto;
  display: flex;
  justify-content: center;
}

.bottomleft {
  position: absolute;
  top: 100px;
  left: 20px;
  height: calc(100% - 100px - 20px);
  text-align: left;
  width: auto;
  display: flex;
  align-items: flex-end;
}

.bottomright {
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-align: center;
  width: auto;
  display: flex;
  justify-content: center;
}
</style>
