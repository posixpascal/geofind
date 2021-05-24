<template>
  <div>
    <svg :height="height" :width="height" :style="svgStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="name === 'chevron-left'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <svg :height="height" :width="height" :style="svgStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-if="name === 'chevron-down'">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
    <svg :height="height" :width="height" :style="svgStyle" viewBox="0 0 20 20" fill="currentColor" v-if="name === 'cog'">
      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
    </svg>
    <svg :height="height" :width="height" :style="svgStyle" viewBox="0 0 24 24" fill="none" v-if="name === 'close'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    <svg :height="height" :width="height" :style="svgStyle" v-if="name === 'pen'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop({ default: "cog" }) name!:string;
  @Prop({default: 48}) height!: number;

  get svgStyle(){
    return {
      height: this.height,
    }
  }
}
</script>
<style lang="postcss" scoped>
svg {
}

svg * {
}
</style>
