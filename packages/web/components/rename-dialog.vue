<template>
  <Dialog :show="show">
    <Panel>
      <template #title>
        <div
          class="flex justify-between px-5 items-center justify-between w-full"
        >
          <span class="text-3xl">Profil ändern</span>
          <Button @click="$emit('close')" xx-small variant="green">
            Speichern
          </Button>
        </div>
      </template>
      <template #content>
        <Input
          ref="name"
          autofocus="true"
          class="bg-gray-100 my-3"
          @change="setName()"
          v-model="name"
        />
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
          <div class="flex justify-center py-3">
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
