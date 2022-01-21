<template>
  <div class="bg-gray-900">
    <div class="pt-12 sm:pt-16 lg:pt-24">
      <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto space-y-2 lg:max-w-none">
          <h2 class="text-2xl leading-6 text-gray-300 uppercase tracking-wider">
            Unsere Pakete
          </h2>
          <p class="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Finden Sie das Paket das am Besten zu Ihnen passt
          </p>
          <p class="text-xl text-gray-300">
            Keine versteckten Kosten, Sie zahlen immer nur den vorab
            vereinbarten monatlichen Mietpreis.<br />
            Keine Bindung, sie können Ihr Paket jederzeit ändern oder kündigen.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
      <div class="relative">
        <div class="absolute inset-0 h-3/4 bg-gray-900" />
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="
              max-w-md
              mx-auto
              space-y-4
              lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0
            "
          >
            <div
              v-for="tier in tiers"
              :key="tier.name"
              class="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <div>
                  <h3
                    class="
                      inline-flex
                      px-4
                      py-1
                      rounded-full
                      text-sm
                      tracking-wider
                      uppercase
                      bg-yellow-100
                      text-yellow-600
                    "
                    id="tier-standard"
                  >
                    {{ tier.name }}
                  </h3>
                </div>
                <div class="mt-4 flex items-baseline text-6xl font-extrabold">
                  {{ tier.priceMonthly }} &euro;
                  <span class="ml-1 text-2xl font-medium text-gray-500">
                    / Monat
                  </span>
                </div>
                <p class="mt-5 text-lg text-gray-500">
                  {{ tier.description }}
                </p>
              </div>
              <div
                class="
                  flex-1 flex flex-col
                  justify-between
                  px-6
                  pt-6
                  pb-8
                  bg-gray-50
                  space-y-6
                  sm:p-10 sm:pt-6
                "
              >
                <ul role="list" class="space-y-4">
                  <li
                    v-for="feature in tier.features"
                    :key="feature"
                    class="flex items-start"
                  >
                    <div class="flex-shrink-0"></div>
                    <p class="ml-3 text-base text-gray-700">
                      <span class="text-green-500">&check;</span> {{ feature }}
                    </p>
                  </li>
                </ul>
                <div class="rounded-md shadow">
                  <a
                    :href="tier.href"
                    class="
                      flex
                      items-center
                      justify-center
                      px-5
                      py-3
                      border border-transparent
                      text-base
                      font-medium
                      rounded-md
                      text-white
                      bg-gray-800
                      hover:bg-yellow-600
                    "
                    aria-describedby="tier-standard"
                  >
                    Anmelden
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-5">
        <div class="max-w-md mx-auto lg:max-w-5xl">
          <div
            class="
              rounded-lg
              bg-gray-100
              px-6
              py-8
              sm:p-10
              lg:flex lg:items-center
            "
          >
            <div class="flex-1">
              <div>
                <h3
                  class="
                    inline-flex
                    px-4
                    py-1
                    rounded-full
                    text-sm
                    tracking-wider
                    uppercase
                    bg-white
                    text-gray-800
                  "
                >
                  Rabatt
                </h3>
              </div>
              <div class="mt-4 text-lg text-gray-600">
                Wir bieten einen speziellen Rabatt für lernbedürftige Klassen
                an. Bitte kontakieren Sie uns und erhalten Sie die komplette
                Lernsoftware auf Lebenszeit für
                <span class="font-semibold text-gray-900"
                  >einmalig 99&euro;</span
                >
              </div>
            </div>
            <div
              class="mt-6 rounded-md shadow lg:mt-0 lg:ml-10 lg:flex-shrink-0"
            >
              <a
                href="#"
                class="
                  flex
                  items-center
                  justify-center
                  px-5
                  py-3
                  border border-transparent
                  text-base
                  font-medium
                  rounded-md
                  text-gray-900
                  bg-white
                  hover:text-white hover:bg-yellow-600
                "
              >
                Kontaktieren Sie uns
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SellPricing extends Vue {
  tiers = [
    {
      name: 'Pro Klasse',
      href: '#',
      priceMonthly: 7,
      description: 'Lizenz für eine Schulklasse.',
      features: [
        'Privater und sicherer Raum für Ihre Prüflinge',
        'Lernfortschritt der Klasse überwachen',
        'Spiele mit eigenen Inhalten anreichern',
        'Prüfungen erstellen',
      ],
    },
    {
      name: 'Pro Schule',
      href: '#',
      priceMonthly: 129,
      description: 'Ein einheitlicher Preis für Ihre gesamte Schule',
      features: [
        'Privater und sicherer Raum für Ihre Prüflinge',
        'Lernfortschritt der Klasse überwachen',
        'Spiele mit eigenen Inhalten anreichern',
        'Prüfungen erstellen',
      ],
    },
  ]
}
</script>
