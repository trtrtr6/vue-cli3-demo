<template>
  <div>
    <button @click="setRes">设置</button>
    <button @click="getRes">获取</button>
  </div>
</template>
<script>
import Person from '@/bo/personBo'
import _ from 'lodash'
const users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred', 'age': 40, 'active': false }
]

// The `_.matches` iteratee shorthand.
const aa = _.filter(users, _.iteratee(['age', 36]))
// => [{ 'user': 'barney', 'age': 36, 'active': true }]
console.log('======', aa)
export default {
  data () {
    return {
      test: 1
    }
  },
  computed: {
    testc () {
      return this.test + 1
    },
    testb () {
      return this.testc + 1
    }
  },
  created () {
    let person = new Person('张三', 30)
    console.info(person)
    // 提示错误
    try {
      person.age = 48
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    setRes () {
      console.log(this.test, this.testc, this.testb)
      this.test = 2
    },
    getRes () {
      console.log(this.test, this.testc, this.testb)
    }
  }
}
</script>
