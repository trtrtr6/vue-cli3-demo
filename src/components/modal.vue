<template>
  <div class="x-dialog-wrap" v-show="visible">
    <div class="x-dialog" style="margin-top:15vh;width:30%;">
      <div class="x-dialog-header">
        <slot name="header">头部</slot>
        <button class="x-dialog-btn-close" @click="handleClose">关闭</button>
      </div>
      <div class="x-dialog-body">
        <slot>body</slot>
      </div>
      <div class="x-dialog-footer">
        <slot name="footer">尾部</slot>
      </div>
    </div>
  </div>
</template>
<script>
import popup from '@/mixins/popup'
export default {
  props: {

  },
  mixins: [popup],
  data () {
    return {

    }
  },
  methods: {
    handleClose () {
      this.hide()
    },
    hide () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style>
.x-dialog-wrap{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}
.x-dialog{
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 50%;
}
.x-dialog-btn-close{
  position: absolute;
  right:0;
  top:0;
}
.x-modal{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
</style>
