<template>
  <div class="p-5 container">
    <Panel>
      <template #title>Wo bin ich hier?</template>
      <template #content>
        Willkommen auf Geofind.io! Einem Online Multiplayer Geographie Ratespiel
        für Dich und Deine Freunde. Auf Geofind musst du dein Geographie-Wissen
        zur Probe stellen, finde Länder und Städte auf der ganzen Welt und messe
        dich gegen deine Freunde.
        <br />
        <br />
        <Button to="/multiplayer" xx-small variant="blue"
          >Alles klar, los gehts!</Button
        >
      </template>
    </Panel>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Vue } from 'vue-property-decorator'
import Panel from '~/components/panel.vue'
import Button from '~/components/button.vue'

@Component({
  components: { Button, Panel },
})
export default class ImprintPage extends Vue {}
</script>
<style lang="postcss" scoped>
h2 {
  @apply text-2xl;
  margin-top: 40px;
}

h3 {
  font-size: 24px !important;
  margin-bottom: 10px !important;
  padding-bottom: 0 !important;
}

h4 {
  @apply text-lg;
}
</style>
