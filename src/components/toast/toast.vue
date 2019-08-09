<template>
  <transition name="x-toast-fade">
    <x-popup type="toast" :mask="mask" @maskClick="maskClick" v-show="isVisible">
      <div class="x-toast-innerbox">
        {{txt}}
      </div>
    </x-popup>
  </transition>
</template>

<script>
import xPopup from '../popup/popup.vue'
import popupMixin from '@/mixins/popupWap'

export default {
  name: 'x-toast',
  mixins: [popupMixin],
  props: {
    mask: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 2000
    },
    txt: {
      type: String
    }
  },
  components: {
    xPopup
  },
  methods: {
    show () {
      this.isVisible = true
      this.clearTimer()
      this.$nextTick(() => {
        if (this.time > 0) {
          this.timer = setTimeout(() => {
            this.hide()
            this.$emit('timeout')
          }, this.time)
        }
      })
    },
    hide () {
      this.isVisible = false
      this.clearTimer()
    },
    clearTimer () {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
</script>
<style lang="less">
.x-toast-innerbox {
  height: auto;
  min-height: 80px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  line-height: 1.5;
  font-size: 30px;
  text-align: center;
  padding: 20px 25px;
  border-radius: 5px;
  box-sizing: border-box;
}
.x-toast-fade-enter-active {
  animation: toast-in 0.2s;
}

.x-toast-fade-leave-active {
  animation: toast-out 0.2s;
}

@keyframes toast-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes toast-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
