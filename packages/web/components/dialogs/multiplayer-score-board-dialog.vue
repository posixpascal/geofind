<template>
  <Dialog class="scoreboard-dialog">
    <div class="flex mb-10 justify-between items-center">
      <div class="flex items-center pin-title mb-0">
        <Flag
          class="flag"
          :hasDropShadow="true"
          :hasBorder="true"
          :hasBorderRadius="true"
          size="l"
          gradient="real-linear"
          :code="room.country.alpha2code"
        />
        <div style="">
          <span class="text-2xl">
            {{ room.country.translations[$i18n.locale].country }}
            <span class="text-gray-500">
            &mdash; 🏢 {{ room.country.translatedcapitals[$i18n.locale] ? room.country.translatedcapitals[$i18n.locale] : room.country.capital }}
            </span>
          </span>
          <div class="text-gray-500">
            👥 {{ formatNumber(room.country.population, 1) }} {{$t('t.citizen')}} &mdash;
            📍 {{ $t(`subregion.${room.country.subregion}`) }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showScore">
      <div
        :class="`flex items-center justify-between pin mp-pin align-middle mb-1 border-dashed border-b-2 border-gray-300 py-3 px-1`"
        v-for="player in sortedPlayers"
      >
        <div class="flex items-center">
          <h4
            v-if="room.scoreboard[player.sessionId].points >= maxPoints"
            class="pr-2"
          >
            {{
              room.scoreboard[player.sessionId].points >= maxPoints ? '👑' : ''
            }}
          </h4>
          <h4 :class="`pr-3`">{{ player.username }}</h4>
        </div>
        <h4>{{ room.scoreboard[player.sessionId].points || 0 }}</h4>
      </div>
    </div>
    <div v-else v-for="vote in votes">
      <div
        class="
          flex
          justify-between
          relative
          items-center
          border-dashed border-b-2 border-gray-300
          py-3
          px-1
        "
      >
        <div class="flex items-center">
          <Pin :id="vote.player.pin" width="48" style="min-width: 48px" />
          <h4>{{ vote.player.username }}</h4>
        </div>
        <div
          :class="[
            'hidden sm-block',
            'line',
            animateLine ? 'line-expand' : '',
            vote.isCorrect ? 'line-success' : '',
          ]"
        >
          <div class="flex">
            <ICountUp
              v-if="
                (!vote.country || vote.country.id !== room.country.id) &&
                vote.distance > 0 &&
                animateLine
              "
              :endVal="vote.distance"
              :options="countupOptions"
            />
            <span
              class="text-green-400"
              v-if="
                vote.isCorrect &&
                vote.country &&
                vote.country.id === room.country.id &&
                animateLine
              "
            >
              ✓ {{$t('t.match')}}
            </span>
          </div>
        </div>

        <div
          v-if="vote.hasCountry"
          class="flex items-center justify-center text-center flex-col"
        >
          <Flag
            class="flag flag-selected"
            :hasDropShadow="true"
            :hasBorder="true"
            :hasBorderRadius="true"
            size="l"
            gradient="real-linear"
            :code="vote.country.alpha2code"
          />
          {{ vote.country.translations[$i18n.locale].country }}
        </div>
        <div v-else class="text-center">
          &mdash;<br />
         🌊🐠
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Dialog from '~/components/dialog.vue'
import Pin from '~/components/pin.vue'
import ICountUp from 'vue-countup-v2'
import Button from '~/components/button.vue'
import { Room } from '~/models'

@Component({ components: { Button, Dialog, Pin, ICountUp } })
export default class MultiplayerScoreBoardDialog extends Vue {
  @Prop() room: Room
  @Prop() marker

  showVote = false
  showCountry = false
  showScore = false
  animateLine = false

  created() {
    setTimeout(() => {
      this.animateLine = true
    }, 300)

    setTimeout(() => {
      this.showScore = true
    }, 4000)
  }

  get maxPoints() {
    return Object.values(this.room.scoreboard).reduce((max, player) => {
      return player.points > max ? player.points : max
    }, 0)
  }

  get votes() {
    const players = Object.values(this.room.players)
    return players.map((player) => {
      return {
        ...this.room.votes[player.sessionId],
        player,
      }
    })
  }

  get sortedPlayers() {
    if (!this.room.players) {
      return []
    }

    const players = Object.values(this.room.players)
    return players.sort((playerA: any, playerB: any) => {
      if (!playerA?.sessionId || !playerB?.sessionId) {
        return 0
      }
      const playerAPts = this.room.scoreboard[playerA.sessionId].points || 0
      const playerBPts = this.room.scoreboard[playerB.sessionId].points || 0
      if (playerAPts > playerBPts) {
        return -1
      }

      if (playerBPts > playerAPts) {
        return 1
      }

      return 0
    })
  }

  get countupOptions() {
    return {
      suffix: this.$i18n.locale === 'us' ? ' mi' : ' km',
    }
  }

  formatNumber(num, digits){
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
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
  width: 64px !important;
  height: 46px !important;
}

.scoreboard-dialog .flag-selected img {
  width: 32px !important;
  height: 23px !important;
}
</style>
