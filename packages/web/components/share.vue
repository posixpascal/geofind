<template>
  <Panel class="mt-10">
    <template #title>{{ $t('lobby.inviteTitle') }}</template>
    <template #content>
      <div class="inline-flex text-center flex-col w-full">
        {{ $t('t.copyLinkAndGo') }}
        <input
          type="text"
          :value="msg"
          disabled
          :class="`font-lucky text-center input w-full bg-gray-100 dark:text-white dark:bg-gray-800 rounded-t-lg px-6 py-4 text-xl`"
        />
      </div>

      <div class=" flex w-full items-center p-8 justify-center">
        <div ref="canvas" class="aspect-ratio-square w-full h-full flex items-center justify-center"></div>
      </div>

      <div class="pt-3 pb-3 flex justify-evenly share-box rounded-b-lg">
        <a target="_blank" :href="`https://api.whatsapp.com/send?text=${text}`">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <a
          target="_blank"
          :href="`https://t.me/share/url?url=${link}&text=${text}`"
        >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path fill="currentColor" stroke="none" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
        <a
          target="_blank"
          :href="`https://twitter.com/share?text=${text}&via=${referrer}&hashtags=${shareTags}`"
        >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path fill="currentColor" stroke="none" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
        </a>
        <button v-if="canShare" @click="share">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>

        </button>
        <button @click="copy" class="flex gap-4 items-center text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          <span class="relative top-1">{{ $t('t.copyLink') }}</span>
        </button>
      </div>
    </template>
  </Panel>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Panel from '~/components/panel.vue'

@Component({
  components: { Panel },
})
export default class Share extends Vue {
  @Prop({ type: String, required: true }) link

  public msg = ''

  mounted() {
    this.msg = this.link;
var canvas = this.$refs.canvas;

new QRCode(canvas, {
  text: this.link,
  width: 256,
  height: 256,
  colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});
}

  get text() {
    return encodeURIComponent(
      this.$i18n.t('t.shareText', { link: this.link }).toString()
    )
  }

  get referrer() {
    return encodeURIComponent('geofindio')
  }

  get shareTags() {
    return encodeURIComponent('geography,onlinegames,geofind,geohunt,io')
  }

  share() {
    navigator.share({
      title: '',
      text: this.text,
      url: this.link,
    })
  }

  get canShare() {
    return (
      navigator.share ||
      ((navigator as any).canShare && (navigator as any).canShare())
    )
  }

  copy() {
    navigator.clipboard.writeText(this.link).then(
      () => {
        this.msg = this.$i18n.t('t.copied').toString()
        setTimeout(() => {
          this.msg = this.link
        }, 2500)
      },
      function (err) {
        console.error(err)
      }
    )
  }
}
</script>
<style lang="postcss">
.share-box svg {
  @apply h-8 w-8 text-blue-400 dark:text-blue-400;
  transition: ease-in-out 0.2s;
}

.share-box svg:hover {
  transform: scale(1.1);
}
</style>
