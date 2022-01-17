<template>
  <div class="panel">

    <h3 :class="`text-center ${back ? 'justify-between' : 'justify-center'}`">
      <div class="back-button" v-if="back">
        <nuxt-link :to="back">
          <Icon v-show="back" name="chevron-left" />
        </nuxt-link>
      </div>
      <slot name="title"></slot>
      <div></div>
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
import {Prop} from "vue-property-decorator";
import Icon from "~/components/icon.vue";

@Component({
  components: {Icon}
})
export default class Panel extends Vue {
  @Prop() back : any;
}
</script>
<style lang="postcss" scoped>
h3 {
  @apply flex pb-3 mt-5 text-2xl md:text-4xl border-b-2 border-gray-100 w-full text-gray-700;
}

.panel-content h3 {
  @apply justify-center;
}

.back-button {
  @apply bottom-2.5 md:bottom-2;
  position: relative;
  left: 10px;
}

.panel {
  @apply bg-white rounded flex justify-center items-center w-full flex-col mb-10 shadow-lg;
}

.panel-content {
  width: 100%;
  padding: 15px;
}
</style>
