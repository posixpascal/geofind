<template>
  <div class="main-menu">
    <Logo>
      <template #before>
        <nuxt-link :to="localePath('/settings')">
          <Icon name="chevron-left"></Icon>
        </nuxt-link>
      </template>
      <template #after>
        <span style="width: 50px"></span>
      </template>
    </Logo>

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

