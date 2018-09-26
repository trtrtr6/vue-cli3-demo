import { baseUrl } from './env'
import store from '../store/'

export default async (url = '', data = {}, method = 'fetch') => {
  const type = 'POST'
  url = baseUrl + url
  const head = store.state.adminInfo
  if (window.fetch && method === 'fetch') {
    let headers = {
      'Accept': 'application/json',
      'X-Authorization': head ? (head.token ? 'Bearer ' + head.token : '') : ''
    }
    let requestConfig = {
      credentials: 'include',
      method: 'application/json',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    }
    let body = data
    Object.defineProperty(requestConfig, 'body', {
      value: body
    })
    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new window.ActiveXObject()
      }
      requestObj.open(type, url, true)
      requestObj.setRequestHeader('X-Authorization', head ? (head.token ? 'Bearer ' + head.token : '') : '')
      requestObj.send(data)
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
