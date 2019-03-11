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
  }
}
