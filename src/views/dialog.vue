<template>
  <div class="container">
    <x-modal :visible.sync="visible" :event="dialogEvent">
      <div slot="header">测试头部</div>
      <div>测试body
        <p>加点东西测试一下提交是否需要输入密码</p>
        <p>在测试一下</p>
      </div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <x-modal :visible.sync="visible1" :event="dialogEvent1">
      <div slot="header">测试头部</div>
      <div>测试body
        <p>加点东西测试一下提交是否需要输入密码</p>
        <p>在测试一下</p>
      </div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <x-modal :visible.sync="visible2" :event="dialogEvent2">
      <div slot="header">测试头部</div>
      <div>测试body
        <p>加点东西测试一下提交是否需要输入密码</p>
        <p>在测试一下</p>
      </div>
      <div slot="footer">测试尾部</div>
    </x-modal>
    <x-modal :visible.sync="visible3" :event="dialogEvent3">
      <div slot="header">测试头部</div>
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
      visible3: false,
      dialogEvent: undefined,
      dialogEvent1: undefined,
      dialogEvent2: undefined,
      dialogEvent3: undefined
    }
  },
  components: {
    XModal
  },
  methods: {
    openDialog (e) {
      console.log(typeof e)
      this.dialogEvent = e
      this.visible = true
    },
    openDialog1 () {
      this.visible1 = true
    },
    openDialog2 () {
      this.visible2 = true
    },
    openDialog3 () {
      this.visible2 = true
    }
  }
}
</script>
