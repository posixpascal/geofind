<template>
  <input v-model="input" type="text" @input="$emit('change', input)" class="input lucky" v-bind="$attrs"/>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, VModel} from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @VModel() input
}
</script>
<style lang="postcss" scoped>
input {
  @apply rounded shadow-sm outline-none border-transparent focus-within:ring-2;
  @apply focus:ring-yellow-200 focus:border-yellow-300 border-2 focus:ring-2 p-3;
  @apply w-full;
  font-size: 20px;
}
</style>
