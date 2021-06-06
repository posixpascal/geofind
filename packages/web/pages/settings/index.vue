<template>
  <div class="main-menu">
    <h1 class="mt-5 mb-0">{{ $t('profile.title') }}</h1>


    <!--<h3 class="mt-10">Hallo {{ user.displayName }}</h3>
    <Box v-if="user.isAnonymous" class="flex items-center flex-col justify-between items-stretch">
      Du hast noch keinen Account! Registriere dich um deine Erfolge langfristig zu speichern.

      <Button small to='/' variant="purple">Anmelden</Button>
      <Button small to='/' variant="purple">Registrieren</Button>
    </Box>-->

    <h3 class="mt-10">{{ $t('t.name') }}</h3>
    <Box class="flex items-center justify-between">
      <Input class="w-full" v-model="name" @change="setName()" :placeholder="user.displayName"/>
    </Box>

    <h3>{{ $t('t.pin') }}</h3>
    <Box class="flex items-center flex-col justify-center content-center items-stretch">
      <div class="flex justify-center py-3">
        <Pin :id="pin" width="96"/>
      </div>
      <Button :to="localePath('/settings/pins')" x variant="yellow" small>{{ $t('t.change') }}</Button>
    </Box>

    <h3>{{ $t('t.mapStyle') }}</h3>
    <Box class="flex items-center flex-col justify-between items-stretch">
      <div :class="`mb-10 cursor-pointer transition-all rounded shadow-lg`">
        <img :src="require(`~/assets/mapstyles/${user.mapStyleName}.png`)" class="rounded"/>
      </div>
      <Button :to="localePath('/settings/maps')" variant="yellow" small>{{ $t('t.change') }}</Button>
    </Box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import {User} from "~/models";

@Component
export default class SettingsPage extends Vue {
  name = "";

  created() {
    this.name = this.user.displayName;
  }

  get pin() {
    return this.user.metadata.pin;
  }

  get user(): User {
    return this.$user.get();
  }

  setName($event) {
    this.$store.dispatch("user/setName", this.name);
  }
}
</script>

