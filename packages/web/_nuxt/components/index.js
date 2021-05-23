export { default as AnimatedLetters } from '../../components/AnimatedLetters.vue'
export { default as Box } from '../../components/Box.vue'
export { default as Button } from '../../components/Button.vue'
export { default as GameSettings } from '../../components/GameSettings.vue'
export { default as GameSettingsView } from '../../components/GameSettingsView.vue'
export { default as GameStartingDialog } from '../../components/GameStartingDialog.vue'
export { default as Icon } from '../../components/Icon.vue'
export { default as Input } from '../../components/Input.vue'
export { default as Loading } from '../../components/Loading.vue'
export { default as LoadingDialog } from '../../components/LoadingDialog.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as MainMenu } from '../../components/MainMenu.vue'
export { default as OpenRoomSettingsView } from '../../components/OpenRoomSettingsView.vue'
export { default as Pin } from '../../components/Pin.vue'
export { default as PinSelection } from '../../components/PinSelection.vue'
export { default as RoundEndDialog } from '../../components/RoundEndDialog.vue'
export { default as RoundPrepareDialog } from '../../components/RoundPrepareDialog.vue'

export const LazyAnimatedLetters = import('../../components/AnimatedLetters.vue' /* webpackChunkName: "components/animated-letters" */).then(c => wrapFunctional(c.default || c))
export const LazyBox = import('../../components/Box.vue' /* webpackChunkName: "components/box" */).then(c => wrapFunctional(c.default || c))
export const LazyButton = import('../../components/Button.vue' /* webpackChunkName: "components/button" */).then(c => wrapFunctional(c.default || c))
export const LazyGameSettings = import('../../components/GameSettings.vue' /* webpackChunkName: "components/game-settings" */).then(c => wrapFunctional(c.default || c))
export const LazyGameSettingsView = import('../../components/GameSettingsView.vue' /* webpackChunkName: "components/game-settings-view" */).then(c => wrapFunctional(c.default || c))
export const LazyGameStartingDialog = import('../../components/GameStartingDialog.vue' /* webpackChunkName: "components/game-starting-dialog" */).then(c => wrapFunctional(c.default || c))
export const LazyIcon = import('../../components/Icon.vue' /* webpackChunkName: "components/icon" */).then(c => wrapFunctional(c.default || c))
export const LazyInput = import('../../components/Input.vue' /* webpackChunkName: "components/input" */).then(c => wrapFunctional(c.default || c))
export const LazyLoading = import('../../components/Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const LazyLoadingDialog = import('../../components/LoadingDialog.vue' /* webpackChunkName: "components/loading-dialog" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyMainMenu = import('../../components/MainMenu.vue' /* webpackChunkName: "components/main-menu" */).then(c => wrapFunctional(c.default || c))
export const LazyOpenRoomSettingsView = import('../../components/OpenRoomSettingsView.vue' /* webpackChunkName: "components/open-room-settings-view" */).then(c => wrapFunctional(c.default || c))
export const LazyPin = import('../../components/Pin.vue' /* webpackChunkName: "components/pin" */).then(c => wrapFunctional(c.default || c))
export const LazyPinSelection = import('../../components/PinSelection.vue' /* webpackChunkName: "components/pin-selection" */).then(c => wrapFunctional(c.default || c))
export const LazyRoundEndDialog = import('../../components/RoundEndDialog.vue' /* webpackChunkName: "components/round-end-dialog" */).then(c => wrapFunctional(c.default || c))
export const LazyRoundPrepareDialog = import('../../components/RoundPrepareDialog.vue' /* webpackChunkName: "components/round-prepare-dialog" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
export function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
