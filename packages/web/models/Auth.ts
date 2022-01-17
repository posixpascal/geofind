import { Model } from '@vuex-orm/core'

export class Auth extends Model {
  static entity = 'auth'
  static primaryKey = 'id'
  static $socket: any

  /**
   * Tries to get the current user identity or fetch a new one from the server.
   */
  static async ticket() {
    console.log('ticket', this.$socket)
    await this.$socket.emit('ticket', {
      jwt: localStorage.getItem('jwt'),
    })
    console.log('ticketed')
  }

  static get user(): Auth {
    return this.query().first()
  }

  static get isAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.user) {
          resolve(interval)
        }
      }, 100)
    }).then((interval: number) => clearInterval(interval))
  }

  static async logout() {
    localStorage.removeItem('jwt')
    await this.deleteAll()
    window.location.href = '/'
    document.cookie = 'jwt="";expires=Thu, 01 Jan 1970 00:00:01 GMT'
    return
  }
}
