<template>
  <div class="container">
    <x-modal :visible.sync="visible" @close="close" @open="open">
      <div slot="header">测试头部</div>
      <div>测试body
        <p>加点东西测试一下提交是否需要输入密码</p>
        <p>在测试一下</p>
      </div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <x-modal :visible.sync="visible1">
      <div slot="header">测试头部1</div>
      <div>测试body
        <p>加点东西测试一下提交是否需要输入密码</p>
        <p>在测试一下</p>
      </div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <x-modal :visible.sync="visible2">
      <div slot="header">测试头部2</div>
      <div>测试body
        <p>加点东西测试一下提交是否需要输入密码</p>
        <p>在测试一下</p>
      </div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <x-modal :visible.sync="visible3">
      <div slot="header">测试头部3</div>
      <div>测试body
        <p>加点东西测试一下提交是否需要输入密码</p>
        <p>在测试一下</p>
      </div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <el-button slot="append" @click="openDialog($event)" size="mini">打开dialog框</el-button>
    <el-button style="position:absolute;bottom:0;" slot="append" @click="openDialog1($event)" size="mini">打开dialog1框</el-button>
    <el-button style="position:absolute;right:0;" slot="append" @click="openDialog2($event)" size="mini">打开dialog2框</el-button>
    <el-button style="position:absolute;top:200px;" slot="append" @click="openDialog3($event)" size="mini">打开dialog3框</el-button>
  </div>
</template>
<script>
import XModal from '@/components/modal'
export default {
  data () {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false
    }
  },
  components: {
    XModal
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    close () {
      console.log('监听关闭状态')
    },
    open () {
      console.log('监听打开状态')
    },
    openDialog1 () {
      this.visible1 = true
    },
    openDialog2 () {
      this.visible2 = true
    },
    openDialog3 () {
      this.visible3 = true
    }
  }
}
</script>
