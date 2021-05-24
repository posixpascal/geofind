<template>
  <div>
    <nuxt-link :to="to" v-if="to">
    <button @click="$emit('click', $event)" :class="classes">
      <template v-if="$slots.icon">
        <span class="icon"><slot name="icon"></slot></span>
      </template>
      <slot></slot>
    </button>
  </nuxt-link>
    <button v-else @click="$emit('click', $event)" :class="classes">
      <template v-if="$slots.icon">
        <span class="icon"><slot name="icon"></slot></span>
      </template>
      <slot></slot>
    </button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop({default: ""}) to!: string;
  @Prop({type: String, default: ""}) variant!: string;
  @Prop({default: false, type: Boolean}) animated!: boolean;
  @Prop({default: false, type: Boolean}) loading!: boolean;
  @Prop({default: false, type: Boolean}) small!: boolean;
  @Prop({default: false, type: Boolean}) xSmall!: boolean;
  @Prop({default: false, type: Boolean}) disabled!: boolean;
  @Prop({default: false, type: Boolean}) block!: boolean;



  get classes() {
    return {
      "fancy-button": true,
      "variant-orange": this.variant === "orange",
      "variant-blue": this.variant === "blue",
      "variant-red": this.variant === "red",
      "variant-yellow": this.variant === "yellow",
      "variant-green": this.variant === "green",
      "variant-purple": this.variant === "purple",
      "variant-disabled": this.variant === "disabled" || this.disabled,
      "animated": this.animated,
      "loading": this.loading,
      "block": this.block,
      "static": !this.animated,
      "with-icon": !!this.$slots.icon,
      "small": this.small,
      "x-small": this.xSmall,
    }
  }
}
</script>
<style lang="scss">
@keyframes dancing {
  0% {
    transform: scale(1.05) rotate(2deg);
  }

  33% {
    transform: scale(1.10) rotate(-2deg);
  }

  66% {
    transform: scale(1.025) rotate(0deg);
  }

  100% {
    transform: scale(1.05) rotate(2deg);
  }
}

@keyframes shining {
  0% {
    opacity: 0;
    left: 0;
  }
  5% {
    opacity: 100;
  }
  15% {
    opacity: 0;
    left: 120%;
  }
  100% {
    opacity: 0;
    left: 120%;
  }
}

@keyframes shiningShort {
  0% {
    opacity: 1;
    left: 0;
  }
  100% {
    opacity: 1;
    left: 120%;
  }
}



.fancy-button {
  position: relative;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 20px 30px 8px;
  border-radius: 6px;
  border: none;
  font-family: 'Luckiest Guy', cursive;
  font-size: 48px;
  color: #fff;
  font-weight: 300;
  overflow: hidden;
  margin: 30px auto;
  position: relative;
  text-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 0 50px rgba(216, 216, 216, .3);

  background: linear-gradient(to top, #ccc 0%, #e1e1e1 100%);
  border-top: 4px solid rgba(122, 122, 122, .4);

  &.block {
    min-width: 100%;
  }

  &.with-icon {
    padding-left: 85px !important;
  }

  .icon {
    position: absolute;
    left: 15px;
  }

  &.variant-orange {
    background: linear-gradient(to top, #ff7a00 0%, #ff8e00 100%);
    border-top: 4px solid rgba(255, 255, 255, .3);

    &:hover {
      box-shadow: 0 0 8px #ffb319, inset 0 -3px 3px #ff7a00;
    }
  }

  &.variant-blue {
    background: linear-gradient(to top, #0F6BD7 0%, #2D9FD7 100%);
    border-top: 4px solid rgba(255, 255, 255, .4);

    &:hover {
      box-shadow: 0 0 8px #2D9FD7, inset 0 -3px 3px #0F6BD7;
    }
  }

  &.variant-green {
    background: linear-gradient(to top, #4AB63B 0%, #6BCF3F 100%);
    border-top: 4px solid rgba(255, 255, 255, .4);

    &:hover {
      box-shadow: 0 0 8px #6BCF3F, inset 0 -3px 3px #4AB63B;
    }
  }

  &.variant-yellow {
    background: linear-gradient(to top, #ffb319 0%, #ffe000 100%);
    border-top: 4px solid rgba(255, 255, 255, .4);

    &:hover {
      box-shadow: 0 0 8px #ffe000, inset 0 -3px 3px #ffb319;
    }
  }

  &.variant-purple {
    background: linear-gradient(to top, #4540b6 0%, #624bcf 100%);
    border-top: 4px solid rgba(255, 255, 255, .4);

    &:hover {
      box-shadow: 0 0 8px #624bcf, inset 0 -3px 3px #4540b6;
    }
  }


  &.variant-red {
    background: linear-gradient(to top, #9e2a1d 0%, #ea422e 100%);
    border-top: 4px solid rgba(255, 122, 122, .4);

    &:hover {
      box-shadow: 0 0 8px #ea422e, inset 0 -3px 3px #9e2a1d;
    }
  }

  &.variant-disabled {
    background: linear-gradient(to top, #ccc 0%, #e1e1e1 100%);
    border-top: 4px solid rgba(122, 122, 122, .4);
    pointer-events: none;
    opacity: 0.5;
  }


  transition: all ease-in-out 0.3s;

  &.animated:hover, &.animated:focus, &.animated:active {
    transform: scale(1.05) rotate(1deg);
    cursor: pointer;

    &:after {
      content: '';
      position: absolute;
      z-index: 40;
      width: 1px;
      top: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      background: rgba(255, 255, 255, .1);
      box-shadow: 0 0 25px 5px rgba(255, 255, 255, .6);
      animation: shining 3s infinite;
      position: absolute;
      z-index: 50;
      transition: all .2s linear;
      -webkit-backface-visibility: hidden;
    }
  }

  &.loading {
    &:after {
      content: '';
      position: absolute;
      z-index: 40;
      width: 1px;
      top: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      background: rgba(255, 255, 255, .1);
      box-shadow: 0 0 25px 5px rgba(255, 255, 255, .6);
      animation: shiningShort 1s infinite;
      position: absolute;
      z-index: 50;
      transition: all 1s linear;
      -webkit-backface-visibility: hidden;
    }
  }

  &.static:hover &.static:focus {
    transform: scale(1.05);

    &:after {
      animation: shining 3s infinite;
      content: '';
      position: absolute;
      z-index: 40;
      width: 1px;
      top: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      background: rgba(255, 255, 255, .1);
      box-shadow: 0 0 25px 5px rgba(255, 255, 255, .6);
      animation: shining 3s infinite;
      position: absolute;
      z-index: 50;
      transition: all .2s ease;
      -webkit-backface-visibility: hidden;
    }
  }

  &.small {
    font-size: 24px;
    padding-top: 14px;
    margin: 10px auto;
  }

  &.x-small {
    font-size: 20px;
    padding-top: 8px;
    margin: 5px auto;
    text-shadow: 0 2px 3px rgba(0, 0, 0, .2), 0 0 50px rgba(216, 216, 216, .1);
  }

  outline: none !important;

  &:active {
    box-shadow: none !important;
    transform: scale(0.95) !important;
  }
}

@media (max-width: 768px) {
  .fancy-button {
    padding: 10px 15px 10px;
    font-size: 28px;
    display: block;
    margin: 30px 0px;
  }

  .fancy-button.with-icon {
    padding-left: 30px !important;
  }
}
</style>
