const API_URL = (process.env.NODE_ENV === 'production')
  ? 'https://pa.txto.com.br'
  : 'http://localhost'

console.log('USING API: ' + API_URL + ' (' + process.env.NODE_ENV + ')')

export class PAApi {
  constructor (url) {
    this.url = url
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
    console.log('uepa', this.url)
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
          console.log('then', res)
          res.json().then(d => {
            console.log('thenThen', d)
            if(res.status === 200) {
              console.log('if', d)
              resolve(d)
            } else {
              console.log('else', d)
              reject(d)
            }

          })

        }).catch(err => {
          console.log('catch!')
          reject(err)
        })
      } catch (error) {
        console.log('catchCatch!')
        reject(error)
      }
    })
  }
}
export default function (url) {
  return new PAApi(url)
}
