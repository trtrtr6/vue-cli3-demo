<template>
  <div class="x-popup" :class="rootClass" v-show="isVisible">
    <div class="x-popup-mask" @touchmove.prevent @click="maskClick">
      <slot name="mask"></slot>
    </div>
    <div class="x-popup-container" @touchmove.prevent :class="containerClass">
      <div class="x-popup-content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="x-popup-content" v-else v-html="content">
      </div>
    </div>
  </div>
</template>
<script>
import popupMixin from '@/mixins/popupWap'
export default {
  name: 'x-popup',
  mixins: [popupMixin],
  props: {
    type: {
      type: String,
      default: ''
    },
    mask: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rootClass () {
      const cls = {
        'x-popup_mask': this.mask
      }
      if (this.type) {
        cls[`x-${this.type}`] = true
      }
      return cls
    },
    containerClass () {
      const center = this.center
      return {
        'x-popup-center': center
      }
    }
  }
}
</script>
<style lang="less">
.x-popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  pointer-events: none;
}

.x-popup_mask {
  pointer-events: auto;

  .x-popup-mask {
    display: block;
  }
}

.x-popup-mask,
.x-popup-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.x-popup-mask {
  display: none;
  overflow: hidden;
  background-color: #25262d;
  opacity: 0.4;
  pointer-events: auto;

  // fix some android webview opacity render bug
  &::before {
    content: ".";
    display: block;
    width: 1px;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-left: -10px;
  }
}

.x-popup-container {
  transform: translate(100%, 100%);
}

.x-popup-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  transform: translate(-100%, -100%);
  pointer-events: auto;
}
.x-popup-center {
  .x-popup-content {
    top: -50%;
    left: -50%;
    width: auto;
    max-width: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
