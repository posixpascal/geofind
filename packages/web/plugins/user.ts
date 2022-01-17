import { Context, Plugin } from '@nuxt/types'
import { Auth } from '~/models'
import { randomAnimalName } from '~/utils/animals'

const plugin: Plugin = async (context: Context, inject) => {
  const $auth = Auth
  inject('auth', $auth)

  if (!localStorage.username) {
    localStorage.username = randomAnimalName()
  }

  if (!localStorage.pin) {
    localStorage.pin = 1
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: typeof Auth
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $auth: Auth
  }
}

declare module '@nuxt/types' {
  interface Context {
    $auth: Auth
  }
}

export default plugin
