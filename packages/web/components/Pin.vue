<template>
  <div :class="pinClasses">
    <img :src="pin" @click="$emit('click')" v-bind="$attrs" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {PINS} from "~/constants/pins";

@Component
export default class Pin extends Vue {
  @Prop({ default: 1 }) id!: number;
  @Prop({ default: false }) pinned!:boolean;
  @Prop({default: 32 }) size!:number;

  get pin(){
    return this.pinById[this.id];
  }

  get pinById(){
    return PINS;
  }

  get pinClasses(){
    const classes = [];
    if (this.pinned){
      classes.push('pinned');
    }

    return classes.join("");
  }
}
</script>
<style lang="postcss" scoped>
.pinned {
  transform: rotate(-45deg);
}
</style>
