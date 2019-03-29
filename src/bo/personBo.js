
import validator from '@/utils/validator'
const personValidators = {
  name (val) {
    return typeof val === 'string'
  },
  age (val) {
    return typeof val === 'number' && val > 18
  }
}
export default class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
    // 返回一个代理
    return validator(this, personValidators)
  }
}
