import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _abbd9860 = () => interopDefault(import('../pages/lobbies.vue' /* webpackChunkName: "pages/lobbies" */))
const _039813e8 = () => interopDefault(import('../pages/matchmaking.vue' /* webpackChunkName: "pages/matchmaking" */))
const _9876bd94 = () => interopDefault(import('../pages/multiplayer.vue' /* webpackChunkName: "pages/multiplayer" */))
const _00ea72ba = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _9aa68506 = () => interopDefault(import('../pages/singleplayer.vue' /* webpackChunkName: "pages/singleplayer" */))
const _40b40f25 = () => interopDefault(import('../pages/teachers.vue' /* webpackChunkName: "pages/teachers" */))
const _603caa74 = () => interopDefault(import('../pages/settings/pins.vue' /* webpackChunkName: "pages/settings/pins" */))
const _3c1ef220 = () => interopDefault(import('../pages/lobby/_id/index.vue' /* webpackChunkName: "pages/lobby/_id/index" */))
const _1b5f3bf6 = () => interopDefault(import('../pages/play/_id/index.vue' /* webpackChunkName: "pages/play/_id/index" */))
const _0cbf20a4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/lobbies",
    component: _abbd9860,
    name: "lobbies"
  }, {
    path: "/matchmaking",
    component: _039813e8,
    name: "matchmaking"
  }, {
    path: "/multiplayer",
    component: _9876bd94,
    name: "multiplayer"
  }, {
    path: "/settings",
    component: _00ea72ba,
    name: "settings"
  }, {
    path: "/singleplayer",
    component: _9aa68506,
    name: "singleplayer"
  }, {
    path: "/teachers",
    component: _40b40f25,
    name: "teachers"
  }, {
    path: "/settings/pins",
    component: _603caa74,
    name: "settings-pins"
  }, {
    path: "/lobby/:id",
    component: _3c1ef220,
    name: "lobby-id"
  }, {
    path: "/play/:id",
    component: _1b5f3bf6,
    name: "play-id"
  }, {
    path: "/",
    component: _0cbf20a4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
