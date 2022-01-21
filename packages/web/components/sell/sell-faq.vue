<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <h2 class="text-3xl text-gray-900">Häufig gestellte Fragen</h2>
          <p class="mt-0 text-lg text-gray-500">
            Keine Antwort gefunden? Melden Sie sich an unseren
            <a
              href="#"
              class="font-medium text-yellow-600 hover:text-yellow-500"
              >Kunden Support</a
            >.
          </p>
        </div>
        <div class="mt-12 lg:mt-0 lg:col-span-2">
          <dl class="space-y-12">
            <div v-for="faq in faqs" :key="faq.question">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                {{ faq.question }}
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                {{ faq.answer }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class SellFaq extends Vue {
  faqs = [
    {
      question: 'Wie wird Geofind installiert?',
      answer:
        'Geofind kann über 2 Wege installiert werden, zum einen erhalten Sie bei Kaufabschluss einen Login zu einem webbasierten und privaten Geofind System. Darüberhinaus bieten wir für Schulen die Möglichkeit einen eigenen Schulserver aufzusetzen bei dessen Realisierung wir Sie mit technischem Support begleiten.',
    },
    {
      question:
        'Wieviele Schüler einer Klasse können Geofind gleichzeitig nutzen?',
      answer:
        'Es gibt keine Einschränkungen wieviele Schüler in einer Klasse angemeldet sind.',
    },
    {
      question: 'Wie lässt sich der Lernfortschritt einsehen',
      answer:
        'Sie können den Lernfortschritt der einzelnen Klasse sowie einzelner Schüler erfassen und sehen auf einen Blick welche Geographie-Themen stärker vermittelt werden sollten.',
    },
  ]
}
</script>
