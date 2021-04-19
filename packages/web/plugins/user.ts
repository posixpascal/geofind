import {Context, Plugin} from '@nuxt/types';
import * as Colyseus from "colyseus.js";
import {User} from "~/models";
import {AxiosInstance} from "axios";

const plugin: Plugin = async (context: Context, inject) => {
  const userModule = {
    get() {
      const user = (window as any).$nuxt.$collyseus.auth;
      return User.find(user._id) || user;
    }
  }
  inject('user', userModule);
};


declare module 'vue/types/vue' {
  interface Vue {
    $user: {
      get(): User
    };
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $user: {
      get(): User
    };
  }
}

declare module '@nuxt/types' {
  interface Context {
    $user: {
      get(): User
    };
  }
}

export default plugin;
