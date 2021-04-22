import {Context, Plugin} from '@nuxt/types';
import * as Colyseus from "colyseus.js";
import {User} from "~/models";

const plugin: Plugin = async (context: Context, inject) => {
  const client = new Colyseus.Client(context.$config.collyseusUrl);
  (client.auth as any).endpoint += "/social";

  try {
    await client.auth.login();
    await context.store.$db().model("users").insert({
      data: client.auth
    });
  } catch (e){
    await client.auth.logout();
    await client.auth.login();
    await context.store.$db().model("users").insert({
      data: client.auth
    });
  }

  console.log(client.auth);
  inject('collyseus', client);
};


declare module '@nuxt/types' {
  interface Context {
    $collyseus: any;
  }
}


declare module 'vue/types/vue' {
  interface Vue {
    $collyseus: any;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $collyseus: any;
  }
}

export default plugin;
