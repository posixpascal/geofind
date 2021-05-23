<template>
  <input v-model="input" :disabled='readonly' type="text" @input="$emit('change', input)" :class="`font-lucky input ${readonly ? 'readonly' : ''}`" v-bind="$attrs"/>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop, VModel} from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @VModel() input
  @Prop({default: false}) readonly;
}
</script>
<style lang="postcss" scoped>
input {
  @apply rounded shadow-sm outline-none border-transparent focus-within:ring-2;
  @apply focus:ring-yellow-200 focus:border-yellow-300 border-2 focus:ring-2 p-3;
  font-size: 20px;
}

input[readonly]{
  pointer-events: none;
}
</style>
