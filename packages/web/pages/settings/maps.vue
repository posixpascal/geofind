<template>
  <div class="main-menu">
    <h3 class="mt-5">{{ $t('mapStyles.title') }}</h3>
    <Box class="">
      <div v-for="style in styles"
           @click="setMap(style)"
           :key="style"
           :class="`mb-10 cursor-pointer shadow transition-all rounded  ${currentStyle === style ? 'bg-yellow-400' : 'bg-white'} hover:shadow-lg`">
        <img :src="require(`~/assets/mapstyles/${style}.png`)" class="rounded-t"/>
        <div class="p-3 flex justify-between">
          <span>{{ $t(`mapStyles.${style}`) }}</span>
        </div>
      </div>
    </Box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component
export default class MapSettingsPage extends Vue {
  name = "";

  styles = [
    "basic",
    "avocado",
    "bluewhite",
    "cobalt",
    "cyan",
    "gray",
    "midnight",
    "pale",
    "suddendeath",
    "contrast"
  ]

  setMap(style) {
    this.$store.dispatch("user/setMap", style);
  }

  get currentStyle() {
    return this.user.metadata.mapStyle || "default";
  }

  get user() {
    return this.$user.get();
  }
}
</script>

