import { Context, Plugin } from '@nuxt/types'
import * as Colyseus from 'colyseus.js'

const plugin: Plugin = async (context: Context, inject) => {
  const client = new Colyseus.Client(context.$config.colyseusUrl)
  inject('colyseus', client)
}

declare module '@nuxt/types' {
  interface Context {
    $colyseus: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $colyseus: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $colyseus: any
  }
}

export default plugin
