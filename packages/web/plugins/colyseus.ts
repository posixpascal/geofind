import { Context, Plugin } from '@nuxt/types'
import * as Colyseus from 'colyseus.js'
import {PINS} from "~/constants/pins";

const plugin: Plugin = async (context: Context, inject) => {
  const client = new Colyseus.Client(context.$config.colyseusUrl)
  if (!window.localStorage.getItem('pin')){
    window.localStorage.setItem('pin', `${Math.floor(Object.keys(PINS).length * Math.random()) + 1}`)
  }
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
