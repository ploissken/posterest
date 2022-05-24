const API_URL = (process.env.NODE_ENV === 'production')
  ? 'https://pa.txto.com.br'
  : 'http://localhost:9000'

export class PAApi {
  constructor (url) {
    this.url = url
  }

  getAPI() {
    return API_URL
  }

  getUrl () {
    if (this.url) {
      return new URL(this.url, API_URL).toString()
    } else {
      return new URL(API_URL).toString()
    }
  }

  get () {
    return this.request('get')
  }

  post (data = {}) {
    return this.request('post', data)
  }

  put (data = {}) {
    return this.request('put', data)
  }

  delete () {
    return this.request('delete')
  }

  request (method, data = {}, otherOptions = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        fetch(this.getUrl(), {
          method: method,
          credentials: "include",
          mode: 'cors',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          ...data,
          ...otherOptions
        }).then(res => {
          res.json().then(d => {
            if(res.status === 200) {
              resolve(d)
            } else {
              reject(d)
            }
          })

        }).catch(err => {
          reject(err)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default function (url) {
  return new PAApi(url)
}
