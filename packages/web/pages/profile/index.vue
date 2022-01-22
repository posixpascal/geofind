<template>
  <div class="main-menu pt-10">
    <Panel back="/">
      <template #title>
        {{ $t('profile.title') }}
      </template>
      <template #content>
        <h3 class="mt-10">{{ $t('t.name') }}</h3>
        <p class="mb-3 text-center"> {{ $t('profile.nameDescription') }}</p>
        <Box class="flex items-center justify-between">
          <Input
            class="w-full bg-white"
            v-model="name"
            @change="setName()"
            :placeholder="name"
          />
        </Box>

        <h3 class="pb-0">{{ $t('t.pin') }}</h3>
        <p class="mb-3 text-center">
          {{ $t('profile.pinDescription') }}
        </p>
        <Box
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
            <PinSelection :initial="pin" @change="setPin" />
          </div>
        </Box>
      </template>
    </Panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Box from '~/components/box.vue'
import PinSelection from '~/components/pin-selection.vue'
import Panel from '~/components/panel.vue'
import Button from '~/components/button.vue'
import Input from '~/components/input.vue'

@Component({
  components: { Box, PinSelection, Input, Panel, Button },
})
export default class SettingsPage extends Vue {
  name = ''
  pin = 1

  created() {
    this.name = localStorage.getItem('username')
    this.pin = parseInt(localStorage.getItem('pin'))
  }
  setName($event) {
    localStorage.username = this.name
  }

  setPin({ pin }) {
    localStorage.pin = pin
  }
}
</script>
