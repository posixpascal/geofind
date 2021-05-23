<template>
  <div class="dialog" v-if="room">
    <h2>Where is ...</h2>
    <h3>
      <Flag class="flag"
            :hasDropShadow="true"
            :hasBorder="true"
            :hasBorderRadius="true"
            size="L"
            gradient="real-linear"
            :code="room.country.countryCode"
      /><br/>
      {{ room.country.countryNameDe }}
    </h3>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";

@Component
export default class RoundPrepareDialog extends Vue {
  @Prop() room!: Room;
}
</script>
<style lang="postcss" scoped>
.dialog {
  @apply absolute bg-opacity-90 bg-white left-1/2 w-20 z-10 p-5 rounded shadow-2xl;
  @apply flex content-center justify-center bg-gray-100 bg-opacity-90 text-gray-700 flex-col;
  font-family: "Luckiest Guy";
  top: 80px;
  min-width: 500px;
  transform: translateX(-50%);
}

.dialog h2 {
  @apply text-center text-4xl pt-6;
}

.dialog h3 {
  @apply text-center text-5xl mt-5;
}

.dialog .flag {
  width: 72px;
  position: relative;
  top: 9px;
}

.dialog .flag img {
  width: 72px;
}
</style>
