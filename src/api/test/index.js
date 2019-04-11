import client from './client'
import install from './install'

// 子模块
import user from './user'
/**
 * 测试接口 vue插件形式，比较繁琐
 */
class TestApi {
  constructor () {
    // if (TestApi.instance) {
    //   throw new Error('TestApi is singleton')
    // }
    // TestApi.instance = this

    client.defaults.baseURL = process.env.baseURL

    this.user = user
    this.t = 11111
  }
  // static getInstance () {
  //   return TestApi.instance
  // }
}
const testApi = new TestApi()

// testApi.instance = null
testApi.install = install

export default testApi
