<template>
  <div class="loading">
    <h1>
      <slot></slot>
    </h1>
    <div class="flex w-full flex-wrap scroller overflow-hidden">
      <div class="scroll-area">
        <Flag :code="flag" size="l" :key='flag.id' v-for='flag of countries'/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

// TODO: find broken alpha 2 codes not supported by flagpack
const ALPHA_2_CODES = JSON.parse("[\"AW\",\"AF\",\"AO\",\"AI\",\"AX\",\"AL\",\"AD\",\"AE\",\"AR\",\"AM\",\"AS\",\"AQ\",\"AG\",\"AU\",\"AT\",\"AZ\",\"BI\",\"BE\",\"BJ\",\"BF\",\"BD\",\"BG\",\"BH\",\"BS\",\"BA\",\"BL\",\"BY\",\"BZ\",\"BM\",\"BO\",\"BR\",\"BB\",\"BN\",\"BT\",\"HK\",\"HN\",\"HR\"]");

export default class Loading extends Vue {
  get countries() {
    return [...ALPHA_2_CODES.slice(0, ALPHA_2_CODES.length - 1), ...ALPHA_2_CODES];
  }
}
</script>
<style lang="postcss" scoped>
.loading {
  @apply justify-center flex-col flex py-10;
}

.scroller {
  max-width: 500%;
  max-height: 28px;
  width: 100%;
  height: 28px;
  position: relative;
  box-shadow: inset 5px 0 5px rgba(255, 255, 255, .5);
}

.scroll-area {
  position: absolute;
  animation: scroll infinite linear 20s;
}

@keyframes scroll {
  0% {
    left: 0%
  }
  100% {
    left: calc(-200% - 32px);
  }
}
</style>
