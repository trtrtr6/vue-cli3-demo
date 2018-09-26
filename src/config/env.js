/**
 * 配置编译环境和线上环境之间的切换，cli3版本的demo可以直接通过配置文件注入相关参数，不需要以下方式来进行管理
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = ''
let baseImgPath

if (process.env.NODE_ENV === 'development') {
  baseUrl = ''
  baseImgPath = 'static/img/'
} else {
  baseUrl = ''
  baseImgPath = 'static/img/'
}

export {
  baseUrl,
  baseImgPath
}
