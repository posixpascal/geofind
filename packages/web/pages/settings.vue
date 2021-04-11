<template>
  <div class="container">
    <Logo />
    Hello <span>{{ user.displayName }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component
export default class SettingsPage extends Vue {
  created(){
    console.log(this.$collyseus.auth);
  }

  get user(){
    return this.$collyseus.auth;
  }
}
</script>

