<template>
  <div class="flex justify-start">
    <div class="icon">
      <slot name="before">
        <div class="pt-2 pl-2 pr-5"><img style="min-width: 96px" width="96px" :src="require('~/assets/images/logo.svg')" class="logo-image relative"/>
        </div>
      </slot>
    </div>
    <nuxt-link :to="localePath('/')" class="flex">

      <h1 class="text-4xl sm:text-5xl flex">
        geofind.io
      </h1>
    </nuxt-link>
    <div class="icon">
      <LanguageSwitch/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import AnimatedLetters from "~/components/AnimatedLetters.vue";
import Button from "~/components/Button.vue";

const {Prop} = require("vue-property-decorator");
@Component({
  components: {AnimatedLetters, Button}
})
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
}

.icon {
  margin-top: 20px;
}
</style>
