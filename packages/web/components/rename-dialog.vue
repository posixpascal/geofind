<template>
  <div class="dialog-backdrop">
    <div>
      <Panel>
        <template #title>
          <div class="flex justify-between px-5">
            <span>Namen ändern</span>
          </div>
        </template>
        <template #content>
          <p>Hier kannst Du einen neuen Namen festlegen.</p>
          <Input v-model="name" />
          <Button @click='saveName' variant="green" small>Speichern</Button>
        </template>
      </Panel>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import {Emit, Prop} from "vue-property-decorator";

@Component
export default class RenameDialog extends Vue {
  @Prop() lobby;
  name = '';
  rename = false;

  created(){
    this.name = this.user.displayName;
  }

  @Emit('close')
  async saveName(){
    if (!this.name){ return; }
    await this.$store.dispatch("user/setName", this.name);
    this.$collyseus.auth.displayName = this.name;
    await this.$collyseus.auth.save();
  }

  get user() {
    return this.$user.get();
  }
}
</script>
<style lang="postcss" scoped>
.dialog-backdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 500000;
  background: rgba(0, 0, 0, .7);
}

.dialog-backdrop > div {
  width: 100%;
  max-width: 600px;
}
</style>
<style>
.player-list img {
  position: relative;
  top: 8px;
}

.panel-icon {
  position: relative;
  top: -4px;
}
</style>
