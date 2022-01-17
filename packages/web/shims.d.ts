import { Swiper } from 'swiper'
import { Socket } from '~/plugins/websockets'
import { NuxtSocket } from 'nuxt-socket-io'

declare module '*.vue' {
  interface Vue {
    $notify: any
    $socket: any
    $nuxtSocket: NuxtSocket
    $pub: (event: string, data: any, callback?: Function) => void
    Flag: any
  }

  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $nuxtSocket: any
    $pub: (event: string, data: any, callback?: Function) => void
  }
}

declare module '@nuxt/types' {
  interface Context {
    $swiper: Swiper
    $pub: (event: string, data: any, callback?: Function) => void
    $nuxtSocket: any
  }
}
