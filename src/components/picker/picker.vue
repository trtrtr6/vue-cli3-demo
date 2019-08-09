<template>
  <transition name="x-picker-fade">
    <x-popup type="picker" :mask="true" :center="false" @touchmove.prevent v-show="isVisible"
      @maskClick="maskClick">
      <transition name="x-picker-move">
        <div class="x-picker-panel" v-show="isVisible">
          <div class="x-picker-content">
            <slot></slot>
          </div>
          <div class="x-picker-foot"></div>
        </div>
      </transition>
    </x-popup>
  </transition>
</template>
<script>

import xPopup from '../popup/popup.vue'
import popupMixin from '@/mixins/popupWap'
export default {
  name: 'x-picker',
  mixins: [popupMixin],
  props: {
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  components: {
    xPopup
  }
}
</script>

<style lang="less">
.x-picker-move-enter,
.x-picker-move-leave-active {
  transform: translate3d(0, 100%, 0);
}
.x-picker-move-enter-active,
.x-picker-move-leave-active {
  transition: all 0.3s ease-in-out;
}

.x-picker-fade-enter,
.x-picker-fade-leave-active {
  opacity: 0;
}
.x-picker-fade-enter-active,
.x-picker-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
