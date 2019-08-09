<template>
  <transition name="x-dialog-fade">
    <x-popup type="dialog" :mask="true" v-show="isVisible" @maskClick="maskClick">
      <div class="x-dialog-main">
        <div :class="containerClass">
          <div v-if="!isCustom && (title || $slots.title)" class="x-dialog-title">
            <slot name="title">
              <p class="x-dialog-title-def">{{title}}</p>
            </slot>
          </div>
          <div class="x-dialog-content">
            <slot>
              <div class="x-dialog-content-def">
                {{content}}
              </div>
            </slot>
          </div>
          <div class="x-dialog-btns" v-if="!isCustom">
            <slot name="btns">
              <a href="javascript:;" class="x-dialog-btn x-dialog-btn-cancel" v-if="isConfirm"
                @click="cancel">{{_cancelBtn.text}}</a>
              <a href="javascript:;" class="x-dialog-btn x-dialog-btn-confirm"
                @click="confirm">{{_confirmBtn.text}}</a>
            </slot>
          </div>
        </div>
      </div>
    </x-popup>
  </transition>
</template>

<script>
import xPopup from '../popup/popup.vue'
import popupMixin from '@/mixins/popupWap'

const formatBtnOption = (obj) => {
  if (typeof obj === 'string') {
    return {
      text: obj
    }
  } else {
    return obj
  }
}

const defConfirmBtn = {
  text: '确定'
}
const defCancelBtn = {
  text: '取消'
}
export default {
  name: 'x-dialog',
  mixins: [popupMixin],
  props: {
    type: {
      type: String,
      default: 'alert',
      validator: (value) => {
        return ['confirm', 'alert', 'custom'].indexOf(value) !== -1
      }
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    confirmBtn: {
      type: [Object, String],
      default () {
        return {
          ...defConfirmBtn
        }
      }
    },
    cancelBtn: {
      type: [Object, String],
      default () {
        return {
          ...defCancelBtn
        }
      }
    }
  },
  components: {
    xPopup
  },
  computed: {
    _confirmBtn () {
      return formatBtnOption(this.confirmBtn)
    },
    _cancelBtn () {
      return formatBtnOption(this.cancelBtn)
    },
    isCustom () {
      return this.type === 'custom'
    },
    isConfirm () {
      return this.type === 'confirm'
    },
    containerClass () {
      return `x-dialog-${this.type}`
    }
  },
  methods: {
    confirm (e) {
      this.hide()
      this.$emit('confirm', e)
    },
    cancel (e) {
      this.hide()
      this.$emit('cancel', e)
    }
  }
}
</script>
<style lang="less">
@import "~@/assets/css/border-1px.less";
@btn-active-bgc: rgba(0, 0, 0, 0.04);
@btn-border-color: #dddddd;
.x-dialog-main {
  width: 540px;
  padding: 0;
  text-align: center;
  overflow: hidden;
  border-radius: 24px;
  background-color: #ffffff;
  .x-dialog-confirm,
  .x-dialog-alert {
    position: relative;
    overflow: hidden;
  }
  .x-dialog-title {
    font-size: 36px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 36px;
    .x-dialog-title-def {
      padding-top: 36px;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .x-dialog-content {
    text-align: center;
    color: #666666;
    font-size: 32px;
    line-height: 36px;
    .x-dialog-content-def {
      padding: 45px 0;
    }
  }
  .x-dialog-confirm {
    .x-dialog-btns {
      .x-dialog-btn {
        width: 50%;
        float: left;
      }
    }
  }
  .x-dialog-btns {
    overflow: hidden;
    width: 100%;
    font-size: 0;
  }

  .x-dialog-btn {
    display: inline-block;
    width: 100%;
    padding: 30px 10px;
    margin: 0;
    font-size: 36px;
    line-height: 1;
    text-align: center;
    text-decoration: none;
    color: #666666;
    background-color: #fff;
    background-clip: padding-box;
    box-sizing: border-box;
    border-top: 1px solid @btn-border-color; /*no*/
    .ad-border-top(@color: @btn-border-color, @el:after);
    &:active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    &.x-dialog-btn-cancel {
      border-right: 1px solid @btn-border-color; /*no*/
      color: #666666;
      .ad-border-right(@color: @btn-border-color);
    }
    &.x-dialog-btn-confirm {
      color: #f74143;
    }
  }
}
.x-dialog-fade-enter-active {
  animation: dialog-fadein 0.4s;
  .x-dialog-main {
    animation: dialog-zoom 0.4s;
  }
}

.x-dialog-fade-leave-active {
  animation: dialog-fadeout 0.2s;
}

@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes dialog-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
