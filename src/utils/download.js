import { baseUrl } from './env'
import { getBasicReqInfo } from './mUtils'
import store from '../store/'

export default async (url = '', data = {}, type = 'GET') => {
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
  let headers = {
    'Accept': 'application/json',
    'X-Authorization': head ? (head.token ? 'Bearer ' + head.token : '') : '',
    'Content-Type': 'application/json'
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
    body = JSON.stringify(data)
    Object.defineProperty(requestConfig, 'body', {
      value: body
    })
  }
  try {
    const response = await fetch(url, requestConfig)
    const contentType = response.headers.get('Content-Type')
    if (contentType !== 'application/octet-stream') {
      const responseJson = await response.json()
      return responseJson
    }
    const blob = await response.blob()
    var a = document.createElement('a')
    var downloadUrl = window.URL.createObjectURL(blob)
    var filename = 'materials.zip'
    a.href = downloadUrl
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    throw new Error(error)
  }
}
