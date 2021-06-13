export { default as AnimatedLetters } from '../../components/animated-letters.vue'
export { default as Box } from '../../components/box.vue'
export { default as Button } from '../../components/button.vue'
export { default as GameSettings } from '../../components/game-settings.vue'
export { default as GameSettingsView } from '../../components/game-settings-view.vue'
export { default as GameStartingDialog } from '../../components/GameStartingDialog.vue'
export { default as Icon } from '../../components/icon.vue'
export { default as Input } from '../../components/input.vue'
export { default as Loading } from '../../components/loading.vue'
export { default as LoadingDialog } from '../../components/loading-dialog.vue'
export { default as Logo } from '../../components/logo.vue'
export { default as MainMenu } from '../../components/main-menu.vue'
export { default as OpenRoomSettingsView } from '../../components/open-room-settings-view.vue'
export { default as Pin } from '../../components/pin.vue'
export { default as PinSelection } from '../../components/pin-selection.vue'
export { default as RoundEndDialog } from '../../components/RoundEndDialog.vue'
export { default as RoundPrepareDialog } from '../../components/RoundPrepareDialog.vue'

export const LazyAnimatedLetters = import('../../components/animated-letters.vue' /* webpackChunkName: "components/animated-letters" */).then(c => wrapFunctional(c.default || c))
export const LazyBox = import('../../components/box.vue' /* webpackChunkName: "components/box" */).then(c => wrapFunctional(c.default || c))
export const LazyButton = import('../../components/button.vue' /* webpackChunkName: "components/button" */).then(c => wrapFunctional(c.default || c))
export const LazyGameSettings = import('../../components/game-settings.vue' /* webpackChunkName: "components/game-settings" */).then(c => wrapFunctional(c.default || c))
export const LazyGameSettingsView = import('../../components/game-settings-view.vue' /* webpackChunkName: "components/game-settings-view" */).then(c => wrapFunctional(c.default || c))
export const LazyGameStartingDialog = import('../../components/GameStartingDialog.vue' /* webpackChunkName: "components/game-starting-dialog" */).then(c => wrapFunctional(c.default || c))
export const LazyIcon = import('../../components/icon.vue' /* webpackChunkName: "components/icon" */).then(c => wrapFunctional(c.default || c))
export const LazyInput = import('../../components/input.vue' /* webpackChunkName: "components/input" */).then(c => wrapFunctional(c.default || c))
export const LazyLoading = import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const LazyLoadingDialog = import('../../components/loading-dialog.vue' /* webpackChunkName: "components/loading-dialog" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../components/logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyMainMenu = import('../../components/main-menu.vue' /* webpackChunkName: "components/main-menu" */).then(c => wrapFunctional(c.default || c))
export const LazyOpenRoomSettingsView = import('../../components/open-room-settings-view.vue' /* webpackChunkName: "components/open-room-settings-view" */).then(c => wrapFunctional(c.default || c))
export const LazyPin = import('../../components/pin.vue' /* webpackChunkName: "components/pin" */).then(c => wrapFunctional(c.default || c))
export const LazyPinSelection = import('../../components/pin-selection.vue' /* webpackChunkName: "components/pin-selection" */).then(c => wrapFunctional(c.default || c))
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
