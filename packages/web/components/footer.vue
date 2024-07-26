<template>
  <footer class="px-3 pt-7 pb-10 text-center text-gray-600 relative  dark:text-gray-200">
    <div
      class="logo-stroked"
      v-html="require('~/assets/images/logo-outlined.svg?raw')"
    ></div>
    <small class="block mb-5">
      {{ $t('t.madewithlove') }}
      <span class="text-red-600">&hearts;</span>.
      <a href="//github.com/posixpascal/geofind" target="_blank"
        >{{ $t('t.opensource') }}
      </a>
      {{ $t('t.adfree') }}
    </small>
    <div class="block text-center">
      <nuxt-link class="footer-link" :to="localePath('imprint')">{{
        $t('t.imprint')
      }}</nuxt-link>
      <span class="hidden sm:inline-block">&bullet;</span>
      <nuxt-link class="footer-link" :to="localePath('privacypolicy')">{{
        $t('t.privacy')
      }}</nuxt-link>
      <span class="hidden sm:inline-block">&bullet;</span>
      <nuxt-link
        class="footer-link"
        v-if="false"
        :to="localePath('language')"
        >{{ $t('t.changeLanguage') }}</nuxt-link
      >
      <a
        class="footer-link"
        href="https://gumroad.com/l/geofind"
        target="_blank"
        >{{ $t('t.sponsor') }}</a
      >
      <span class="hidden sm:inline-block">&bullet;</span>
      <a
        class="footer-link"
        href="//github.com/posixpascal/geofind"
        target="_blank"
        >{{ $t('t.source') }}</a
      >
      <!--| <nuxt-link :to="localePath('teachers')">{{ $t('t.educationalEdition') }}</nuxt-link>-->
    </div>
  </footer>
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class Footer extends Vue {}
</script>
<style lang="postcss" scoped>
footer::after {
  @apply absolute bottom-0 left-0 right-0;
  content: '';
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
  height: 8px;
  width: 100%;
  opacity: 1;
}

.footer-link {
  border-bottom-width: 1px;
  @apply p-3 text-sm border-dashed block md:inline sm:border-0 text-center sm:text-xl sm:p-0 hover:text-green-500;
}

.block {
  @apply sm:text-xl;
}
</style>
<style lang="postcss">
.logo-stroked svg {
  display: block;
  width: 128px;
  height: 128px;
  margin: 20px auto 10px;
}

.logo-stroked svg * {
  @apply fill-current text-gray-400 dark:text-gray-200;
}
</style>
