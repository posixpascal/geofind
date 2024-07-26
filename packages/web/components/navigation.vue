<template>
  <div class="nav-bar">
    <div :class="`rainbow-border ${birdColor}`" />
    <nav class="flex flex-col md:flex-row px-5 justify-between text-center items-center pt-10">
        <div>
          <nuxt-link
          to="/"
          v-html="require('~/assets/images/logo.svg?raw')"
          :class="`logo-image w-8 h-8 relative ${birdColor}`"
        ></nuxt-link>
        </div>
        <div class="w-full flex items-center text-center justify-center flex-col">
          <nuxt-link :to="localePath('/')">
          <h1 class="relative text-5xl flex md:flex md:text-7xl dark:text-gray-200">geofind.io</h1>
         
        </nuxt-link>
        </div>      
        <div v-if="players" class="justify-center text-center font-lucky text-2xl flex">{{ players }} {{ $t('t.players') }} online</div>

    </nav>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component
export default class Navigation extends Vue {
  menu = false
  birdColor = 'bird-yellow border-yellow'
  players = 0;
  timer = null;
  mounted(){
    this.timer = setInterval(() => {
      this.players = (window as any).playersOnline;
    }, 200)
  }

  beforeDestroy(){
    this.timer = null;
  }


  @Watch('$route', { immediate: true })
  setBirdColor() {
    if (!this.$router.currentRoute.name) {
      return 'bird-yellow border-yellow'
    }
    const routeName = this.$router.currentRoute.name.split('___')[0]
    let color

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
        color = 'bird-yellow border-yellow'
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
  @apply dark:text-gray-200;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all ease-in-out 0.3s;
}

.nav-links li a:hover {
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
  @apply bg-opacity-60;
  backdrop-filter: blur(15px);
}

.menu-area .fancy-button svg {
  width: 37px !important;
  position: relative;
  margin-top: 5px;
}
</style>
