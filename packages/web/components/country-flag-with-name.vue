<template>
  <div>
    <div class="flex text-lg sm:text-xl text-left" v-if="country">
      <div
        :class="`flag-${flagSize} mr-5 flex items-center top-0 !top-0 ${
          room.room === 'flags' ? 'flag-xxl' : ''
        }`"
      >
        <Flag
          v-if="
            room.room === 'countries' ||
            room.room === 'flags' ||
            room.room === 'party' ||
            room.room === 'speedrun'
          "
          style="top: 0 !important;"
          :hasDropShadow="true"
          :hasBorder="true"
          :hasBorderRadius="true"
          :size="flagSize"
          gradient="real-linear"
          :code="country.alpha2code"
        />
      </div>
      <div v-if="room.room == 'capitals'">
        <h4 v-if="country.translatedcapitals[$i18n.locale]">
          {{
            $i18n.locale === 'en'
              ? country.capital
              : country.translatedcapitals[$i18n.locale]
          }}
        </h4>
        <h4 v-else>
          {{ country.capital }}
        </h4>
      </div>
      <div class="!text-left" v-if="room.room == 'countries' || room.room == 'party' || room.room == 'speedrun'">
        <h4 v-if="country.translations[$i18n.locale]">
          {{
            $i18n.locale === 'en'
              ? country.name
              : country.translations[$i18n.locale].country
          }}
        </h4>
        <h4 v-else>
          {{ country.name }}
        </h4>

        <template v-if="hintLevel >= 1">
          <h5
            class="
              text-opacity-90 text-gray-600
              animate__animated animate__fadeInDown
            "
          >
            Bevölkerung: {{ country.population | numeral('0,0') }}
          </h5>
        </template>

        <template v-if="hintLevel >= 2">
          <h5
            class="
              text-opacity-90 text-gray-600
              animate__animated animate__fadeInDown
            "
          >
            Hauptstadt: {{ country.capital }}
          </h5>
        </template>

        <div v-if="hintLevel >= 3" class="flex">
          <h5
            class="
              text-opacity-90 text-gray-600
              animate__animated animate__fadeInDown
            "
          >
            {{ country.region }}
          </h5>
          <template v-if="hintLevel >= 4">
            <h5
              class="
                text-opacity-90 text-gray-600
                mx-2
                animate__animated animate__fadeInDown
              "
            >
              /
            </h5>
            <h5
              class="
                text-opacity-90 text-gray-600
                animate__animated animate__fadeInDown
              "
            >
              {{ country.subregion }}
            </h5>
          </template>
        </div>

        <div v-if="hintLevel >= 5 && country.borders" class="flex items-center">
          <h5
            class="
              text-opacity-90 text-gray-600
              animate__animated animate__fadeInDown
            "
          >
            Neighbours: &nbsp;
          </h5>
          <Flag
            :hasDropShadow="true"
            :hasBorder="true"
            :hasBorderRadius="true"
            size="l"
            gradient="real-linear"
            :code="border"
            :key="border"
            v-for="border of country.borders"
          />
        </div>
        <div v-else class="flex items-center"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Room } from '~/models'

declare const Flag: any

@Component
export default class CountryFlagWithName extends Vue {
  @Prop() country: any
  @Prop() room: Room
  @Prop({ default: 'l' }) flagSize: string
  @Prop({ default: 0 }) hintLevel: number
  @Prop({ default: false }) distancePoint: any

  @Watch('hintLevel', { immediate: true })
  fetchExtendedInformation() {
    if (this.hintLevel >= 5) {
      this.$store.dispatch('country/discoverWithNeighbours', this.country.id)
    }
  }
}
</script>
<style lang="postcss">
.flag-l .flag {
  width: 64px !important;
  height: auto !important;
}

.flag-xxl .flag {
  width: 164px !important;
  height: auto !important;
}
</style>
