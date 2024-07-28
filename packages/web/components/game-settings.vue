<template>
  <div class="settings-wrapper" v-if="settings">
    <Panel class="settings-panel">
      <template #title>
        <button
          @click="prev($refs.modeSwiper)"
          v-html="require('~/assets/icons/prev.svg?raw')"
        ></button>
        {{ $t('settings.gameMode') }}
        <button
          @click="next($refs.modeSwiper)"
          v-html="require('~/assets/icons/next.svg?raw')"
        ></button>
      </template>
      <template #content>
        <div class="game-modes">
          <swiper ref="modeSwiper" class="swiper" :options="gameSliderOptions">
            <swiper-slide :key="game.name" v-for="game in availableGames">
              <div
                @click="settings = { ...settings, room: game.name }"
                :class="`game-mode ${shade} w-half ${
                  settings.room === game.name ? 'active' : ''
                } ${game.disabled ? 'disabled' : ''}`"
              >
                <div v-html="game.image" />
                {{ $t(`settings.gameModes.${game.name}`) }}
                {{ game.disabled ? `(${$t('t.soon')})` : '' }}
              </div>
            </swiper-slide>
            <div
              :class="`swiper-pagination pagination-${shade}`"
              slot="pagination"
            ></div>
          </swiper>
        </div>
      </template>
    </Panel>

    <Panel class="settings-panel">
      <template #title>
        <button
          @click="prev($refs.setSwiper)"
          v-html="require('~/assets/icons/prev.svg?raw')"
        ></button>
        {{ $t('settings.mapSet') }}
        <button
          @click="next($refs.setSwiper)"
          v-html="require('~/assets/icons/next.svg?raw')"
        ></button>
      </template>
      <template #content>
        <div class="game-modes">
          <swiper ref="setSwiper" class="swiper" :options="sliderOptions">
            <swiper-slide :key="map.name" v-for="map in maps">
              <div
                @click="settings = { ...settings, map: map.name }"
                :class="`game-mode ${shade} w-half ${
                  settings.map === map.name ? 'active' : ''
                } ${map.disabled ? 'disabled' : ''}`"
              >
                <div v-html="map.image" />
                {{ $t(`settings.mapSets.${map.name}`) }}
                {{ map.disabled ? `(${$t('t.soon')})` : '' }}
              </div>
            </swiper-slide>
            <div
              :class="`swiper-pagination pagination-${shade}`"
              slot="pagination"
            ></div>
          </swiper>
        </div>
      </template>
    </Panel>

    <Panel>
      <template #title> {{ $t('t.other') }}</template>
      <template #content>
        <div
          class="
            game-modes
            flex flex-col
            items-start
            justify-start
            content-start
          "
        >
          <Checkbox
            :extra-classes="shade"
            v-model="settings.hasStrictMatches"
            :label="$t('settings.directMatchesOnly')"
          />
          <Checkbox
            :extra-classes="shade"
            v-model="settings.hasIslands"
            :label="$t('settings.islands')"
          />
          <Checkbox
            :extra-classes="shade"
            v-model="settings.hasBorders"
            :label="$t('settings.borders')"
          />

          <Checkbox
            :extra-classes="shade"
            v-model="settings.isPublic"
            :label="$t('settings.public')"
          />
  

          <GameSettingsInput
            v-model="settings.roundTime"
            :label="$t('settings.roundTime')"
          />
          <GameSettingsInput
            v-model="settings.maxPoints"
            :label="$t('settings.pointsNeeded')"
          />
        </div>
      </template>
    </Panel>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, VModel } from 'vue-property-decorator'
import GameSettingsInput from '~/components/game-settings-input.vue'
import Checkbox from '~/components/checkbox.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Panel from '~/components/panel.vue'
import { GameRoom } from '~/constants/games'

@Component({
  components: { Panel, Checkbox, GameSettingsInput, Swiper, SwiperSlide },
})
export default class GameSettings extends Vue {
  @VModel() settings!: any
  @Prop({ default: 'green' }) shade!: string

  get availableGames() {
    const games = this.games
    return games
  }

  games: { name: GameRoom; image: string }[] = [
    {
      name: 'countries',
      image: require('~/assets/gamemodes/countries.svg?raw'),
    },
    {
      name: 'party',
      image: require('~/assets/gamemodes/party.svg?raw'),
    },
    {
      name: 'flags',
      image: require('~/assets/gamemodes/flags.svg?raw'),
    },
    // {
    //   name: 'speedrun',
    //   image: require('~/assets/gamemodes/speedrun.svg?raw'),
    // },
    {
      name: 'capitals',
      image: require('~/assets/gamemodes/capitals.svg?raw'),
    },
    /* {
      name: 'quiz',
      image: require('~/assets/gamemodes/quiz.svg?raw'),
    },*/
  ]

  maps = [
    {
      name: 'earth',
      image: require('~/assets/mapsets/earth.svg?raw'),
    },
    {
      name: 'africa',
      image: require('~/assets/mapsets/africa.svg?raw'),
    },
    {
      name: 'america',
      image: require('~/assets/mapsets/america.svg?raw'),
    },
    {
      name: 'asia',
      image: require('~/assets/mapsets/asia.svg?raw'),
    },
    {
      name: 'europe',
      image: require('~/assets/mapsets/europe.svg?raw'),
    },
    {
      name: 'oceania',
      image: require('~/assets/mapsets/islands.svg?raw'),
    },
  ]

  sliderOptions = {
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetweenSlides: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetweenSlides: 20,
      },
    },
    loop: false,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  gameSliderOptions = {
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView:
          this.availableGames.length > 3 ? 3 : this.availableGames.length,
        spaceBetweenSlides: 20,
      },
      1024: {
        slidesPerView:
          this.availableGames.length > 3 ? 3 : this.availableGames.length,
        spaceBetweenSlides: 20,
      },
    },
    loop: false,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

 
  next(swiper) {
    swiper.swiperInstance.slideNext(300)
  }

  prev(swiper) {
    swiper.swiperInstance.slidePrev(300)
  }
}
</script>
<style scoped lang="postcss">
h3 {
  @apply pb-3 mt-5 text-4xl border-b border-gray-100 dark:border-gray-800 w-full text-gray-700;
}

.settings-wrapper {
}

.settings-panel {
  @apply bg-white dark:bg-gray-700 rounded flex justify-center items-center w-full flex-col mb-10 shadow-lg;
}

.game-modes {
  @apply flex justify-between flex-wrap w-full p-5;
}

.game-mode {
  @apply justify-center items-center flex flex-col bg-gray-200 rounded p-5 text-center cursor-pointer font-lucky;
  @apply dark:bg-gray-600 dark:text-white;
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
  @apply hover:bg-blue-100 dark:hover:bg-blue-700;
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
  @apply text-gray-600 dark:text-gray-200;
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
  @apply text-gray-700 dark:text-gray-100;
}
</style>
