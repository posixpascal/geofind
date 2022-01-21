<template>
  <Dialog class="scoreboard-dialog">
    <div class="flex mb-10 justify-between items-center">
      <h2 class="flex items-center pin-title mb-0">
        <Pin :id="$auth.user.pin" width="32" height="32" />
        <template v-if="userVote && userVote.country.id === country.id">
          <span>Dein Ergebnis</span>
        </template>
        <template v-else-if="userVote">
          <span>Knappe Sache...</span>
        </template>
        <template v-else>
          <span>Kein Treffer</span>
        </template>
      </h2>
      <Button xx-small variant="purple" @click="skip">
        &nbsp;&nbsp;&raquo;&nbsp;&nbsp;
      </Button>
    </div>
    <hr />
    <template v-if="userVote">
      <div class="flex justify-between relative items-center">
        <div>
          <transition
            :duration="1000"
            enter-active-class="transition-all transition-fastest ease-out-quad"
            enter-class="opacity-0 scale-70"
            enter-to-class="opacity-100 scale-100"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-70"
          >
            <div
              class="flex items-center flag-container"
              v-if="showVote && userVote"
            >
              <Flag
                :hasDropShadow="true"
                :hasBorder="true"
                :hasBorderRadius="true"
                size="l"
                gradient="real-linear"
                :code="userVote.country.alpha2Code"
              />
            </div>
          </transition>
        </div>
        <div
          :class="[
            'line',
            animateLine ? 'line-expand' : '',
            userVote.country.id === country.id ? 'line-success' : '',
          ]"
        >
          <div class="flex">
            <ICountUp
              v-if="
                userVote.country.id !== country.id &&
                distanceToTarget > 0 &&
                animateLine
              "
              :endVal="distanceToTarget"
              :options="countupOptions"
            />
            <span
              class="text-green-400"
              v-if="userVote.country.id === country.id && animateLine"
            >
              ✓ TREFFER
            </span>
          </div>
        </div>
        <transition
          enter-active-class="transition-all transition-fastest ease-out-quad"
          enter-class="opacity-0 scale-70"
          enter-to-class="opacity-100 scale-100"
          leave-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-70"
        >
          <div v-show="showCountry">
            <div class="flex items-center flag-container">
              <Flag
                :hasDropShadow="true"
                :hasBorder="true"
                :hasBorderRadius="true"
                size="l"
                gradient="real-linear"
                :code="country.alpha2Code"
              />
            </div>
          </div>
        </transition>
      </div>
      <div class="flex justify-between">
        <transition
          enter-active-class="transition-all transition-fastest ease-out-quad"
          enter-class="opacity-0 scale-70"
          enter-to-class="opacity-100 scale-100"
          leave-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-70"
        >
          <div v-show="showVote">
            {{ userVote.country.translations[$i18n.locale] }}
          </div>
        </transition>
        <transition
          enter-active-class="transition-all transition-fastest ease-out-quad"
          enter-class="opacity-0 scale-70"
          enter-to-class="opacity-100 scale-100"
          leave-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-70"
        >
          <div v-show="showCountry">
            {{ country.translations[$i18n.locale] }}
          </div>
        </transition>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Dialog from '~/components/dialog.vue'
import Pin from '~/components/pin.vue'
import ICountUp from 'vue-countup-v2'
import Button from '~/components/button.vue'

@Component({ components: { Button, Dialog, Pin, ICountUp } })
export default class ScoreBoardDialog extends Vue {
  @Prop() country: any
  @Prop() userVote: any
  @Prop() marker
  @Prop() tutor

  showVote = false
  showCountry = false
  animateLine = false

  async skip() {
    // await this.$socket.emit('tutor/nextRound', {id: this.tutor.id});
  }

  created() {
    setTimeout(() => {
      this.showVote = true
    }, 1000)

    setTimeout(() => {
      this.showCountry = true
    }, 2000)

    setTimeout(() => {
      this.animateLine = true
    }, 3000)

    console.log(this.country, this.userVote, this.marker)
  }

  get distanceToTarget() {
    if (!this.country) {
      return 0
    }
    if (!this.userVote) {
      return 0
    }
    //return this.country.distanceToPoint(this.marker.position, true)
  }

  get countupOptions() {
    return {
      suffix: this.$i18n.locale === 'us' ? ' mi' : ' km',
    }
  }
}
</script>
<style lang="postcss" scoped>
.dialog .flag {
  top: 0 !important;
  margin-right: 8px;
}

h2 {
  padding-top: 0 !important;
  margin-bottom: 20px;
}

.line {
  height: 4px;
  left: 0;
  width: 0%;
  border-top: 4px dashed #888;
  margin: 0 10px 0;
  transition: width ease-in-out 2s;
  display: flex;
  justify-content: center;
}

.line span {
  position: relative;
  top: -32px;
  font-size: 24px;
  min-width: 200px;
  text-align: center;
  display: block;
}

.flag-container {
  min-width: 42px;
}

.line-expand {
  width: 100%;
}

.line-success {
  border-color: #4ab63b;
}
</style>
<style>
.scoreboard-dialog .flag {
  width: auto !important;
  height: auto !important;
}

.scoreboard-dialog .flag img {
  width: 32px !important;
  height: 24px !important;
}
</style>
