<template>
  <div class="flex mb-5 items-center justify-between w-full">
    <span class="pr-4 text-2xl font-lucky">{{ label }}</span>
    <Input :disabled='disabled' style="max-width: 60px" class="text-center" v-model="setting" />
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
