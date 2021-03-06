<template>
  <div class="sticky top-0 z-20 bg-white">
    <nav>
      <div class="main-typo flex items-center">
        <nuxt-link to="/" v-html="require('~/assets/images/logo.svg?raw')"
                   :class="`logo-image relative ${birdColor}`"></nuxt-link>
        <nuxt-link to="/">
          <h1>geonaut.io</h1>
          <p class="hidden sm:inline-block">Das Geographie Spiel</p>
        </nuxt-link>
      </div>
      <ul class="nav-links">
        <li class="hidden sm:flex">
          <nuxt-link class='green' active-class="active" to="/singleplayer">
            <Icon name="school"/>
            Lernen
          </nuxt-link>
        </li>
        <li class="hidden sm:flex">
          <nuxt-link class='blue' active-class="active" to="/multiplayer">
            <Icon name="controller"/>
            Spiel erstellen
          </nuxt-link>
        </li>
        <li class="hidden lg:flex">
          <nuxt-link class='red' active-class="active" to="/matchmaking">
            <Icon name="cube"/>
            Zufallsgegner
          </nuxt-link>
        </li>
        <li class="hidden sm:flex">
          <nuxt-link class='purple' active-class="active" to="/lobbies">
            <Icon name="public"/>
            Offene Spiele
          </nuxt-link>
        </li>
        <li class="hidden md:flex">
          <nuxt-link class="yellow" active-class="active" to="/settings">
            <Icon name="profile"/>
            Profil
          </nuxt-link>
        </li>
      </ul>
      <div class="flex sm:hidden flex-col justify-center items-center">
        <button @click='toggleMenu' class="menu">
          <div v-if="menu" v-html="require('~/assets/images/close.svg?raw')"></div>
          <div v-else v-html="require('~/assets/images/menu.svg?raw')"></div>
          {{ $t('t.menu') }}
        </button>
      </div>
    </nav>
    <div class="rainbow-border"/>
    <div v-if="menu" class="menu-area relative z-20 bg-white-50 pb-4 mx-4">
      <Button @click='menu = false' :icon='true' :to="localePath('/singleplayer')" variant="green" :animated="true">
        {{ $t('singleplayer.button') }}
      </Button>
      <Button @click='menu = false' :icon='true' :to="localePath('/matchmaking')" variant="red" :animated="true">
        {{ $t('matchmaking.button') }}
      </Button>
      <Button @click='menu = false' :icon='true' :to="localePath('/multiplayer')" variant="blue" :animated="true">
        {{ $t('multiplayer.button') }}
      </Button>
      <Button @click='menu = false' :icon='true' :to="localePath('lobbies')" variant="purple" :animated="true">
        {{ $t('lobbies.button') }}
      </Button>
      <!--<Button to="teachers" variant="blue" :animated="true">
        <template #icon>👩‍🏫</template>
        Teacher Zone
      </Button>-->
      <Button @click='menu = false' :icon='true' :to="localePath('settings')" variant="yellow" :animated="true">
        {{ $t('profile.button') }}
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";
import {PINS} from "~/constants/pins";

@Component
export default class Navigation extends Vue {
  menu = false;
  birdColor = null;

  @Watch('$route', {immediate: true})
  setBirdColor() {
    const routeName = this.$router.currentRoute.name.split('___')[0];
    let color = 'bird-yellow';

    switch (routeName) {
      case 'index':
        color = 'bird-yellow';
        break;
      case 'singleplayer':
        color = 'bird-green';
        break;
      case 'multiplayer':
        color = 'bird-blue';
        break;
    }

    if (routeName.includes('lobby-id')){
      color = 'bird-blue';
    }

    this.birdColor = color;
  }


  toggleMenu() {
    this.menu = !this.menu;
    document.querySelector('html').scrollTop = 0
  }

  getBirdColor() {

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
  background: linear-gradient(90deg, rgba(255, 122, 0, 1) 0%, rgba(255, 122, 0, 1) 20%, rgba(255, 224, 0, 1) 20%, rgba(255, 224, 0, 1) 40%, rgba(74, 182, 59, 1) 40%, rgba(74, 182, 59, 1) 60%, rgba(15, 107, 215, 1) 60%, rgba(15, 107, 215, 1) 80%, rgba(69, 64, 182, 1) 80%, rgba(69, 64, 182, 1) 100%);
  height: 4px;
  width: 100%;
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
  @apply flex w-full justify-evenly px-10 items-center m-0 p-0 ;
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


.nav-links li a.yellow:hover, .nav-links li a.yellow.active {
  color: #ffb319;
}

.nav-links li a.blue:hover, .nav-links li a.blue.active {
  color: #0F6BD7;
}

.nav-links li a.green:hover, .nav-links li a.green.active {
  color: #6BCF3F;
}

.nav-links li a.purple:hover, .nav-links li a.purple.active {
  color: #624bcf;
}

.nav-links li a.red:hover, .nav-links li a.red.active {
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
  color: rgba(0,0,0,.6);
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

.logo-image svg,.logo-image svg, .logo-image svg,.logo-image svg * {
  transition: color ease-in-out 0.3s;
  will-change: color;
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


</style>
