<template>
  <Dialog  classes="bg-white dark:bg-gray-800">
    <h2>Waiting for Players...</h2>
    <div v-for="player in game.sessions">
      <span v-if="player.isReady">✅</span>
      <span v-else>🕐</span>
      {{ player.user.username }}
    </div>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Dialog from '~/components/dialog.vue'

@Component({
  components: { Dialog },
})
export default class LoadingDialog extends Vue {}
</script>
<style lang="postcss" scoped></style>
