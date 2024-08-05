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
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: '' }) to!: string
  @Prop({ type: String, default: '' }) variant!: string
  @Prop({ default: false, type: Boolean }) animated!: boolean
  @Prop({ default: false, type: Boolean }) loading!: boolean
  @Prop({ default: false, type: Boolean }) small!: boolean
  @Prop({ default: false, type: Boolean }) icon!: boolean
  @Prop({ default: false, type: Boolean }) xSmall!: boolean
  @Prop({ default: false, type: Boolean }) xxSmall!: boolean
  @Prop({ default: false, type: Boolean }) disabled!: boolean
  @Prop({ default: false, type: Boolean }) block!: boolean

  get classes() {
    return {
      'fancy-button': true,
      'variant-orange': this.variant === 'orange',
      'variant-blue': this.variant === 'blue',
      'variant-red': this.variant === 'red',
      'variant-yellow': this.variant === 'yellow',
      'variant-green': this.variant === 'green',
      'variant-purple': this.variant === 'purple',
      'variant-disabled': this.variant === 'disabled' || this.disabled,
      animated: this.animated,
      loading: this.loading,
      block: this.block,
      static: !this.animated,
      'with-icon': !!this.icon,
      small: this.small,
      'x-small': this.xSmall,
      'xx-small': this.xxSmall,
    }
  }
}
</script>
<style lang="postcss">
@keyframes dancing {
  0% {
    transform: scale(1.05) rotate(2deg);
  }

  33% {
    transform: scale(1.1) rotate(-2deg);
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
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 0 50px rgba(216, 216, 216, 0.3);
  transition: all ease-in-out 0.3s;

  background: linear-gradient(to top, #ccc 0%, #e1e1e1 100%);
  border-top: 4px solid rgba(122, 122, 122, 0.4);
}

.fancy-button.block {
  min-width: 100%;
}

.fancy-button.with-icon {
  padding-left: 85px !important;
}

.fancy-button .icon {
  position: absolute;
  left: 15px;
}

.fancy-button.variant-orange {
  background: linear-gradient(to top, #ff7a00 0%, #ff8e00 100%);
  border-top: 4px solid rgba(255, 255, 255, 0.3);
}

.fancy-button.variant-orange:hover {
  box-shadow: 0 0 8px #ffb319, inset 0 -3px 3px #ff7a00;
}

.fancy-button.variant-blue {
  background: linear-gradient(to top, #0f6bd7 0%, #2d9fd7 100%);
  border-top: 4px solid rgba(255, 255, 255, 0.4);
}

.fancy-button.variant-blue:hover {
  box-shadow: 0 0 8px #2d9fd7, inset 0 -3px 3px #0f6bd7;
}

.fancy-button.variant-green {
  background: linear-gradient(to top, #4ab63b 0%, #6bcf3f 100%);
  border-top: 4px solid rgba(255, 255, 255, 0.4);
}

.fancy-button.variant-green:hover {
  box-shadow: 0 0 8px #6bcf3f, inset 0 -3px 3px #4ab63b;
}

.fancy-button.variant-yellow {
  background: linear-gradient(to top, #ffb319 0%, #ffe000 100%);
  border-top: 4px solid rgba(255, 255, 255, 0.4);
}

.fancy-button.variant-yellow:hover {
  box-shadow: 0 0 8px #ffe000, inset 0 -3px 3px #ffb319;
}

.fancy-button.variant-purple {
  background: linear-gradient(to top, #4540b6 0%, #624bcf 100%);
  border-top: 4px solid rgba(255, 255, 255, 0.4);
}

.fancy-button.variant-purple:hover {
  box-shadow: 0 0 8px #624bcf, inset 0 -3px 3px #4540b6;
}

.fancy-button.variant-red {
  background: linear-gradient(to top, #9e2a1d 0%, #ea422e 100%);
  border-top: 4px solid rgba(255, 122, 122, 0.4);
}

.fancy-button.variant-red:hover {
  box-shadow: 0 0 8px #ea422e, inset 0 -3px 3px #9e2a1d;
}

.fancy-button.variant-disabled {
  background: linear-gradient(to top, #ccc 0%, #e1e1e1 100%);
  border-top: 4px solid rgba(122, 122, 122, 0.4);
  pointer-events: none;
  opacity: 0.5;
}

.fancy-button.animated:hover,
.fancy-button.animated:focus,
.fancy-button.animated:active {
  transform: scale(1.05) rotate(1deg);
  cursor: pointer;
}

.fancy-button.animated:hover:after,
.fancy-button.animated:focus:after,
.fancy-button.animated:active:after {
  content: '';
  position: absolute;
  z-index: 40;
  width: 1px;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.6);
  animation: shining 3s infinite;
  position: absolute;
  z-index: 50;
  transition: all 0.2s linear;
  -webkit-backface-visibility: hidden;
}

.fancy-button.loading:hover:after,
.fancy-button.loading:focus:after,
.fancy-button.loading:active:after {
  content: '';
  position: absolute;
  z-index: 40;
  width: 1px;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.6);
  animation: shiningShort 1s infinite;
  position: absolute;
  z-index: 50;
  transition: all 1s linear;
  -webkit-backface-visibility: hidden;
}

.fancy-button.static:hover,
.fancy-button.static:focus {
  transform: scale(1.05);
}

.fancy-button.static:hover:after,
.fancy-button.static:focus:after {
  animation: shining 3s infinite;
  content: '';
  position: absolute;
  z-index: 40;
  width: 1px;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.6);
  animation: shining 3s infinite;
  position: absolute;
  z-index: 50;
  transition: all 0.2s ease;
  -webkit-backface-visibility: hidden;
}

.fancy-button.small,
.fancy-button.small:hover,
.fancy-button.small:focus {
  font-size: 24px !important;
  padding-top: 14px !important;
  padding-bottom: 14px !important;
  margin: 10px auto !important;
}

.fancy-button.x-small,
.fancy-button.x-small:hover,
.fancy-button.x-small:focus {
  font-size: 20px;
  padding-top: 8px;
  margin: 5px auto;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 0 50px rgba(216, 216, 216, 0.1);
}

.fancy-button {
  outline: none !important;
}

.fancy-button:active {
  box-shadow: none !important;
  transform: scale(0.95) !important;
}

.fancy-button.xx-small,
.fancy-button.xx-small:hover,
.fancy-button.xx-small:focus {
  @apply p-2 sm:pt-2.5;
  font-size: 17px !important;
  margin: 3px auto !important;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 0 50px rgba(216, 216, 216, 0.1) !important;
}


.fancy-button svg {
  width: 170px !important;
  position: relative;
  top: -50px;
  transform: rotate(-12.5deg);
  left: -25px;
  mix-blend-mode: plus-lighter;
  opacity: 0.1;
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

  .fancy-button svg {
    width: 100px !important;
    top: -25px !important;
    position: relative;

  }
}
</style>
