<template>
  <div class="container">
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
    <Box class="flex items-center justify-between">
	    <h3>Your Name</h3>
      <Input v-model="name" @change="setName()" :placeholder="user.displayName"/>
    </Box>

    <Box class="flex items-center justify-between">
      <h3>Your Map Pin</h3>
      <div class="flex items-center">
        <Pin :id="pin" size="46" />
        <Button to="/settings/pins" class="pl-5" variant="yellow" x-small>CHANGE</Button>
      </div>
    </Box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component
export default class SettingsPage extends Vue {
  name = "";

  get pin(){
    return this.user.metadata.pin;
  }

  get user(){
    console.log(this.$user.get());
    return this.$user.get();
  }

  setName($event){
    this.$store.dispatch("user/setName", this.name);
  }
}
</script>

