<template>
  <div class="settings-wrapper">
    <div class="settings-panel">
      <h3 class="flex justify-between text-center">
        <button @click="prev($refs.modeSwiper)" v-html="require('~/assets/icons/prev.svg?raw')"></button>
        {{ $t('settings.gameMode') }}
        <button @click="next($refs.modeSwiper)" v-html="require('~/assets/icons/next.svg?raw')"></button>
      </h3>
      <div class="game-modes">
        <swiper
          ref="modeSwiper"
          class="swiper"
          :options="sliderOptions"
        >
          <swiper-slide :key='mode.name' v-for="mode in modes">
            <div @click="settings = {...settings, mode: mode.name}"
                 :class="`game-mode ${shade} w-half ${settings.mode === mode.name ? 'active' : ''} ${mode.disabled ? 'disabled': ''}`">
              <div v-html="mode.image"/>
              {{ $t(`settings.gameModes.${mode.name}`) }} {{ mode.disabled ? `(${$t('t.soon')})` : "" }}
            </div>
          </swiper-slide>
          <div :class="`swiper-pagination pagination-${shade}`" slot="pagination"></div>
        </swiper>
      </div>
    </div>

    <div class="settings-panel">
      <h3 class="flex justify-between text-center">
        <button @click="prev($refs.setSwiper)" v-html="require('~/assets/icons/prev.svg?raw')"></button>
        {{ $t('settings.mapSet') }}
        <button @click="next($refs.setSwiper)" v-html="require('~/assets/icons/next.svg?raw')"></button>
      </h3>
      <div class="game-modes">
        <swiper
          ref="setSwiper"
          class="swiper"
          :options="sliderOptions"
        >
          <swiper-slide :key='set.name' v-for="set in sets">
            <div @click="settings = {...settings, set: set.name}"
                 :class="`game-mode ${shade} w-half ${settings.set === set.name ? 'active' : ''} ${set.disabled ? 'disabled': ''}`">
              <div v-html="set.image"/>
              {{ $t(`settings.mapSets.${set.name}`) }} {{ set.disabled ? `(${$t('t.soon')})` : "" }}
            </div>
          </swiper-slide>
          <div :class="`swiper-pagination pagination-${shade}`" slot="pagination"></div>
        </swiper>
      </div>
    </div>

    <div class="settings-panel">
      <h3 class="block text-center">
        {{ $t('t.other') }}
      </h3>
      <div class="game-modes flex flex-col items-start justify-start content-start">
        <geo-checkbox :extra-classes="shade" v-model='settings.directMatchesOnly'
                      :label="$t('settings.directMatchesOnly')"/>
        <geo-checkbox :extra-classes="shade" v-model='settings.islands'
                      :label="$t('settings.islands')"/>
        <geo-checkbox :extra-classes="shade" v-model='settings.borders' :label="$t('settings.borders')"/>
        <geo-checkbox v-if="shade === 'blue'" :extra-classes="shade" v-model='settings.public'
                      :label="$t('settings.public')"/>

        <geo-game-settings-input v-model="settings.roundTime" :label="$t('settings.roundTime')"/>
        <geo-game-settings-input v-model="settings.maxRounds" :label="$t('settings.maxRounds')"/>
        <geo-game-settings-input v-model="settings.pointsNeeded" :label="$t('settings.pointsNeeded')"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Emit, Model, Prop, VModel} from "vue-property-decorator";
import GameSettingsInput from "~/components/game-settings-input.vue";
import Checkbox from "~/components/checkbox.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";

@Component({
  components: {Checkbox, GameSettingsInput, Swiper, SwiperSlide}
})
export default class GameSettings extends Vue {
  @VModel() settings!: any;
  @Prop({default: "green"}) shade!: string;

  modes = [
    {
      name: "countries",
      image: require("~/assets/gamemodes/countries.svg?raw")
    },
    {
      name: "capitals",
      image: require("~/assets/gamemodes/capitals.svg?raw"),
    },
    {
      name: "sightseeing",
      image: require("~/assets/gamemodes/sightseeing.svg?raw"),
    },
    {
      name: "domainhunt",
      image: require("~/assets/gamemodes/domains.svg?raw"),
    },
    {
      name: "flags",
      image: require("~/assets/gamemodes/flags.svg?raw"),
    },
    {
      name: "quiz",
      image: require("~/assets/gamemodes/quiz.svg?raw"),
    },
    {
      name: "speedrun",
      image: require("~/assets/gamemodes/speedrun.svg?raw"),
    },
    {
      name: "shapes",
      image: require("~/assets/gamemodes/shapes.svg?raw"),
    }
  ]

  sets = [
    {
      name: "earth",
      image: require("~/assets/mapsets/earth.svg?raw")
    },
    {
      name: "africa",
      image: require("~/assets/mapsets/africa.svg?raw"),
    },
    {
      name: "america",
      image: require("~/assets/mapsets/america.svg?raw"),
    },
    {
      name: "asia",
      image: require("~/assets/mapsets/asia.svg?raw"),
    },
    {
      name: "europe",
      image: require("~/assets/mapsets/europe.svg?raw"),
    },
    {
      name: "oceania",
      image: require("~/assets/mapsets/islands.svg?raw"),
    },
  ]

  sliderOptions = {
    slidesPerView: (window.innerWidth < 768) ? 1 : 2,
    loop: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  next(swiper){
    swiper.swiperInstance.slideNext(300);
  }

  prev(swiper){
    swiper.swiperInstance.slidePrev(300);
  }
}
</script>
<style scoped lang="postcss">
h3 {
  @apply pb-3 mt-5 text-4xl border-b-2 border-gray-100 w-full text-gray-700;
}

.settings-wrapper {
  @apply my-10;
}

.settings-panel {
  @apply bg-white rounded flex justify-center items-center w-full flex-col mb-10 shadow-lg;
}

.game-modes {
  @apply flex justify-between flex-wrap w-full p-5 ;
}

.game-mode {
  @apply justify-center items-center flex flex-col bg-gray-200 rounded p-5 text-center cursor-pointer font-lucky;
  width: 100%;
  height: 130px;
  margin-bottom: 8px;
  margin-top: 8px;
}

.game-mode.green {
  @apply hover:bg-green-100;
}

.game-mode.green.active {
  @apply bg-green-400;
}

.game-mode.blue {
  @apply hover:bg-blue-100;
}

.game-mode.blue.active {
  @apply bg-blue-400;
}

.game-mode.w-half {
  width: 100%;
}

.game-mode.disabled {
  opacity: 0.5;
  cursor: no-drop;
  pointer-events: none;
}

.game-mode.active svg {
  color: #fff;
}

.swiper {
  padding-bottom: 20px;
}

.swiper-pagination {
  bottom: -5px !important;
}
</style>
<style>
.game-mode svg {
  width: 188px !important;
  position: relative;
  top: 0;
  height: 70px !important;
  margin-bottom: 5px;
}

.game-mode.active {
  color: #fff;
}

.game-mode:not(.active) {
  color: #111;
}

.game-mode:not(.active) svg *:not(.ignored) {

}

.game-mode.active svg *:not(.ignored) {
  fill: #fff;
}

.swiper-pagination-bullet {
  margin: 0 4px;
}

.pagination-green .swiper-pagination-bullet {
  @apply bg-green-400;
}

.pagination-blue .swiper-pagination-bullet {
  @apply bg-blue-400;
}
</style>
<style lang="postcss">
.settings-panel h3 button svg {
  @apply text-gray-400;
  width: 58px;
  position: relative;
  top: -4px;
  height: 40px;
}

.settings-panel h3 button:focus {
  outline: none;
}

.settings-panel h3 button:hover svg {
  @apply text-gray-700;
}
</style>
