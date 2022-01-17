<template>
  <h1>{{ count && count > 0 ? count : "" }}</h1>
</template>
<script lang="ts">
import {Prop} from "vue-property-decorator";
import Component from "vue-class-component";
import Vue from 'vue';

@Component
export default class Countdown extends Vue {
  @Prop() initial

  count = null
  timer = null;

  mounted(){
    this.count = this.initial;
    this.timer = setInterval(() => {
      this.count -= 1;
    }, 1000);
  }

  beforeDestroy(){
    return clearInterval(this.timer);
  }
}
</script>
<style scoped lang="postcss">
h1 {
  font-size: 64px;
  opacity: 0.5;
  margin: 0;
  padding: 0;
}
</style>
