import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Context } from '@nuxt/types'
import firebase from 'firebase/compat'
const plugin: any = (
  context: Context,
  inject: (namespace: string, obj: any) => void
) => {
  const app = firebase.initializeApp(context.$config.firebase)
  ;(window as any).firebase = firebase
  const auth = getAuth(app)
  inject('auth', auth)
}

export default plugin
