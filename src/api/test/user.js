import client from './client'

export default {
  async getUserInfo (id) {
    const url = `/user/${id}`
    const res = await client.get(url)
    return res
  }
}
