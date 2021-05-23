<template>
  <div class="main-menu">
    <Logo>
      <template #before>
        <nuxt-link to="/">
          <Icon name="chevron-left"></Icon>
        </nuxt-link>
      </template>
      <template #after>
        <span style="width: 50px"></span>
      </template>
    </Logo>

    <!--<h3 class="mt-10">Hallo {{ user.displayName }}</h3>
    <Box v-if="user.isAnonymous" class="flex items-center flex-col justify-between items-stretch">
      Du hast noch keinen Account! Registriere dich um deine Erfolge langfristig zu speichern.

      <Button small to='/' variant="purple">Anmelden</Button>
      <Button small to='/' variant="purple">Registrieren</Button>
    </Box>-->

    <div class="mb-2 border-b-2 border-dashed border-gray-300">
      &nbsp;
    </div>

    <h3 class="mt-10">Name</h3>
    <Box class="flex items-center justify-between">
      <Input class="w-full" v-model="name" @change="setName()" :placeholder="user.displayName"/>
    </Box>

    <h3>Marker</h3>
    <Box class="flex items-center flex-col justify-center content-center items-stretch">
        <div class="flex justify-center py-3"><Pin :id="pin" width="96" /></div>
        <Button to="/settings/pins" x variant="yellow" small>CHANGE</Button>
    </Box>

    <h3>Map Style</h3>
    <Box class="flex items-center flex-col justify-between items-stretch">
      <div :class="`mb-10 cursor-pointer transition-all rounded shadow-lg`">
        <img :src="require(`~/assets/mapstyles/${user.mapStyleName}.png`)" class="rounded"/>
      </div>
        <Button to="/settings/maps" variant="yellow" small>CHANGE</Button>
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

  created(){
    this.name = this.user.displayName;
  }

  get pin(){
    return this.user.metadata.pin;
  }

  get user() : User {
    return this.$user.get();
  }

  setName($event){
    this.$store.dispatch("user/setName", this.name);
  }
}
</script>

