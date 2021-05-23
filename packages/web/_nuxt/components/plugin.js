import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  AnimatedLetters: () => import('../../components/AnimatedLetters.vue' /* webpackChunkName: "components/animated-letters" */).then(c => wrapFunctional(c.default || c)),
  Box: () => import('../../components/Box.vue' /* webpackChunkName: "components/box" */).then(c => wrapFunctional(c.default || c)),
  Button: () => import('../../components/Button.vue' /* webpackChunkName: "components/button" */).then(c => wrapFunctional(c.default || c)),
  GameSettings: () => import('../../components/GameSettings.vue' /* webpackChunkName: "components/game-settings" */).then(c => wrapFunctional(c.default || c)),
  GameSettingsView: () => import('../../components/GameSettingsView.vue' /* webpackChunkName: "components/game-settings-view" */).then(c => wrapFunctional(c.default || c)),
  GameStartingDialog: () => import('../../components/GameStartingDialog.vue' /* webpackChunkName: "components/game-starting-dialog" */).then(c => wrapFunctional(c.default || c)),
  Icon: () => import('../../components/Icon.vue' /* webpackChunkName: "components/icon" */).then(c => wrapFunctional(c.default || c)),
  Input: () => import('../../components/Input.vue' /* webpackChunkName: "components/input" */).then(c => wrapFunctional(c.default || c)),
  Loading: () => import('../../components/Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c)),
  LoadingDialog: () => import('../../components/LoadingDialog.vue' /* webpackChunkName: "components/loading-dialog" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  MainMenu: () => import('../../components/MainMenu.vue' /* webpackChunkName: "components/main-menu" */).then(c => wrapFunctional(c.default || c)),
  OpenRoomSettingsView: () => import('../../components/OpenRoomSettingsView.vue' /* webpackChunkName: "components/open-room-settings-view" */).then(c => wrapFunctional(c.default || c)),
  Pin: () => import('../../components/Pin.vue' /* webpackChunkName: "components/pin" */).then(c => wrapFunctional(c.default || c)),
  PinSelection: () => import('../../components/PinSelection.vue' /* webpackChunkName: "components/pin-selection" */).then(c => wrapFunctional(c.default || c)),
  RoundEndDialog: () => import('../../components/RoundEndDialog.vue' /* webpackChunkName: "components/round-end-dialog" */).then(c => wrapFunctional(c.default || c)),
  RoundPrepareDialog: () => import('../../components/RoundPrepareDialog.vue' /* webpackChunkName: "components/round-prepare-dialog" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
