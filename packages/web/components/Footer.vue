<template>
  <div class="pb-5">
  <small class="block text-center text-gray-400">
    {{ $t('t.madewithlove') }}
    <span class="text-red-600">&hearts;</span>.
    <a href="//github.com/posixpascal/geofind.io" target="_blank">{{ $t('t.opensource') }}
    </a>
    {{ $t('t.adfree') }}
  </small>
  <small class="block text-center text-gray-400">
    <nuxt-link :to="localePath('imprint')">{{ $t('t.imprint') }}</nuxt-link> |
    <nuxt-link :to="localePath('privacypolicy')">{{ $t('t.privacy') }}</nuxt-link> |
    <nuxt-link :to="localePath('sponsor')">{{ $t('t.sponsor') }}</nuxt-link> |
    <a href="//github.com/posixpascal/geofind" target="_blank">{{ $t('t.source') }}</a> |
    <nuxt-link :to="localePath('teachers')">{{ $t('t.educationalEdition') }}</nuxt-link></small>
  </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import Vue from 'vue';

@Component
export default class Footer extends Vue {

}
</script>
