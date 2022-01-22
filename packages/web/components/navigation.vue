<template>
  <div class="sticky top-0 z-20 nav-bar">
    <nav>
      <div class="main-typo flex items-center">
        <nuxt-link
          to="/"
          v-html="require('~/assets/images/logo.svg?raw')"
          :class="`logo-image relative ${birdColor}`"
        ></nuxt-link>
        <nuxt-link to="/">
          <h1>geofind.io</h1>
          <p class="hidden sm:inline-block">{{ $t('t.catchPhrase')}}</p>
        </nuxt-link>
      </div>
      <ul class="nav-links">
        <li class="hidden sm:flex" v-if="false">
          <nuxt-link class="green" active-class="active" to="/tutor">
            <Icon name="school" />
            {{ $t('singleplayer.button') }}
          </nuxt-link>
        </li>
        <li class="hidden sm:flex">
          <nuxt-link class="blue" active-class="active" to="/multiplayer">
            <Icon name="controller" />
            {{ $t('multiplayer.button') }}
          </nuxt-link>
        </li>
        <li class="hidden lg:flex">
          <nuxt-link class="red" active-class="active" to="/matchmaking">
            <Icon name="cube" />
            {{ $t('matchmaking.button') }}
          </nuxt-link>
        </li>
        <li class="hidden sm:flex">
          <nuxt-link class="purple" active-class="active" to="/lobbies">
            <Icon name="public" />
            {{ $t('lobbies.button') }}
          </nuxt-link>
        </li>
        <li class="hidden md:flex">
          <nuxt-link class="yellow" active-class="active" to="/profile">
            <Icon name="profile" />
            {{ $t('profile.button') }}
          </nuxt-link>
        </li>
      </ul>
      <div class="flex sm:hidden flex-col justify-center items-center">
        <button @click="toggleMenu" class="menu">
          <div
            v-if="menu"
            v-html="require('~/assets/images/close.svg?raw')"
          ></div>
          <div v-else v-html="require('~/assets/images/menu.svg?raw')"></div>
          {{ $t('t.menu') }}
        </button>
      </div>
    </nav>
    <div :class="`rainbow-border ${birdColor}`" />
    <div v-if="menu" class="menu-area relative z-20 bg-white-50 pb-4 mx-4">
      <Button
        @click="menu = false"
        :icon="true"
        :to="localePath('/tutor')"
        v-if="false"
        variant="green"
        :animated="true"
      >
        {{ $t('singleplayer.button') }}
      </Button>
      <Button
        @click="menu = false"
        :icon="true"
        :to="localePath('/multiplayer')"
        variant="blue"
        :animated="true"
      >
        <template #icon>
          <Icon class="text-white" :height="48" name="create" />
        </template>
        {{ $t('multiplayer.button') }}
      </Button>

      <Button
        @click="menu = false"
        :icon="true"
        :to="localePath('lobbies')"
        variant="purple"
        :animated="true"
      >
        <template #icon>
          <Icon class="text-white" :height="48" name="public" />
        </template>
        {{ $t('lobbies.button') }}
      </Button>
      <Button
        @click="menu = false"
        :icon="true"
        :to="localePath('/matchmaking')"
        variant="red"
        :animated="true"
      >
        <template #icon>
          <Icon class="text-white" :height="48" name="cube" />
        </template>
        {{ $t('matchmaking.button') }}
      </Button>
      <!--<Button to="teachers" variant="blue" :animated="true">
        <template #icon>👩‍🏫</template>
        Teacher Zone
      </Button>-->
      <Button
        @click="menu = false"
        :icon="true"
        :to="localePath('profile')"
        variant="yellow"
        :animated="true"
      >
        <template #icon>
          <Icon class="text-white" :height="48" name="profile" />
        </template>
        {{ $t('profile.button') }}
      </Button>
      <Button
        @click="menu = false"
        :icon="true"
        :to="localePath('achievements')"
        variant="orange"
        :animated="true"
      >
        <template #icon>
          <Icon class="text-white" :height="48" name="school" />
        </template>
        {{ $t('achievements.button') }}
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component
export default class Navigation extends Vue {
  menu = false
  birdColor = "bird-yellow border-yellow";

  @Watch('$route', { immediate: true })
  setBirdColor() {
    if (!this.$router.currentRoute.name){
      return 'bird-yellow border-yellow';
    }
    const routeName = this.$router.currentRoute.name.split('___')[0]
    let color;

    switch (routeName) {
      case 'index':
        color = 'bird-yellow border-rainbow'
        break

      case 'singleplayer':
      case 'tutor':
        color = 'bird-green border-green'
        break
      case 'multiplayer':
        color = 'bird-blue border-blue'
        break
      case 'lobbies':
        color = 'bird-purple border-purple'
        break
      case 'matchmaking':
        color = 'bird-red border-red'
        break
      default:
        color = 'bird-yellow border-yellow';
    }

    if (routeName.includes('lobby-id')) {
      color = 'bird-blue  border-blue'
    }

    this.birdColor = color
  }

  toggleMenu() {
    this.menu = !this.menu
    document.querySelector('html').scrollTop = 0
  }
}
</script>
<style lang="postcss" scoped>
nav {
  @apply py-3 flex sm:py-4 px-2 sm:px-4 bg-white;
  @apply justify-between w-full items-center relative top-0 z-50 shadow;
  backdrop-filter: blur(15px);
}

.menu {
  @apply flex justify-center flex-col items-center mt-2 pr-4 focus:outline-none;
  font-size: 14px;
}

.menu-area {
  height: calc(100vh - 80px);
}



.rainbow-border {
  background: linear-gradient(
    90deg,
    rgba(255, 122, 0, 1) 0%,
    rgba(255, 122, 0, 1) 20%,
    rgba(255, 224, 0, 1) 20%,
    rgba(255, 224, 0, 1) 40%,
    rgba(74, 182, 59, 1) 40%,
    rgba(74, 182, 59, 1) 60%,
    rgba(15, 107, 215, 1) 60%,
    rgba(15, 107, 215, 1) 80%,
    rgba(69, 64, 182, 1) 80%,
    rgba(69, 64, 182, 1) 100%
  );
  height: 4px;
  width: 100%;
  transition: background ease-in-out 0.4s;
}

.rainbow-border.border-yellow {
  background: rgba(255, 224, 0, 1);
}

.rainbow-border.border-blue {
  background: #0f6bd7;
}

.rainbow-border.border-green {
  background: #6bcf3f;
}

.rainbow-border.border-purple {
  background: #624bcf;
}

.rainbow-border.border-red {
  background: #ea422e;
}

nav p {
  @apply hidden md:block;
}

nav h1 {
  @apply relative text-2xl flex sm:hidden md:flex  md:text-4xl;
  position: relative;
  top: -8px;
  line-height: 0px;
}

nav .main-typo {
  text-align: center;
}

@media (max-width: 768px) {
  nav h1 {
    top: -14px;
  }
}

nav img {
  @apply relative hidden sm:inline-block;
  left: -25px;
  top: 4px;
}

.nav-links {
  @apply flex w-full justify-evenly px-10 items-center m-0 p-0;
}

.nav-links li {
  @apply justify-center flex-col items-center uppercase;
  font-size: 12px;
}

.nav-links li a {
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all ease-in-out 0.3s;
}

.nav-links li a:hover {
  text-shadow: 1px 1px 0 #fff;
}

.nav-links li a.yellow:hover,
.nav-links li a.yellow.active {
  color: #ffb319;
}

.nav-links li a.blue:hover,
.nav-links li a.blue.active {
  color: #0f6bd7;
}

.nav-links li a.green:hover,
.nav-links li a.green.active {
  color: #6bcf3f;
}

.nav-links li a.purple:hover,
.nav-links li a.purple.active {
  color: #624bcf;
}

.nav-links li a.red:hover,
.nav-links li a.red.active {
  color: #ea422e;
}
</style>
<style lang="postcss">
.nav-links svg {
  width: 38px !important;
  height: 38px !important;
}

.logo-image svg {
  @apply mr-5;
  width: 64px;
  height: 64px;
}

.logo-image svg .bird-stroke {
  @apply fill-current;
  color: rgba(0, 0, 0, 0.6);
}

.logo-image.bird-yellow svg {
  @apply text-yellow-400;
}

.logo-image.bird-yellow svg .bird-color-darken {
  @apply fill-current text-yellow-600;
}

.logo-image.bird-yellow svg .bird-color-lighten {
  @apply fill-current text-yellow-100;
}

.logo-image.bird-yellow svg .bird-stroke {
  @apply fill-current text-yellow-900;
}

.logo-image svg,
.logo-image svg,
.logo-image svg,
.logo-image svg * {
}

.logo-image.bird-green svg {
  @apply text-green-400;
}

.logo-image.bird-green svg .bird-color-darken {
  @apply fill-current text-green-600;
}

.logo-image.bird-green svg .bird-color-lighten {
  @apply fill-current text-green-100;
}

.logo-image.bird-green svg .bird-stroke {
  @apply fill-current text-green-800;
}

.logo-image.bird-blue svg {
  @apply text-blue-300;
}

.logo-image.bird-blue svg .bird-color-darken {
  @apply fill-current text-blue-400;
}

.logo-image.bird-blue svg .bird-color-lighten {
  @apply fill-current text-blue-100;
}

.logo-image.bird-blue svg .bird-stroke {
  @apply fill-current text-blue-800;
}

.logo-image.bird-purple svg {
  @apply text-purple-500;
}

.logo-image.bird-purple svg .bird-color-darken {
  @apply fill-current text-purple-700;
}

.logo-image.bird-purple svg .bird-color-lighten {
  @apply fill-current text-purple-200;
}

.logo-image.bird-purple svg .bird-stroke {
  @apply fill-current text-gray-800;
}

.logo-image.bird-red svg {
  @apply text-red-500;
}

.logo-image.bird-red svg .bird-color-darken {
  @apply fill-current text-red-700;
}

.logo-image.bird-red svg .bird-color-lighten {
  @apply fill-current text-red-200;
}

.logo-image.bird-red svg .bird-stroke {
  @apply fill-current text-gray-800;
}

.nav-bar {
  background: rgba(255,255,255,.6) !important;
  backdrop-filter: blur(15px);
}

.menu-area .fancy-button svg {
  width: 37px !important;
  position: relative;
  margin-top: 5px;
}
</style>
