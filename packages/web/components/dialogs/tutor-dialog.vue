<template>
  <Dialog>
    <h2>Willkommen im Lernbereich!</h2>
    <p class="mb-10">
      Im Lernbereich kannst Du dein Geographie-Wissen Schritt für Schritt verbessern.<br/>
      Wir zeigen Dir nacheinander Länder und andere Suchobjekte, welche Du auf der Karte hinter Dir finden musst.
    </p>

    <p class="mb-10">
      Keine Sorge, falls du mal nicht weiterweist, kannst Du jederzeit auf das kleine Fragezeichen klicken und wir zeigen Dir den Weg.
    </p>

    <p>
      Und wenn Du aufhören möchtest, klicke einfach auf "Zurück". Du kannst jederzeit einfach weiterlernen.
    </p>

    <Button variant="green" small @click="startTutor">
      Loslegen
    </Button>
  </Dialog>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Emit, Prop} from "vue-property-decorator";
import Button from "~/components/button.vue";
@Component({
  components: {Button}
})
export default class TutorDialog extends Vue {
  @Emit('close')
  startTutor(){
    this.$pub('user/update', {seenTutor: true});
  }
}
</script>
<style lang="postcss" scoped>
</style>
