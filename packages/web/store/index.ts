import VuexORM from '@vuex-orm/core'
import * as models from '~/models'

export const database = new VuexORM.Database()

// Register Models to vuex-orm database.
Object.values(models).forEach((model: any) => database.register(model))

export const state = () => ({})

// export type RootState = ReturnType<typeof state>;
export type RootState = {
  auth: {
    user: any
    loggedIn: boolean
  }
}

export const plugins = [VuexORM.install(database)]
