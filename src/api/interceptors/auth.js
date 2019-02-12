
const defaultOptions = {
  use: ['request', 'response']
}

export default function (client, options) {
  const opts = Object.assign(defaultOptions, options)

  const interceptors = {
    request: {
      success (config) {
        // do something 添加本地缓存的token等
        return config
      },
      error (e) {
        return Promise.reject(e)
      }
    },
    response: {
      async success (res) {
        // code === 10000, refreshtoken 失效, 自动重新登录
        if (res.status === 200 && res.data.code === 10000) {
          // do something
          return client(res.config)
        }
        return res
      },
      async error (e) {
        const res = e.response
        // token 失效，需要用refreshtoken 换取新的token
        if (res.status === 401) {
          // do something
          return client(res.config)
        }
        return Promise.reject(e)
      }
    }
  }

  opts.use.forEach(use => {
    client.interceptors[use].use(interceptors[use].success, interceptors[use].error)
  })

  return client
}
