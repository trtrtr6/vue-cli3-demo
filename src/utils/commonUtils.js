/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 存储sessonStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
/**
 * 浏览器信息函数
 */
export const browser = {
  versions: (function () {
    let u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
    }
  }()),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
/**
 * 对象相关函数
 */
export default {
  /**
   * 遍历json对象
   * @param {*} json
   */
  traverseTree (jsonObj, dealFun) {
    for (let key in jsonObj) {
      if (!(jsonObj[key] instanceof Object)) {
        console.log(key + ' = ' + jsonObj[key]) // 如果不是Object则打印键值
        if (typeof dealFun === 'function') dealFun(jsonObj, key)
      } else {
        this.traverseTree(jsonObj[key]) // 如果是Object则递归
      }
    }
  },
  /**
   * 筛选对象属性组成新的对象
   * @param {*} o
   * @param  {...any} props
   */
  pick (o, ...props) {
    let keys = typeof props[0] === 'object' ? props[0] : props
    return keys.reduce((a, x) => {
      if (o && o.hasOwnProperty(x)) { // 也可使用 (x in o)
        a[x] = o[x]
      }
      return a
    }, {})
  },
  /**
   * 条件筛选对象属性组成新的对象
   * @param {*} o
   * @param {*} fun
   */
  pickBy (o, fun) {
    return Object.keys(o).reduce((a, x) => {
      if (o && typeof fun === 'function' && fun(o[x])) {
        a[x] = o[x]
      }
      return a
    }, {})
  },
  /**
   * 筛除不需要的属性组成新的对象
   * @param {*} o
   * @param  {...any} props
   */
  omit (o, ...props) {
    let keys = typeof props[0] === 'object' ? props[0] : props
    return keys.reduce((a, x) => {
      if (o && !o.hasOwnProperty(x)) { // 也可使用 (x in o)
        a[x] = o[x]
      }
      return a
    }, {})
  },
  /**
   * 条件筛除不需要的属性组成新的对象
   * @param {*} o
   * @param {*} fun
   */
  omitBy (o, fun) {
    return Object.keys(o).reduce((a, x) => {
      if (o && typeof fun === 'function' && !fun(o[x])) {
        a[x] = o[x]
      }
      return a
    }, {})
  }
}
