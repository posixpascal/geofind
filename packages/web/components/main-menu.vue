<template>
  <div class="main-menu pt-0">
    <Button
      :icon="true"
      v-if="false"
      :to="localePath('/tutor')"
      variant="green"
      :animated="true"
    >
      <template #icon>
        <Icon class="text-white" :height="48" name="controller" />
      </template>
      {{ $t('singleplayer.button') }}
    </Button>

    <Button
      :icon="true"
      :to="localePath('/multiplayer')"
      variant="blue"
      :animated="true"
    >
      <template #icon>
        <Icon class="text-white" :height="48" name="create" />
      </template>
      {{ $t('multiplayer.button') }}
    </Button>
    <Button
      :icon="true"
      :to="localePath('lobbies')"
      variant="purple"
      :animated="true"
    >
      <template #icon>
        <Icon class="text-white" :height="48" name="public" />
      </template>
      {{ $t('lobbies.button') }}
    </Button>
    <Button
      :icon="true"
      :to="localePath('/matchmaking')"
      variant="red"
      :animated="true"
    >
      <template #icon>
        <Icon class="text-white" :height="48" name="cube" />
      </template>
      {{ $t('matchmaking.button') }}
    </Button>

    <!--<Button to="teachers" variant="blue" :animated="true">
      <template #icon>👩‍🏫</template>
      Teacher Zone
    </Button>-->
    <Button
      :icon="true"
      :to="localePath('profile')"
      variant="yellow"
      :animated="true"
    >
      <template #icon>
        <Icon class="text-white" :height="48" name="profile" />
      </template>
      {{ $t('profile.button') }}
    </Button>

    <!--
    <Button variant="orange" :animated="true">
      <template #icon>🥇</template>
      Achievements
    </Button>
    <Button variant="blue" :animated="true">
      <template #icon>⚙️</template>
      ️ Settings
    </Button>-->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Button from '~/components/button.vue'
import Footer from '~/components/footer.vue'

@Component({
  components: { Button, Footer },
})
export default class MainMenu extends Vue {}
</script>
<style lang="postcss">
.main-menu {
  margin: 0 auto;
  padding-bottom: 80px;
}

.main-menu svg {
  width: 48px;
  position: relative;
  top: 5px;
}

@media (max-width: 768px) {
  .main-menu {
    margin: 0 20px;
  }
}

@media (min-width: 768px) {
  .main-menu {
  }
}
</style>
