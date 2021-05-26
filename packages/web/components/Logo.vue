<template>
  <div class="flex justify-between">
    <div class="icon"><slot name="before"></slot></div>
    <nuxt-link :to="localePath('/')"><h1 class="text-4xl sm:text-5xl">geofind.io</h1></nuxt-link>
    <div class="icon">
      <LanguageSwitch />
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
  @apply flex justify-between items-center;
}
.icon {
  margin-top: 20px;
}
</style>
