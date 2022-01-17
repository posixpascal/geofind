<template>
  <Panel class="mt-10">
    <template #title>{{ $t('lobby.inviteTitle') }}</template>
    <template #content>
      <div class="inline-flex w-full">
        <input type="text" :value='msg' :class="`font-lucky input w-full bg-gray-100 rounded px-6 py-4 text-xl`" />
      </div>

      <div class="pt-6 pb-3 flex justify-evenly">
        <a target='_blank' :href="`https://api.whatsapp.com/send?text=${text}`">
          <img width="32" :src="require(`~/assets/images/share/whatsapp.svg`)"/>
        </a>
        <a target='_blank' :href="`https://t.me/share/url?url=${link}&text=${text}`">
          <img width="32" :src="require(`~/assets/images/share/telegram.svg`)"/>
        </a>
        <a target='_blank'
           :href="`https://twitter.com/share?text=${text}&via=${referrer}&hashtags=${shareTags}`">
          <img width="32" :src="require(`~/assets/images/share/twitter.svg`)"/>
        </a>
        <button v-if="canShare" @click="share">
          <img width="32" :src="require(`~/assets/images/share/share.svg`)"/>
        </button>
        <button @click="copy">
          <img width="32" :src="require(`~/assets/images/share/link.svg`)"/>
        </button>
      </div>
    </template>
  </Panel>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import Panel from "~/components/panel.vue";

@Component({
  components: { Panel }
})
export default class Share extends Vue {
  @Prop({type: String, required: true}) link;

  public msg = '';

  mounted() {
    this.msg = this.link;
  }

  get text() {
    return encodeURIComponent(this.$i18n.t('t.shareText', {link: this.link}).toString());
  }

  get referrer() {
    return encodeURIComponent('geofindio')
  }

  get shareTags() {
    return encodeURIComponent('geography,onlinegames,geofind,geohunt,freegames')
  }

  share() {
    navigator.share({
      title: '',
      text: this.text,
      url: this.link
    });
  }

  get canShare() {
    return navigator.share || ((navigator as any).canShare && (navigator as any).canShare())
  }

  copy() {
    navigator.clipboard.writeText(this.link).then(() => {
      this.msg = this.$i18n.t('t.copied').toString();
      setTimeout(() => {
        this.msg = this.link;
      }, 2500);
    }, function (err) {
      console.error(err);
    });

  }
}
</script>
