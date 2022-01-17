<template>
  <div>
    <div class="container">
      <GuestNameIndicator />
      <MainMenu/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import Logo from "~/components/logo.vue";
import MainMenu from "~/components/main-menu.vue";
import Navigation from "~/components/navigation.vue";
import Pin from "~/components/pin.vue";
import GuestNameIndicator from "~/components/guest-name-indicator.vue";

@Component({
  components: {Pin, MainMenu, GuestNameIndicator}
})
export default class IndexPage extends Vue {
}
</script>

<style>
.container {
  margin: 0 auto;
  max-width: 720px;
}

.title {
  font-family: 'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
