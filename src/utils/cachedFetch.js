import { baseUrl } from './env'
/**
 * 目前只针对GET方式的请求提供缓存功能，post方式的接口一般数据多变，不建议缓存
 */
export default async (url = '', data = {}, expiry) => {
  let type = 'GET'
  type = type.toUpperCase()
  url = baseUrl + url

  let dataStr = '' // 数据拼接字符串
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&'
  })

  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
    url = url + '?' + dataStr
  }
  if (window.fetch) {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      expiry: expiry
    }
    try {
      const response = await cachedFetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  }
}

const cachedFetch = (url, options) => {
  let expiry = 5 * 60 // 默认 5 min
  expiry = options.expiry * 60 || expiry
  // 将 URL 作为 localStorage 的 key
  let cacheKey = url
  if (window.localStorage) {
    let cached = localStorage.getItem(cacheKey)
    let whenCached = localStorage.getItem(cacheKey + ':ts')
    if (cached !== null && whenCached !== null) {
      let age = (Date.now() - whenCached) / 1000
      if (age < expiry) {
        let response = new Response(new Blob([cached]))
        return Promise.resolve(response)
      } else {
        // 清除旧值
        localStorage.removeItem(cacheKey)
        localStorage.removeItem(cacheKey + ':ts')
      }
    }
  }

  return fetch(url, options).then(response => {
    // 仅在结果为 JSON 或其他非二进制数据情况下缓存结果
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response.clone().text().then(content => {
          if (window.localStorage) {
            localStorage.setItem(cacheKey, content)
            localStorage.setItem(cacheKey + ':ts', Date.now())
          }
        })
      }
    }
    return response
  })
}
