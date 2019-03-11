<template>
  <div class="container-box">
    <x-tab v-model="tab" :tabList="tabList"></x-tab>
  </div>
</template>
<script>
import xTab from '@/components/tab'
export default {
  data () {
    return {
      tab: '1',
      tabList: [
        {
          value: '1',
          label: '测试一'
        },
        {
          value: '2',
          label: '测试二'
        },
        {
          value: '3',
          label: '测试三'
        }
      ]
    }
  },
  components: {
    xTab
  },
  watch: {
    tab (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
.container-box{
  padding:20px 30px;
}
</style>
