import {Context} from '@nuxt/types';
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export default (context: Context, inject: any) => {
  const api = axios.create({
    baseURL: context.$config.backendUrl,
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  });

  async function requestHandler(config: AxiosRequestConfig) {
    const auth = (window.$nuxt as any).$collyseus._auth.token

    if (auth) {
      config.headers.Authorization = `Bearer ${auth}`;
    }

    return config;
  }

  api.interceptors.request.use(requestHandler);

  inject('api', api);
};

declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosInstance;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: AxiosInstance;
  }
}

declare module '@nuxt/types' {
  interface Context {
    $api: AxiosInstance;
  }
}
