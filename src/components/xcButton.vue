<template>
  <button class="x-button" :class="[type?'x-button-'+type:'']">
    <canvas-ripple></canvas-ripple>
    <slot></slot>
  </button>
</template>
<script>
import canvasRipple from './canvasRipple'
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  components: {
    canvasRipple
  }
}
</script>
<style>
.x-button {
  position: relative;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.x-button + .x-button {
  margin-left: 10px;
}
.x-button:focus,
.x-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.x-button::-moz-focus-inner {
  border: 0;
}
.x-button-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.x-button-primary:focus,
.x-button-primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.x-button-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.x-button-success:focus,
.x-button-success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}

.x-button-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.x-button-warning:focus,
.x-button-warning:hover {
  background: #ebb563;
  border-color: #ebb563;
  color: #fff;
}

.x-button-danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.x-button-danger:focus,
.x-button-danger:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.x-button-info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.x-button-info:focus,
.x-button-info:hover {
  background: #a6a9ad;
  border-color: #a6a9ad;
  color: #fff;
}
</style>
