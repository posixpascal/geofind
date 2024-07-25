<template>
  <Dialog classes="bg-white dark:bg-gray-800" v-if="room">
    <h2>{{ $t('t.gameStartsIn') }}</h2>
    <h3>{{ room.gameStartsIn }}</h3>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Room } from '~/models'
import Dialog from '~/components/dialog.vue'
@Component({
  components: { Dialog },
})
export default class GameStartingDialog extends Vue {
  @Prop() room!: Room
}
</script>
<style lang="postcss" scoped></style>
