<template>
  <div>
    <svg :height="height" :width="height" :style="svgStyle" class="relative top-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="name === 'chevron-left'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <svg :height="height" :width="height" :style="svgStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-if="name === 'chevron-down'">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
    <svg :height="height" :width="height" :style="svgStyle" viewBox="0 0 20 20" fill="currentColor" v-if="name === 'cog'">
      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
    </svg>
    <svg :attrs='$attrs' :height="height" :width="height" :style="svgStyle" viewBox="0 0 24 24" fill="none" v-if="name === 'close'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    <svg :attrs='$attrs' :height="height" :width="height" :style="svgStyle" v-if="name === 'pen'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    <svg  :style="svgStyle" v-if="name === 'controller'"  viewBox="0 0 24 24">
      <path fill="currentColor" d="M7.97,16L5,19C4.67,19.3 4.23,19.5 3.75,19.5A1.75,1.75 0 0,1 2,17.75V17.5L3,10.12C3.21,7.81 5.14,6 7.5,6H16.5C18.86,6 20.79,7.81 21,10.12L22,17.5V17.75A1.75,1.75 0 0,1 20.25,19.5C19.77,19.5 19.33,19.3 19,19L16.03,16H7.97M7,8V10H5V11H7V13H8V11H10V10H8V8H7M16.5,8A0.75,0.75 0 0,0 15.75,8.75A0.75,0.75 0 0,0 16.5,9.5A0.75,0.75 0 0,0 17.25,8.75A0.75,0.75 0 0,0 16.5,8M14.75,9.75A0.75,0.75 0 0,0 14,10.5A0.75,0.75 0 0,0 14.75,11.25A0.75,0.75 0 0,0 15.5,10.5A0.75,0.75 0 0,0 14.75,9.75M18.25,9.75A0.75,0.75 0 0,0 17.5,10.5A0.75,0.75 0 0,0 18.25,11.25A0.75,0.75 0 0,0 19,10.5A0.75,0.75 0 0,0 18.25,9.75M16.5,11.5A0.75,0.75 0 0,0 15.75,12.25A0.75,0.75 0 0,0 16.5,13A0.75,0.75 0 0,0 17.25,12.25A0.75,0.75 0 0,0 16.5,11.5Z" />
    </svg>
    <svg  :style="svgStyle" v-if="name === 'cube'"  viewBox="0 0 24 24">
      <path fill="currentColor" d="M14 8C13.45 8 13 7.55 13 7S13.45 6 14 6C14.55 6 15 6.45 15 7C15 7.55 14.55 8 14 8M12 12V19H5V12H12M12.78 10H4.22C3.55 10 3 10.55 3 11.22V19.78C3 20.45 3.55 21 4.22 21H12.78C13.45 21 14 20.45 14 19.78V11.22C14 10.55 13.45 10 12.78 10M19.78 3H11.22C10.55 3 10 3.55 10 4.22V8H12V5H19V12H16V14H19.78C20.45 14 21 13.45 21 12.78V4.22C21 3.55 20.45 3 19.78 3M17 8C16.45 8 16 7.55 16 7S16.45 6 17 6C17.55 6 18 6.45 18 7C18 7.55 17.55 8 17 8M17 11C16.45 11 16 10.55 16 10S16.45 9 17 9C17.55 9 18 9.45 18 10C18 10.55 17.55 11 17 11M7 15C6.45 15 6 14.55 6 14S6.45 13 7 13C7.55 13 8 13.45 8 14C8 14.55 7.55 15 7 15M10 18C9.45 18 9 17.55 9 17S9.45 16 10 16C10.55 16 11 16.45 11 17C11 17.55 10.55 18 10 18" />
    </svg>
    <svg :style="svgStyle" v-if="name === 'create'"  viewBox="0 0 24 24">
      <path fill='currentColor' d="M15.58,16.8L12,14.5L8.42,16.8L9.5,12.68L6.21,10L10.46,9.74L12,5.8L13.54,9.74L17.79,10L14.5,12.68M20,12C20,10.89 20.9,10 22,10V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V10C3.11,10 4,10.9 4,12A2,2 0 0,1 2,14V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V14A2,2 0 0,1 20,12Z" />
    </svg>
    <svg :style="svgStyle" v-if="name === 'settings'"  viewBox="0 0 24 24">
      <path fill='currentColor' d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
    </svg>
    <svg :style="svgStyle" v-if="name === 'public'"  viewBox="0 0 24 24">
      <path fill='currentColor' d="M19.07,4.93L17.66,6.34C19.1,7.79 20,9.79 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12C4,7.92 7.05,4.56 11,4.07V6.09C8.16,6.57 6,9.03 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12C18,10.34 17.33,8.84 16.24,7.76L14.83,9.17C15.55,9.9 16,10.9 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12C8,10.14 9.28,8.59 11,8.14V10.28C10.4,10.63 10,11.26 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12C14,11.26 13.6,10.62 13,10.28V2H12A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,9.24 20.88,6.74 19.07,4.93Z" />
    </svg>
    <svg :style="svgStyle" v-if="name === 'school'"  viewBox="0 0 24 24">
      <path fill='currentColor' d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
    </svg>
    <svg :style="svgStyle" v-if="name === 'home'"  viewBox="0 0 24 24">
      <path fill='currentColor' d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
    </svg>
    <svg :style="svgStyle" v-if="name === 'profile'"  viewBox="0 0 24 24">
      <path fill='currentColor' d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop({ default: "cog" }) name!:string;
  @Prop({default: 32}) height!: number;

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
