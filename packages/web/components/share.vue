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

      <div class="bg-white dark:bg-gray-800 flex w-full items-center p-8 justify-center">
        <div ref="canvas" class="aspect-ratio-square w-full h-full flex items-center justify-center"></div>
      </div>

      <div class="pt-3 pb-3 flex justify-evenly share-box bg-gray-300 rounded-b-lg">
        <a target="_blank" :href="`https://api.whatsapp.com/send?text=${text}`">
          <img
            width="32"
            :src="require(`~/assets/images/share/whatsapp.svg`)"
          />
        </a>
        <a
          target="_blank"
          :href="`https://t.me/share/url?url=${link}&text=${text}`"
        >
          <img
            width="32"
            :src="require(`~/assets/images/share/telegram.svg`)"
          />
        </a>
        <a
          target="_blank"
          :href="`https://twitter.com/share?text=${text}&via=${referrer}&hashtags=${shareTags}`"
        >
          <img width="32" :src="require(`~/assets/images/share/twitter.svg`)" />
        </a>
        <button v-if="canShare" @click="share">
          <img width="32" :src="require(`~/assets/images/share/share.svg`)" />
        </button>
        <button @click="copy">
          <img width="32" :src="require(`~/assets/images/share/link.svg`)" />
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
.share-box img {
  transition: ease-in-out 0.2s;
}

.share-box img:hover {
  transform: scale(1.1);
}
</style>
