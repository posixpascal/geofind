<template>
  <div>
  </div>
</template>
<script>
import {Component, Vue} from "vue-property-decorator";

@Component
export default class AuthPage extends Vue {
  get user(){
    return this.$store.state.auth.user;
  }
}
</script>
