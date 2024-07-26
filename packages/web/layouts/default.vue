<template>
  <div class="bg-gray-200 dark:bg-gray-800">
    <Navigation />
    <main class="">
      <div class="z-10"><Nuxt /></div>
    </main>
    <Footer />
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import MapBackground from '~/components/map-background.vue'
import Navigation from '~/components/navigation.vue'
import Vue from 'vue'

@Component({
  components: { Navigation, MapBackground },
})
export default class DefaultLayout extends Vue {
  @Watch('$route.name')
  trackAnalytics() {
    const fathom = (window as any).fathom

  }
}
</script>
<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap');
.font-lucky {
  position: relative;
  top: 3px;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.lucky {
  font-family: 'Luckiest Guy';
}

input.lucky {
  padding-top: 15px !important;
}

h1 {
  @apply text-6xl text-center pt-10;
  font-family: 'Luckiest Guy';
}

h2 {
  font-family: 'Luckiest Guy';
}

h3 {
  font-family: 'Luckiest Guy';
  border-bottom: none;
  padding-bottom: 0 !important;
}

.panel > h3 {
  padding-bottom: 7px !important;
}

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

@media (min-width: 1024px) {
  .main-menu {
    width: 720px;
  }
}

main {
  min-height: calc(100vh - 120px - 185px);
}
</style>
