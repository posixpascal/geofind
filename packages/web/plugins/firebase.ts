import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth'
import { Context } from '@nuxt/types'
import firebase from 'firebase/compat'
import { getFirestore } from 'firebase/firestore'

const signInWithMail = ({ context, inject }, auth) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation')
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn')
        context.store.dispatch('auth/current', result.user)
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      })
  }
}

const plugin: any = (
  context: Context,
  inject: (namespace: string, obj: any) => void
) => {
  const app = firebase.initializeApp(context.$config.firebase)
  ;(window as any).firebase = firebase
  const auth = getAuth(app)
  const firestore = getFirestore(app)

  signInWithMail({ context, inject }, auth)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      context.store.dispatch('auth/current', user)
    }
  })
  inject('firestore', firestore)
  inject('auth', auth)
}

export default plugin
