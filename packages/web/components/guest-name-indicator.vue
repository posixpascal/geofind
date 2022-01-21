<template>
  <div class="main-menu pt-10" style="padding-bottom: 0 !important">
    <div v-if="isLoading">
      Verbinde mit Geofind Server ..<span v-if="ticks % 2 === 0">.</span>
    </div>
    <RenameDialog v-if="currentUser" :show="rename" @close="rename = false" />
    <div
      class="info-banner animate__animated animate__headShake"
      v-if="currentUser && !currentUser.isRegistered"
    >
      <div>
        <div
          v-html="require('~/assets/images/logo.svg?raw')"
          :class="`pb-3 logo-image relative bird-yellow`"
        ></div>
      </div>
      <div>
        <div class="flex justify-between items-center">
          <div class="pr-5">
            <div class="flex pt-2">
              Dein Name:
              <h2 class="text-xl ml-5">{{ currentUser.username }}</h2>
            </div>
          </div>
          <div>
            <Button @click="rename = true" animated xx-small variant="yellow"
              >Name ändern</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import Button from '~/components/button.vue'
import RenameDialog from '~/components/rename-dialog.vue'
import Vue from 'vue'

@Component({
  components: { Button, RenameDialog },
})
export default class GuestNameIndicator extends Vue {
  rename = false
  isLoading = false
  ticks = 0
  socket = null
  status = {}

  get currentUser() {
    return this.$auth.user
  }
}
</script>
<style lang="css" scoped>
.info-banner {
  @apply flex justify-between shadow-xl items-center bg-white rounded p-3 w-full;
}

svg {
  height: 96px !important;
  width: 96px !important;
}
</style>
