import {Context, Plugin} from '@nuxt/types';
import * as Colyseus from "colyseus.js";

const plugin: Plugin = async (context: Context, inject) => {
  const client = new Colyseus.Client(context.$config.collyseusUrl);
  (client.auth as any).endpoint += "/social";

  await client.auth.login();
  inject('collyseus', client);
};


declare module '@nuxt/types' {
  interface Context {
    $collyseus: Colyseus.Client;
  }
}

export default plugin;
