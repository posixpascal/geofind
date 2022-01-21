<template>
  <div>
    <div class="flex px-4" @click="showPopup = !showPopup">
      <div>
        <Flag
          :hasDropShadow="true"
          :hasBorder="true"
          :hasBorderRadius="true"
          size="L"
          class="flag"
          gradient="real-linear"
          :code="$i18n.locale === 'en' ? 'US' : $i18n.locale.toUpperCase()"
        />
      </div>
      <span class="relative iconv"
        ><Icon height="32" name="chevron-down"></Icon
      ></span>
    </div>
    <div v-if="showPopup" class="popup">
      <div
        :class="`hover:bg-gray-100 p-3 pt-2 cursor-pointer border-b-2 border-gray-200
      ${$i18n.locale === locale.code ? 'bg-gray-200' : ''}
      `"
        @click="setLocale(locale)"
        v-for="locale in $i18n.locales"
      >
        <Flag
          :hasDropShadow="true"
          :hasBorderRadius="true"
          size="l"
          class="flag"
          gradient="real-linear"
          :code="locale.code === 'en' ? 'US' : locale.code.toUpperCase()"
        />
        <span>{{ locale.name }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, VModel } from 'vue-property-decorator'

@Component
export default class LanguageSwitch extends Vue {
  @VModel() input
  showPopup = false

  setLocale(locale) {
    this.$i18n.setLocale(locale.code)
    this.showPopup = false
  }
}
</script>
<style lang="postcss">
.flag {
  width: 32px;
  position: relative;
  top: 8px;
}

.iconv {
  position: relative;
  top: 4px;
}

@media (max-width: 769px) {
  .flag {
    width: 24px;
  }

  .iconv {
    top: 2px;
  }

  .iconv svg {
    width: 20px;
  }
}

.popup {
  @apply shadow-lg z-10 right-5 absolute top-12 bg-white border-2 border-gray-200 rounded;
  min-width: 200px;
}

.container {
  @apply relative;
}
.spacer {
  width: 40px;
}
</style>
