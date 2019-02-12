const defaultOptions = {
  use: ['response']
}

export default function (client, options) {
  const opts = Object.assign(defaultOptions, options)

  const interceptors = {
    response: {
      success (res) {
        if (res.data.code !== 0) {
          throw new Error(res.data.message)
        }
        return res
      },
      error (e) {
        return Promise.reject(e)
      }
    }
  }

  opts.use.forEach(use => {
    client.interceptors[use].use(interceptors[use].success, interceptors[use].error)
  })

  return client
}
