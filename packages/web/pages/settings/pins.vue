<template>
  <div class="main-menu">
    <h3 class="mt-5">{{ $t('profile.selectMarker') }}</h3>
    <Box class="">
      <PinSelection :initial="user.metadata.pin" @change="setPin" />
    </Box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component
export default class SettingsPage extends Vue {
  name = "";

  get user(){
    return this.$user.get();
  }

  setPin($event){
    this.$store.dispatch("user/setPin", $event);
  }

  setName($event){
    this.$store.dispatch("user/setName", this.name);
  }
}
</script>

