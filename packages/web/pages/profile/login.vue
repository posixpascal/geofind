<template>
  <div class="container">
    <main class="pt-0">
      <Panel :back="localePath('/profile')">
        <template #title>{{ $t('profile.register') }}</template>
        <template #content>
          <div id="login"></div>
        </template>
      </Panel>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Panel from '~/components/panel.vue'

@Component({
  components: { Panel },
  head: {
    script: [
      {
        src: 'https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css',
      },
    ],
  },
})
export default class LoginPage extends Vue {
  ui

  get firebaseui() {
    return (window as any).firebaseui
  }

  async mounted() {
    if (!(window as any).firebaseui) {
      await this.scriptAvailable()
    }

    this.renderFirebase()
  }

  renderFirebase() {
    if (this.ui) {
      this.ui.delete()
    }

    this.ui =
      this.firebaseui.auth.AuthUI.getInstance() ||
      new this.firebaseui.auth.AuthUI(this.firebase.auth())
    this.ui.start('#login', this.uiConfig)
  }

  get uiConfig() {
    return {
      signInSuccessUrl: '/profile',
      signInOptions: [
        this.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        this.firebase.auth.GithubAuthProvider.PROVIDER_ID,
        this.firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        this.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '/tos',
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
        window.location.assign('/privacypolicy')
      },
    }
  }

  get firebase() {
    return (window as any).firebase
  }

  async scriptAvailable() {
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if ((window as any).firebaseui) {
          clearInterval(interval)
          this.$nextTick(() => resolve(true))
        }
      }, 10)
    })
  }
}
</script>
