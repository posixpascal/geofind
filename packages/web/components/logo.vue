<template>
  <div class="flex justify-start">
    <div class="icon">
      <slot name="before">
        <div v-html="require('~/assets/images/logo.svg?raw')" class="logo-image relative"></div>
      </slot>
    </div>
    <nuxt-link :to="localePath('/')" class="flex">

      <h1 class="text-4xl sm:text-5xl flex">
        geofind.io
      </h1>
    </nuxt-link>
    <div class="icon">
      <geo-language-switch />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

const {Prop} = require("vue-property-decorator");
@Component
export default class Logo extends Vue {
  @Prop({default: false}) backButton!: boolean;
}
</script>
<style scoped lang="postcss">
div {
  @apply flex justify-start items-center;
}

.logo-image {
  top: -0px;
  width: 32px !important;
}

.icon {
  margin-top: 20px;
}
</style>
