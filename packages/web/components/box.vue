<template>
  <div class="mb-10 rounded p-5 bg-gray-100">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Box extends Vue {}
</script>
