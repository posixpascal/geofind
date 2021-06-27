<template>
  <Dialog v-if="room">
    <h2 class="text-xl sm:text-2xl">{{ $t('t.whereIs') }}...</h2>
    <h3 class="text-lg sm:text-xl">
      <Flag class="flag"
            :hasDropShadow="true"
            :hasBorder="true"
            :hasBorderRadius="true"
            size="L"
            gradient="real-linear"
            :code="room.country.alpha2Code"
      />
      <br/>
      <span class="whitespace-pre-wrap break-all">{{ room.country.translations[$i18n.locale] }}</span>
    </h3>
  </Dialog>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Room} from "~/models";
import Dialog from "~/components/dialog.vue";

@Component({ name: 'round-prepare-dialog' })
export default class RoundPrepareDialog extends Vue {
  @Prop() room!: Room;
}
</script>
<style lang="postcss" scoped>
</style>
