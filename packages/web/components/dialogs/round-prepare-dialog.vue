<template>
  <Dialog>
    <h2 class="text-xl sm:text-3xl">{{ $t('t.whereIs') }}</h2>
    <h3 class="flag-xl text-lg sm:text-xl" v-if="country && (room.room === 'countries' || room.room === 'speedrun')">
      <Flag
        class="flag"
        :hasDropShadow="true"
        :hasBorder="true"
        :hasBorderRadius="true"
        size="l"
        gradient="real-linear"
        :code="country.alpha2code === 'GB' ? 'UK' : country.alpha2code"
      />
      <br />
      <span class="" v-if="country.translations[$i18n.locale]">{{country.translations[$i18n.locale].country }}</span>
      <span class="" v-else>{{country.name }}</span>

    </h3>
    <h3 class="flag-xl text-xl sm:text-3xl" v-else-if="room.room === 'capitals'">
      <div v-if="country && country.translatedcapitals[$i18n.locale]">
        {{  $i18n.locale === 'en' ? country.capital : country.translatedcapitals[$i18n.locale] }}
      </div>
      <div v-else>
        {{ country.capital }}
      </div>
    </h3>
    <h3 class="flag-xxl text-lg sm:text-xl" v-if="room.room === 'flags'">
      <Flag
        class="flag"
        :hasDropShadow="true"
        :hasBorder="true"
        :hasBorderRadius="true"
        size="l"
        gradient="real-linear"
        :code="country.alpha2code === 'GB' ? 'UK' : country.alpha2code"
      />
    </h3>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Dialog from '~/components/dialog.vue'
import {Room} from "~/models";

@Component({ name: 'round-prepare-dialog', components: { Dialog } })
export default class RoundPrepareDialog extends Vue {
  @Prop() country!: any
  @Prop() room!: Room;
}
</script>
<style lang="postcss">
.flag-xl .flag {
  width: 96px !important;
  height: auto !important;
}

.flag-xxl .flag {
  width: 164px !important;
  height: auto !important;
}
</style>
