<template>
  <div class="pk-box">
    <pk-box :selected="pkSelected" :pkInfo="pkInfo" @pkSelect="pkSelect" @shakeToast="shakeToast"></pk-box>
  </div>
</template>

<script>
import pkBox from '@/components/pKComp'
export default {
  data () {
    return {
      pkSelected: 0, // 0==未选择，1==选择左边，2==选择右边
      pkInfo: [
        {
          id: 'l',
          title: '左边',
          value: 35
        },
        {
          id: 'r',
          title: '右边',
          value: 65
        }
      ]
    }
  },
  components: {
    pkBox
  },
  mounted () {
  },
  methods: {
    pkSelect (val, id) {
      this.pkSelected = 1
      console.log('pkSelect', val, id)
    },
    shakeToast () {
      console.log('shakeToast')
    }
  }
}
</script>

<style lang="less" scoped>
.pk-box{
  padding: 30px;
}
</style>
