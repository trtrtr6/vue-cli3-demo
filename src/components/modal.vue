<template>
  <transition name="dialog-fade">
    <div class="x-dialog-wrap" :style="{transformOrigin:transformOrigin}" v-show="selfVisible" @click.self="handleWrapperClick">
      <div class="x-dialog" :style="style">
        <div class="x-dialog-header">
          <slot name="header">默认头部</slot>
          <button class="x-dialog-btn-close" @click="handleClose">关闭</button>
        </div>
        <div class="x-dialog-body">
          <slot>默认body</slot>
        </div>
        <div class="x-dialog-footer">
          <slot name="footer">默认尾部</slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import popup from '@/mixins/popup'
export default {
  props: {
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    }
  },
  mixins: [popup],
  computed: {
    style () {
      const { width, top } = this
      return {
        width,
        top
      }
    }
  },
  methods: {
    handleWrapperClick () {
      this.handleClose()
    },
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
.dialog-fade-enter-active {
  animation: zoomIn .3s;
}

.dialog-fade-leave-active {
  animation: zoomOut .3s;
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }
  50% {
    opacity: 1;
  }
}
@keyframes zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }
  to {
    opacity: 0;
  }
}

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
  margin: 0 auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
.x-dialog-header{
  position:relative;
  padding: 20px 20px 10px 20px;
}
.x-dialog-body{
  padding:20px;
}
.x-dialog-footer{
  padding:10px 20px 20px 20px;
}
.x-dialog-btn-close{
  position: absolute;
  right:20px;
  top:20px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
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
