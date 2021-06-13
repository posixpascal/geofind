import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  AnimatedLetters: () => import('../../components/animated-letters.vue' /* webpackChunkName: "components/animated-letters" */).then(c => wrapFunctional(c.default || c)),
  Box: () => import('../../components/box.vue' /* webpackChunkName: "components/box" */).then(c => wrapFunctional(c.default || c)),
  Button: () => import('../../components/button.vue' /* webpackChunkName: "components/button" */).then(c => wrapFunctional(c.default || c)),
  GameSettings: () => import('../../components/game-settings.vue' /* webpackChunkName: "components/game-settings" */).then(c => wrapFunctional(c.default || c)),
  GameSettingsView: () => import('../../components/game-settings-view.vue' /* webpackChunkName: "components/game-settings-view" */).then(c => wrapFunctional(c.default || c)),
  GameStartingDialog: () => import('../../components/GameStartingDialog.vue' /* webpackChunkName: "components/game-starting-dialog" */).then(c => wrapFunctional(c.default || c)),
  Icon: () => import('../../components/icon.vue' /* webpackChunkName: "components/icon" */).then(c => wrapFunctional(c.default || c)),
  Input: () => import('../../components/input.vue' /* webpackChunkName: "components/input" */).then(c => wrapFunctional(c.default || c)),
  Loading: () => import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c)),
  LoadingDialog: () => import('../../components/loading-dialog.vue' /* webpackChunkName: "components/loading-dialog" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  MainMenu: () => import('../../components/main-menu.vue' /* webpackChunkName: "components/main-menu" */).then(c => wrapFunctional(c.default || c)),
  OpenRoomSettingsView: () => import('../../components/open-room-settings-view.vue' /* webpackChunkName: "components/open-room-settings-view" */).then(c => wrapFunctional(c.default || c)),
  Pin: () => import('../../components/pin.vue' /* webpackChunkName: "components/pin" */).then(c => wrapFunctional(c.default || c)),
  PinSelection: () => import('../../components/pin-selection.vue' /* webpackChunkName: "components/pin-selection" */).then(c => wrapFunctional(c.default || c)),
  RoundEndDialog: () => import('../../components/RoundEndDialog.vue' /* webpackChunkName: "components/round-end-dialog" */).then(c => wrapFunctional(c.default || c)),
  RoundPrepareDialog: () => import('../../components/RoundPrepareDialog.vue' /* webpackChunkName: "components/round-prepare-dialog" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
