<template>
  <div class="main-menu">
    <div class="flex justify-between mb-5 mt-5">
      <img :src="require('~/assets/gamemodes/countries.svg')" width="80"/>
      <img :src="require('~/assets/mapsets/africa.svg')" width="45"/>
      <img :src="require('~/assets/mapsets/asia.svg')" width="60"/>
      <img :src="require('~/assets/mapsets/islands.svg')" width="60"/>
      <img :src="require('~/assets/mapsets/europe.svg')" width="45"/>
    </div>
    <p class="text-center">
      {{ $t('t.about') }}
    </p>

    <Button :to="localePath('/singleplayer')" variant="green" :animated="true">
      <template #icon>🕹</template>
      {{ $t('singleplayer.cta') }}
    </Button>
    <Button :to="localePath('/matchmaking')" variant="red" :animated="true">
      <template #icon>⚡</template>
      ️ {{ $t('matchmaking.cta') }}
    </Button>
    <Button :to="localePath('/multiplayer')" variant="blue" :animated="true">
      <template #icon>🌟</template>
      {{ $t('multiplayer.cta') }}
    </Button>
    <Button :to="localePath('lobbies')" variant="purple" :animated="true">
      <template #icon>🎮</template>
      {{ $t('lobbies.cta') }}
    </Button>
    <!--<Button to="teachers" variant="blue" :animated="true">
      <template #icon>👩‍🏫</template>
      Teacher Zone
    </Button>-->
    <Button :to="localePath('settings')" variant="yellow" :animated="true">
      <template #icon>🎨</template>
      {{ $t('profile.cta') }}
    </Button>
    <!--
    <Button variant="orange" :animated="true">
      <template #icon>🥇</template>
      Achievements
    </Button>
    <Button variant="blue" :animated="true">
      <template #icon>⚙️</template>
      ️ Settings
    </Button>-->
    <small class="block text-center text-gray-400">
      {{ $t('t.madewithlove') }}
      <span class="text-red-600">&hearts;</span>.
      <a href="//github.com/posixpascal/geofind.io" target="_blank">{{ $t('t.opensource') }}
      </a>
    </small>
    <small class="block text-center text-gray-400">
      <nuxt-link :to="localePath('imprint')">{{ $t('t.imprint') }}</nuxt-link> |
      <nuxt-link :to="localePath('privacy')">{{ $t('t.privacy') }}</nuxt-link> |
      <a href="//github.com/posixpascal/geofind" target="_blank">{{ $t('t.source') }}</a> |
      <nuxt-link :to="localePath('teachers')">{{ $t('t.educationalEdition') }}</nuxt-link></small>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Button from "~/components/Button.vue";
import {User} from "~/models";

@Component({
  components: {Button}
})
export default class MainMenu extends Vue {
  get user() : User {
    return this.$user.get();
  }
}
</script>
<style lang="postcss">
.main-menu {
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-menu {
    margin: 0 20px;
  }
}

@media (min-width: 768px) {
  .main-menu {
    width: 500px;
  }
}
</style>
