export const Cookie = {
  delete(name, path = null, domain = null) {
    if (this.get(name)) {
      document.cookie = `${name}=${path ? `;path=${path}` : ''}${
        domain ? `;domain=${domain}` : ''
      };expires=Thu, 01 Jan 1970 00:00:01 GMT`
    }
  },
  get(name) {
    return document.cookie.split(';').some((c) => {
      return c.trim().startsWith(name + '=')
    })
  },
}
