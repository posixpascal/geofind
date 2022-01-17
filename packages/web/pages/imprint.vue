<template>
  <div class="p-5 container">
    <Panel>
      <template #title>Impressum</template>
      <template #content>
        <h3 class="mt-4">Angaben gem&auml;&szlig; &sect; 5 TMG</h3>
        <p>Pascal Raszyk<br/>
          Freiberufler<br/>
          Frankfurterstra&szlig;e 6<br/>
          63263 Neu-Isenburg</p>

        <h3 class="mt-4">Kontakt</h3>
        <p>Telefon: 0151 700 222 32<br/>
          E-Mail: pascal@raszyk.de</p>

        <h3 class="mt-4">Umsatzsteuer-ID</h3>
        <p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br/>
          DE318505781</p>

        <h3 class="mt-4">EU-Streitschlichtung</h3>
        <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
          href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br/>
          Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

        <h3 class="mt-4">Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h3>
        <p>Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil. Zust&auml;ndig
          ist
          die Universalschlichtungsstelle des Zentrums f&uuml;r Schlichtung e.V., Stra&szlig;burger Stra&szlig;e 8,
          77694
          Kehl am Rhein (<a href="https://www.verbraucher-schlichter.de" rel="noopener noreferrer" target="_blank">https://www.verbraucher-schlichter.de</a>).
        </p>

        <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
      </template>
    </Panel>
  </div>
</template>
<script lang="ts">
import {Component} from "vue-property-decorator";
import {Vue} from "vue-property-decorator";
import Panel from "~/components/panel.vue";

@Component({
  components: {Panel}
})
export default class ImprintPage extends Vue {

}
</script>
<style lang="postcss" scoped>
h2 {
  @apply text-2xl;
  margin-top: 40px;
}

h3 {
  font-size: 24px !important;
  margin-bottom: 10px !important;
  padding-bottom: 0 !important;
}

h4 {
  @apply text-lg;
}
</style>
