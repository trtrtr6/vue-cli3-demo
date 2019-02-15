<template>
  <div class="container">
    <x-modal :visible.sync="visible">
      <div slot="header">测试头部</div>
      <div>测试body</div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <el-button slot="append" @click="openDialog" size="mini">打开dialog框</el-button>
  </div>
</template>
<script>
import XModal from '@/components/modal'
export default {
  data () {
    return {
      visible: false
    }
  },
  components: {
    XModal
  },
  methods: {
    openDialog () {
      this.visible = true
    }
  }
}
</script>
