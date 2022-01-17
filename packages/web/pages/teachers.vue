<template>
  <div>
    <SellHeaders />
    <SellFeatures />
    <SellPricing />
    <SellFaq />
    <SellContact />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SellFeatures from "~/components/sell/sell-features.vue";
import {Component} from "vue-property-decorator";
import SellHeaders from "~/components/sell/sell-headers.vue";
import SellPricing from "~/components/sell/sell-pricing.vue";
import SellFaq from "~/components/sell/sell-faq.vue";
import SellContact from "~/components/sell/sell-contact.vue";

@Component({
  components: {SellContact, SellFaq, SellPricing, SellHeaders, SellFeatures},
  layout: 'product'
})
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
  @apply absolute top-0 left-0 right-0 bottom-0 px-20 bg-yellow-500 bg-opacity-40 flex items-center justify-center content-center flex-col;
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



</style>

