import {messages} from './i18n';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mit Freunden spielend Geographie lernen. | geofind.io.',
    htmlAttrs: {
      lang: 'de'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Das Geographie Multiplayer Ratespiel. Finde Länder, Hauptstädte, Sehenswürdigkeiten und Internet-Domains oder verbessere Deinen Wissensstand im Einzelspielermodus oder stelle Dein Können im Online Multiplayer mit bis zu 32 Spielern auf die Probe.'},
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Das Geographie Multiplayer Ratespiel. Finde Länder, Hauptstädte, Sehenswürdigkeiten und Internet-Domains oder verbessere Deinen Wissensstand im Einzelspielermodus oder stelle Dein Können im Online Multiplayer mit bis zu 32 Spielern auf die Probe.',
      },
      {hid: 'og:image', property: 'og:image', content: 'https://geofind.io/social.jpg'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'https://geofind.io/icon.png'},
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/leaflet/dist/leaflet.css'
      }
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
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/collyseus",
    "~/plugins/maps",
    "~/plugins/flags",
    "~/plugins/api",
    "~/plugins/user",
    "~/plugins/swiper"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
  dirs: [
    {
      path: '~/components',
      prefix: 'geo',
      global: true,
    },
  ],
},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    '@nuxtjs/svg'
  ],

  tailwindcss: {
    configPath: 'tailwind.config.js',
  },

 pwa: {
    name: 'geofind.io',
    description: 'Das Geographie Multiplayer Ratespiel. Finde Länder, Hauptstädte, Sehenswürdigkeiten und Internet-Domains oder verbessere Deinen Wissensstand im Einzelspielermodus oder stelle Dein Können im Online Multiplayer mit bis zu 32 Spielern auf die Probe.',
  },

  manifest: {
    name: 'GEOFIND',
    lang: 'de',
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
      {
        code: 'es',
        name: 'Spanish',
      },
      {
        code: 'fr',
        name: 'French',
      },
      {
        code: 'it',
        name: 'Italian'
      },
      {
        code: 'br',
        name: 'Brasil'
      },
      {
        code: 'jp',
        name: 'Japanese'
      },
      {
        code: 'nl',
        name: 'Dutch'
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
    'nuxt-i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
    }
  },

  publicRuntimeConfig: {
    collyseusUrl: process.env.COLLYSEUS_URL,
    backendUrl: process.env.BACKEND_URL
  },
}
