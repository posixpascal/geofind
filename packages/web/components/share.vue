<template>
  <div>
    <h3 class="mt-10">{{ $t('lobby.inviteTitle') }}</h3>
    <geo-box class="flex flex-col justify-between">
      {{ $t('lobby.inviteText') }}
      <geo-input class="w-full" readonly v-model="link"/>
      WhatsApp, Telegram, Twitter - Share
    </geo-box>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";

@Component
export default class Share extends Vue {
  @Prop() link;
}
</script>
