<template>
  <div>
    <div class="banner" :style="bannerStyle">
      <div class="banner-overlay">
        <h2>Die Geographie Lernsoftware.</h2>
        <h3>Spielerisch die Grundlagen der Geographie meistern.</h3>
        <h3>Digital. Sicher. Zugänglich.</h3>
        <h4><Flag
          :hasBorderRadius="true"
          size="l"
          class="flag"
          gradient="real-linear"
          :code="germany"/> Made in Germany </h4>
      </div>
    </div>
    <div class="container">
      <section class="flex">
        <img src="//placehold.it/400x600" />
        <aside>
          <h3>Geofind ist cool.</h3>
        </aside>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component
export default class TeachersPage extends Vue {
  get background(){
    const image = require('~/assets/images/together.jpg');
    console.log(image);
    return image;
  }

  get bannerStyle(){
    return {
      'background-image': `url(${this.background})`
    }
  }

  get germany(){
    return 'DE';
  }
}
</script>
<style lang="postcss" scoped>

.container {
  @apply max-w-7xl py-20;
}

.banner {
  @apply text-white text-4xl font-lucky p-5 pt-7 bg-cover relative bg-center flex items-center justify-center content-center;
  min-height: 500px;
}

.banner-overlay {
  @apply absolute top-0 left-0 right-0 bottom-0 px-20 bg-blue-500 bg-opacity-70 flex items-center justify-center content-center flex-col;
  text-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 0 50px rgba(216, 216, 216, .3);

}

.banner-overlay h2 {
  @apply text-8xl text-center mb-3;
}

.banner-overlay h3 {
  @apply text-5xl text-center mb-3;
}


.banner-overlay h4 {
  @apply text-3xl text-center mt-3;
}


.flag {
  position: relative;
  top: 0px;
  border: none;
}

</style>

