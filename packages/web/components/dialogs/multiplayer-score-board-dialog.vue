<template>
  <Dialog classes="bg-white dark:bg-gray-800 " class="scoreboard-dialog">
    <div class="flex mb-10 justify-between items-center">
      <div class="flex items-center pin-title mb-0">
        <Flag
          class="flag"
          :hasDropShadow="true"
          :hasBorder="true"
          :hasBorderRadius="true"
          size="l"
          gradient="real-linear"
          :code="
            room.country.alpha2code === 'GB' ? 'UK' : room.country.alpha2code
          "
        />
        <div style="">
          <span class="text-xl md:text-2xl flex-col sm:flex-row dark:text-gray-100">
            <span class="" v-if="room.country.translations[$i18n.locale]">{{
                room.country.translations[$i18n.locale].country
              }}</span>
            <span class="" v-else>{{ room.country.name }}</span>
            <span class="text-gray-500 dark:text-gray-300">
              <span class="hidden sm:inline">&mdash; </span> 🏢
              {{
                room.country.translatedcapitals[$i18n.locale]
                  ? room.country.translatedcapitals[$i18n.locale]
                  : room.country.capital
              }}
            </span>
          </span>
          <div class="text-sm md:text-base text-gray-500 dark:text-gray-300">
            👥 {{ formatNumber(room.country.population, 1) }}
            {{ $t('t.citizen') }} &mdash; 📍
            {{ $t(`subregion.${room.country.subregion}`) }}
          </div>
        </div>
      </div>
    </div>
    <template v-if="room.room === 'speedrun'">
      <div class="text-center" v-if="winner && winner.player">
        <div class="flex items-center justify-center dark:text-gray-300">
          <Pin :id="winner.player.pin" width="48" style="min-width: 48px"/>
          <h2 class="dark:text-gray-300">{{ winner.player.username }}</h2>
        </div>
        <h2 class="text-center">{{ winner.time.toFixed(2) }} sec.</h2>
      </div>
    </template>
    <template v-else>
      <div v-if="showScore">
        <div
          :class="`flex items-center justify-between pin mp-pin align-middle mb-1 border-dashed border-b-2 border-gray-300 py-1 md:py-3 px-1`"
          v-for="player in sortedPlayers"
        >
          <div class="flex items-center">
            <Pin :id="player.pin" width="32" style="min-width: 32px; position: relative; left: -8px"/>
            <h4 :class="`pr-3 dark:text-gray-300`">{{ player.username }}</h4>

          </div>
          <h4 class="dark:text-gray-300 flex">
            <h4
              v-if="room.scoreboard[player.sessionId].points >= maxPoints"
              class="pr-2"
            >
              {{
                room.scoreboard[player.sessionId].points >= maxPoints
                  ? '👑'
                  : ''
              }}
            </h4>
            {{ room.scoreboard[player.sessionId].points || 0 }}
          </h4>
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

            <Pin :id="vote.player.pin" width="32" style="min-width: 32px; position: relative; left: -8px" />
            <h4 class="dark:text-gray-300">{{ vote.player.username }}</h4>
            <span class="pl-3 flex text-gray-600 dark:text-gray-300" v-if=" (!vote.country || vote.country.id !== room.country.id) &&
                  vote.distance > 0 &&
                  animateLine">(<ICountUp
              class="flex "
              v-if="
                  (!vote.country || vote.country.id !== room.country.id) &&
                  vote.distance > 0 &&
                  animateLine
                "
              :endVal="vote.distance"
              :options="countupOptions"
            />)
            </span>
          </div>
          <!-- <div class="w-full hidden md:max-w-full">
            <div
              :class="[
              'sm:flex',
              'h-[2px] md:h-[4px] relative top-5 md:top-2 text-sm md:text-xl',
              'line ',
              animateLine ? 'line-expand' : '',
              vote.isCorrect ? 'line-success' : '',
            ]"
            >
              <div class="flex dark:text-gray-300">
                <ICountUp
                  v-if="
                  (!vote.country || vote.country.id !== room.country.id) &&
                  vote.distance > 0 &&
                  animateLine
                "
                  :endVal="vote.distance"
                  :options="countupOptions"
                />
              </div>
            </div>
          </div> -->

          <div
            v-if="vote.hasCountry && vote.country"
            class="flex items-center justify-center text-center flex-col"
          >
            <Flag
              class="flag flag-selected"
              :hasDropShadow="true"
              :hasBorder="true"
              :hasBorderRadius="true"
              size="l"
              gradient="real-linear"
              :code="
                vote.country.alpha2code === 'GB'
                  ? 'UK'
                  : vote.country.alpha2code
              "
            />
            <span :class="vote.isCorrect ? 'text-green-400' : 'dark:text-gray-200'"
                  v-if="vote.country.translations[$i18n.locale]">{{
                vote.country.translations[$i18n.locale].country
              }}</span>
            <span :class="vote.isCorrect ? 'text-green-400' : 'dark:text-gray-200'" v-else>{{
                vote.country.name
              }}</span>
          </div>
          <div v-else class="text-center block w-auto">-</div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator'
import Dialog from '~/components/dialog.vue'
import Pin from '~/components/pin.vue'
import ICountUp from 'vue-countup-v2'
import Button from '~/components/button.vue'
import {Room} from '~/models'

@Component({components: {Button, Dialog, Pin, ICountUp}})
export default class MultiplayerScoreBoardDialog extends Vue {
  @Prop() room: Room
  @Prop() marker

  showVote = false
  showCountry = false
  showScore = false
  animateLine = false

  get winner() {
    const votes = Object.values(this.room.votes)
    const vote = votes.find((vote: any) => {
      return vote.isCorrect
    })
    if (!vote) {
      return false
    }
    vote.player = this.room.players[vote.sessionId]
    return vote
  }

  created() {
    setTimeout(() => {
      this.animateLine = true
    }, 300)

    setTimeout(() => {
      this.showScore = true
    }, 6000)
  }

  @Watch('vote.country.id', {immediate: true})
  async addVote() {
    const vote = this.room.votes[this.room.sessionId]
    if (!vote) {
      return
    }
    if (!vote.isCorrect || !this.$store.state.auth.user || !vote.country) {
      return
    }

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

  formatNumber(num, digits) {
    const lookup = [
      {value: 1, symbol: ''},
      {value: 1e3, symbol: 'k'},
      {value: 1e6, symbol: 'M'},
      {value: 1e9, symbol: 'G'},
      {value: 1e12, symbol: 'T'},
      {value: 1e15, symbol: 'P'},
      {value: 1e18, symbol: 'E'},
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value
      })
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0'
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
  left: 0;
  width: 0%;
  border-top: 4px dashed #888;
  margin: 0 10px 0;
  transition: width ease-in-out 2s;
  justify-content: center;
}

.line span {
  position: relative;
  top: -32px;
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
  min-width: 64px !important;
  height: 46px !important;
  min-height: 46px !important;
}

.scoreboard-dialog .flag-selected img {
  width: 32px !important;
  height: 23px !important;
  min-width: 64px !important;
  min-height: 46px !important;
}

@media (max-width: 768px){
  .scoreboard-dialog .flag img {
    width: 42px !important;
    min-width: 42px !important;
    height: 32px !important;
    min-height: 32px !important;
  }
}
</style>
