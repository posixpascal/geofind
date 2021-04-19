import {ActionTree, MutationTree} from 'vuex';
import {RootState} from '~/store/index';
import {User} from "~/models";

const reFetchAfter = 60000; // ms

export const state = () => ({});

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {};


export const actions: ActionTree<UserState, RootState> = {
  async setName(context: any, displayName: any) {
    await this.$api.post("/settings/set-name", {displayName});

    const user = this.$user.get();
    await User.update({
      data: {
        ...user,
        displayName
      }
    })
  },
  async setPin(context: any, pin) {
    await this.$api.post("/settings/set-pin", {pin});

    const user = this.$user.get();
    await User.update({
      data: {
        ...user,
        metadata: {
          ...user.metadata,
          pin
        }
      }
    })
  }
}
