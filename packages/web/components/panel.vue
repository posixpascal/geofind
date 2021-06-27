<template>
  <div class="panel">
    <h3 class="text-center">
      <slot name="title"></slot>
    </h3>
      <div class="panel-content">
        <div class="flex flex-col w-full">
          <slot name="content"></slot>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";

@Component
export default class Panel extends Vue {

}
</script>
<style lang="postcss" scoped>
h3 {
  @apply pb-3 mt-5 text-4xl border-b-2 border-gray-100 w-full text-gray-700;
}

.panel {
  @apply bg-white rounded flex justify-center items-center w-full flex-col mb-10 shadow-lg;
}

.panel-content {
  width: 100%;
  padding: 15px;
}
</style>
