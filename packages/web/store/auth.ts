import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store/index'
import { Auth } from '~/models'
import { Cookie } from '~/utils/cookies'

const reFetchAfter = 60000 // ms

export const state = () => ({})

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {}

export const actions: ActionTree<UserState, RootState> = {
  async current(context, data) {
    console.log(data)
    await Auth.insertOrUpdate({ data: data.user })
    localStorage.setItem('jwt', data.jwt)
    document.cookie = `jwt=${data.jwt}`
  },
  async reset() {
    localStorage.removeItem('jwt')
    Cookie.delete('jwt')
    await (window as any).$nuxt.$socket.reconnect()
  },
}
