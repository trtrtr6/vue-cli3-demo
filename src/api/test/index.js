import client from './client'
import install from './install'

// 子模块
import user from './user'
/**
 * 测试接口 vue插件形式，比较繁琐
 */
export default class TestApi {
  constructor () {
    // if (TestApi.instance) {
    //   throw new Error('TestApi is singleton')
    // }
    TestApi.instance = this

    client.defaults.baseURL = process.env.baseURL

    this.user = user
  }
  static getInstance () {
    return TestApi.instance
  }
}

TestApi.instance = null
TestApi.install = install
