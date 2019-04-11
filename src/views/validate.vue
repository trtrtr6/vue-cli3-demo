<template>
  <div>
    <button @click="setRes">设置</button>
    <button @click="getRes">获取</button>
  </div>
</template>
<script>
import Person from '@/bo/personBo'
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
