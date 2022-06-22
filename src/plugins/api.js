import axios from 'axios'

const PROD_ENV = (process.env.NODE_ENV === 'production')
const API_URL = PROD_ENV
  ? 'https://pa.txto.com.br'
  : 'http://localhost:9000'

export class Api {
  constructor (url) {
    this.url = url
  }

  getApiUrl () {
    return API_URL
  }

  get () {
    return this.request('get')
  }

  post (data = {}) {
    return this.request('post', data)
  }

  request (method, data = {}, axiosOptions = {}) {
    return axios({
      method,
      data,
      url: this.url,
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        'user-id': localStorage.getItem('user_id')
      },
      ...axiosOptions
    }).then(response => {
      return response.data || {}
    }).catch(error => {
      throw new Error(JSON.parse(error.response.data).message)
    })
  }
}

export default function (url) {
  return new Api(url)
}
