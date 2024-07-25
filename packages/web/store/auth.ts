import {ActionTree, MutationTree} from 'vuex'
import {RootState} from '~/store/index'
import {Auth} from '~/models'
import {Cookie} from '~/utils/cookies'
import {addDoc, collection, getDocs} from 'firebase/firestore'

const reFetchAfter = 60000 // ms

export const state = () => ({
  user: false,
})

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions: ActionTree<UserState, RootState> = {
  async current(context, user) {
    context.commit('setUser', JSON.parse(JSON.stringify(user)))
  },

  async reset() {
    localStorage.removeItem('jwt')
    Cookie.delete('jwt')
    await (window as any).$nuxt.$socket.reconnect()
  },
}
