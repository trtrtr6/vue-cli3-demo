import { baseUrl } from './env'
import { getBasicReqInfo } from './mUtils'
import store from '../store/'

export default async (url = '', data = {}, type = 'GET', method = 'fetch', isForm = false) => {
  type = type.toUpperCase()
  url = baseUrl + url
  let reqData = getBasicReqInfo()
  const head = store.state.adminInfo
  if (type === 'GET') {
    reqData = Object.assign({}, reqData, data)
  }
  let dataStr = ''
  Object.keys(reqData).forEach(key => {
    dataStr += key + '=' + reqData[key] + '&'
  })
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
    url = url + '?' + dataStr
  }
  if (window.fetch && method === 'fetch') {
    let headers = {
      'Accept': 'application/json',
      'X-Authorization': head ? (head.token ? 'Bearer ' + head.token : '') : ''
    }
    if (!isForm) {
      headers['Content-Type'] = 'application/json'
    }
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: headers,
      mode: 'cors',
      cache: 'default'
    }

    if (type === 'POST' || type === 'PUT') {
      let body = data
      if (!isForm) { // 是否是文件上传请求
        body = JSON.stringify(data)
      }
      Object.defineProperty(requestConfig, 'body', {
        value: body
      })
    }

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

      let sendData = ''
      if (type === 'POST' || type === 'PUT') {
        sendData = data
        if (!isForm) {
          sendData = JSON.stringify(data)
        }
      }

      requestObj.open(type, url, true)
      if (!isForm) {
        requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      }
      requestObj.setRequestHeader('X-Authorization', head ? (head.token ? 'Bearer ' + head.token : '') : '')
      requestObj.send(sendData)

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
