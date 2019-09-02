export default function install (Vue) {
  const that = this

  if (install.installed) return
  install.installed = true

  Object.defineProperty(Vue.prototype, '$TestApi', {
    // 项目中直接使用this.$TestApi访问相关的api对象
    get () {
      return that
    }
  })
}
