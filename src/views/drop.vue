<template>
  <div class="drop-containner">
    <drop-down :selections="list" v-model="selected" @change="dropChange" @open="dropOpen"/>
  </div>
</template>

<script>
import dropDown from '@/components/dropDown'
export default {
  data () {
    return {
      selected: 'hour', // 时间快捷选择
      list: [
        { value: 'hour', label: '最近24小时' },
        { value: 'day7', label: '最近7天' },
        { value: 'day14', label: '最近14天' },
        { value: 'day30', label: '最近30天' }
      ]
    }
  },
  components: {
    dropDown
  },
  methods: {
    dropChange () {
      console.log('dropChange')
    },
    dropOpen () {
      console.log('dropOpen')
    }
  }
}
</script>
<style lang="less">
.drop-containner{
  margin:40px;
}
</style>
