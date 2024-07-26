<template>
  <Dialog :show="show" classes="bg-transparent mt-10">
    <Panel>
      <template #title>
        <div
          class="flex justify-end px-3 items-center w-full"
        >
          <button class="relative -top-3" @click="$emit('close')">
            <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </button>
        </div>
      </template>
      <template #content>
        Name:
        <Input
          ref="name"
          autofocus="true"
          class="bg-gray-100 my-3"
          @change="setName()"
          v-model="name"
        />
        Pin:
        <Box
          v-if="player"
          class="
            flex
            items-center
            flex-col
            justify-center
            content-center
            items-stretch
          "
        >
          <div
            class="flex justify-center py-3"
            style="max-height: 380px; overflow: auto"
          >
            <PinSelection :initial="player.pin" @change="setPin" />
          </div>
        </Box>
      </template>
    </Panel>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
import Dialog from '~/components/dialog.vue'
import Panel from '~/components/panel.vue'
import Button from '~/components/button.vue'

@Component({ components: { Dialog, Panel, Button } })
export default class RenameDialog extends Vue {
  @Prop() show
  @Prop() player
  @Prop() room
  name = ''
  rename = false

  created() {
    this.name = localStorage.username
    setTimeout(
      () =>
        this.$nextTick(() => {
          if (!this.$refs.name) {
            return
          }
          ;((this.$refs.name as any).$el as HTMLInputElement).focus()
        }),
      300
    )
  }

  async setName() {
    localStorage.setItem('username', this.name)
    await this.$store.dispatch('room/message', {
      room: this.room,
      type: 'user/update',
      data: {
        username: this.name,
      },
    })
  }

  async setPin({ pin }) {
    localStorage.setItem('pin', pin)
    await this.$store.dispatch('room/message', {
      room: this.room,
      type: 'user/update',
      data: {
        pin,
      },
    })
  }
}
</script>
<style lang="postcss" scoped></style>
<style>
.player-list img {
  position: relative;
  top: 8px;
}

.panel-icon {
  position: relative;
  top: -4px;
}
</style>
