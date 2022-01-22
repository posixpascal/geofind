<template>
  <div>
    <div id="login"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
head: {
    script: [
      {
        src: 'https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
href: 'https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css'
      }
    ]
  }
})
export default class LoginPage extends Vue {
  ui;

  async created(){
    if (!(window as any).firebaseui) {
      await this.scriptAvailable();
    }

    this.ui.start('#login', {
      signInOptions: [
        this.firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
    });
  }

  get firebase(){
    return (window as any).firebase;
  }

  async scriptAvailable(){
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if ((window as any).firebaseui){
          clearInterval(interval);
          this.ui = new (window as any).firebaseui.auth.AuthUI(this.firebase.auth());
          this.$nextTick(() => resolve(true));
        }
      }, 10);
    })
  }
}
</script>
