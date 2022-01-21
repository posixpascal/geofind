<template>
  <div class="flex flex-wrap scorecard">Scorecard</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class ScoreCard extends Vue {
  async created() {
    await this.$store.dispatch('user/fetch', {})
  }
}
</script>
<style lang="postcss" scoped></style>
