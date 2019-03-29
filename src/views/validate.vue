<template>
  <div>

  </div>
</template>
<script>
import Person from '@/bo/personBo'
export default {
  data () {
    return {

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
  }
}
</script>
