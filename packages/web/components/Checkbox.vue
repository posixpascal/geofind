<template>
  <div class="flex mb-5">
    <input :readonly="readonly" v-model="setting" :class="`switch ${extraClasses}`" type="checkbox" />
    <span class="pl-4 text-2xl font-lucky">{{ label }}</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop, VModel} from "vue-property-decorator";

@Component
export default class Checkbox extends Vue {
  @VModel() setting;
  @Prop({type: String, default: ''}) label;
  @Prop({type: String, default: ''}) extraClasses;
  @Prop({type: Boolean, default: false}) readonly;

}
</script>

<style lang="postcss">
.switch[type="checkbox"] {
  @apply bg-gray-50 border-none;
  position: relative;
  width: 70px;
  height: 35px;
  appearance: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease all;
  outline: none;
  cursor: pointer;
}

.switch[type="checkbox"]::before {
  content: '';
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-color: #fff;
  top: 0;
  left: 0;
  transition: 0.3s ease all;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transform: scale(0.9);
}

.switch:checked[type="checkbox"] {
  @apply bg-green-400;
}

.switch.blue:checked[type="checkbox"] {
  @apply bg-blue-400;
}


.switch:checked[type="checkbox"]::before {
  left: 35px;
}

[type='checkbox']:checked {
  background-position: 6px center !important;
  background-size: 28px !important;
}

input[readonly]{
  pointer-events: none;
}
</style>
