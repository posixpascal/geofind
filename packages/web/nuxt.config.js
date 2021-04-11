import {messages} from './i18n';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'geofind',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        type: 'module',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/plugins/CSSPlugin.min.js'
      },
      {
        type: 'module',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/easing/EasePack.min.js'
      },
      {
        type: "module",
        src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenLite.min.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/collyseus",
    "~/plugins/maps",
    "~/plugins/flags"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {
    configPath: 'tailwind.config.js',
  },

  // https://i18n.nuxtjs.org/options-reference#properties
  i18n: {
    locales: [{
      code: 'en',
      name: 'English',
    },
      {
        code: 'de',
        name: 'Deutsch',
      },
    ],
    defaultLocale: 'de',
    vueI18n: {
      fallbackLocale: 'de',
      messages,
    },
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config){
    }
  },

  publicRuntimeConfig: {
    collyseusUrl: process.env.COLLYSEUS_URL,
  },
}
