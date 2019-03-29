export default (target, validator) => {
  return new Proxy(target, {
    // 判断条件
    _validator: validator,
    /**
     * 拦截 set 方法
     * @param target
     * @param key
     * @param value
     * @param proxy
     */
    set (target, key, value, proxy) {
      // 当前对象是否存在key值
      if (target.hasOwnProperty(key)) {
        let va = this._validator[key]
        // 满足条件
        if (va(value)) {
          return Reflect.set(target, key, value, proxy)
        } else {
          throw Error(`不能设置 ${key} 值`)
        }
      } else {
        // 没有key值 抛出异常
        throw Error(`${key} 不存在`)
      }
    }
  })
}
