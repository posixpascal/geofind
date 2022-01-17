<template>
  <div class="flex mb-3 items-center w-full">
    <Input :disabled='disabled' style="max-width: 80px" class="text-center bg-gray-50" v-model="setting" />
    <span class="pl-4 text-2xl font-lucky">{{ label }}</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop, VModel} from "vue-property-decorator";

@Component
export default class GameSettingsInput extends Vue {
  @VModel() setting;
  @Prop({type: String, default: ''}) label;
  @Prop({type: Boolean, default: false}) disabled;


}
</script>

<style lang="postcss">

</style>
