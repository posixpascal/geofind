<template>
  <footer>
    <div class='logo-stroked' v-html="require('~/assets/images/logo-outlined.svg?raw')"></div>
    <small class="block mb-5">
      {{ $t('t.madewithlove') }}
      <span class="text-red-600">&hearts;</span>.
      <a href="//github.com/posixpascal/geofind.io" target="_blank">{{ $t('t.opensource') }}
      </a>
      {{ $t('t.adfree') }}
    </small>
    <div class="block">
      <nuxt-link class='footer-link' :to="localePath('imprint')">{{ $t('t.imprint') }}</nuxt-link>
      <span class="hidden sm:inline-block">|</span>
      <nuxt-link class='footer-link' :to="localePath('privacypolicy')">{{ $t('t.privacy') }}</nuxt-link>
      <span class="hidden sm:inline-block">|</span>
      <nuxt-link class='footer-link' :to="localePath('language')">{{ $t('t.changeLanguage') }}</nuxt-link>
      <span class="hidden sm:inline-block">|</span>
      <a class='footer-link' href="https://gumroad.com/l/geofind" target="_blank">{{ $t('t.sponsor') }}</a>
      <span class="hidden sm:inline-block">|</span>
      <a class='footer-link' href="//github.com/posixpascal/geofind" target="_blank">{{ $t('t.source') }}</a>
      <!--| <nuxt-link :to="localePath('teachers')">{{ $t('t.educationalEdition') }}</nuxt-link>-->
    </div>
  </footer>
</template>
<script lang="ts">
import Component from "vue-class-component";
import Vue from 'vue';

@Component
export default class Footer extends Vue {

}
</script>
<style lang="postcss" scoped>
footer {
  @apply px-3 pt-7 pb-10 bg-white text-center text-gray-600 relative;
}

footer::after {
  @apply absolute top-0 left-0 right-0;
  content: '';
  background: linear-gradient(90deg, rgba(255,122,0,1) 0%, rgba(255,122,0,1) 20%, rgba(255,224,0,1) 20%, rgba(255,224,0,1) 40%, rgba(74,182,59,1) 40%, rgba(74,182,59,1) 60%, rgba(15,107,215,1) 60%, rgba(15,107,215,1) 80%, rgba(69,64,182,1) 80%, rgba(69,64,182,1) 100%);
  height: 4px;
  width: 100%;
  opacity: 1;
}

.footer-link {
  border-bottom-width: 1px;
  @apply flex p-3 text-sm border-dashed sm:border-0 sm:text-xs sm:inline sm:p-0 hover:text-green-500;
}
</style>
<style lang="postcss">
.logo-stroked svg {
  display: block;
  width: 96px;
  height: 96px;
  margin: 20px auto 10px;
}

.logo-stroked svg * {
  fill: #999;
}
</style>
