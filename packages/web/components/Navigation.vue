<template>
  <nav>
    <div class="main-typo flex items-center">
      <img style="min-width: 96px" width="96px" :src="require('~/assets/images/logo.svg')" class="logo-image relative"/>
      <nuxt-link to="/">
      <h1>GEOFIND.io</h1>
      <p class="hidden sm:inline-block">Das Geographie Spiel</p>
    </nuxt-link>
    </div>
    <ul class="nav-links">
      <li>
        <Icon name="school"/>
        Lernen
      </li>
      <li>
        <Icon name="controller"/>
        Spiel erstellen
      </li>
      <li>
        <Icon name="cube"/>
        Zufallsgegner
      </li>
      <li>
        <Icon name="public"/>
        Offene Spiele
      </li>
      <li>
        <Icon name="profile"/>
        Profil
      </li>
    </ul>
    <div class="ls"><LanguageSwitch /></div>
  </nav>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {PINS} from "~/constants/pins";
import LanguageSwitch from "~/components/LanguageSwitch.vue";
@Component({
  components: {LanguageSwitch}
})
export default class Navigation extends Vue {
}
</script>
<style lang="postcss" scoped>
nav {
  @apply flex py-4 px-10 bg-gray-100 border-b-2 border-gray-200 justify-between w-full items-center sticky relative top-0 z-50;
}

nav .ls {
  position: relative;
  top: 0;
}

nav h1 {
  @apply relative sm:text-4xl;
  position: relative;
  top: -8px;
  line-height: 0px;
}

nav .main-typo {
  text-align: center;
}

@media (max-width: 768px) {
  nav h1 {
    @apply text-4xl;
    top: -12px;
  }
}

nav img {
  @apply relative hidden sm:inline-block;
  left: -25px;
  top: 4px;
}

.nav-links {
  @apply flex w-full justify-evenly px-10 items-center m-0 p-0 max-w-5xl;
}

.nav-links li {
  @apply hidden sm:flex justify-center flex-col items-center uppercase;
  font-size: 12px;
}
</style>
<style>
.nav-links svg {
  width: 38px !important;
  height: 38px !important;
}
</style>
