<template>
  <transition name="x-picker-fade">
    <x-popup type="picker" :mask="true" :center="false" @touchmove.prevent v-show="isVisible"
      @maskClick="maskClick">
      <transition name="x-picker-move">
        <div class="x-picker-panel" v-show="isVisible">
          <div class="x-picker-choose" v-if="!isCustom">
            <slot name="choose">
              <span class="x-picker-cancel" @click="cancel">取消</span>
              <span class="x-picker-confirm" @click="confirm">确定</span>
            </slot>
          </div>
          <div class="x-picker-content">
            <slot>
              <div class="x-mask-top"></div>
              <div class="x-mask-bottom"></div>
              <div class="x-wheel-wrapper" ref="wheelWrapper">
                <div class="x-wheel" v-for="(data,index) in finalData" :key="index">
                  <ul class="x-wheel-scroll">
                    <li v-for="(item, index) in data" :key="index"
                      :class="{'x-wheel-disabled-item':item.disabled}" class="x-wheel-item">
                      {{item.value}}</li>
                  </ul>
                </div>
              </div>
            </slot>
          </div>
          <div class="x-picker-foot" v-if="!isCustom">
            <slot name="choose">
            </slot>
          </div>
        </div>
      </transition>
    </x-popup>
  </transition>
</template>
<script>

import xPopup from '../popup/popup.vue'
import popupMixin from '@/mixins/popupWap'
import BScroll from 'better-scroll'
export default {
  name: 'x-picker',
  mixins: [popupMixin],
  props: {
    type: {
      type: String,
      default: 'custom',
      validator: (value) => {
        return ['custom', 'date', 'time', 'date-time'].indexOf(value) !== -1
      }
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    pickerData: {
      type: Array,
      default: () => []
    },
    selectedIndex: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      finalData: this.pickerData.slice()
    }
  },
  computed: {
    isCustom () {
      return this.type === 'custom'
    }
  },
  components: {
    xPopup
  },
  created () {
    this._values = []
    this._indexes = this.selectedIndex
  },
  methods: {
    pickerInit () { // picker初始化
      this.finalData = this.pickerData.slice()
      this.$nextTick(() => {
        this.wheels = []
        let wheelWrapper = this.$refs.wheelWrapper
        for (let i = 0; i < this.finalData.length; i++) {
          this._createWheel(wheelWrapper, i)
        }
      })
    },
    cancel () {
      this.hide()
    },
    confirm () {
      this.hide()
      let changed = false
      let pickerSelectedText = []
      const length = this.finalData.length
      const oldLength = this._values.length
      // when column count has changed.
      if (oldLength !== length) {
        changed = true
        oldLength > length && (this._values.length = this._indexes.length = length)
      }
      for (let i = 0; i < length; i++) {
        let index = this.wheels[i].getSelectedIndex()
        this._indexes[i] = index
        let value = null
        let text = ''
        if (this.finalData[i].length) {
          value = this.finalData[i][index].value
          text = this.finalData[i][index].text
        }
        if (this._values[i] !== value) {
          changed = true
        }
        this._values[i] = value
        pickerSelectedText[i] = text
      }

      this.$emit('select', this._values, this._indexes, pickerSelectedText)
      if (changed) {
        this.$emit('value-change', this._values, this._indexes, pickerSelectedText)
      }
    },
    _createWheel (wheelWrapper, i) { // 创建各个picker选择列
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wheelWrapper.children[i], {
          swipeTime: 500,
          wheel: {
            selectedIndex: this.selectedIndex[i],
            rotate: 15,
            wheelWrapperClass: 'x-wheel-scroll',
            wheelItemClass: 'x-wheel-item'
          },
          bounce: false,
          probeType: 3
        })
        this.wheels[i].on('scrollEnd', () => {
          this.$emit('change', i, this.wheels[i].getSelectedIndex())
        })
      } else {
        this.wheels[i].refresh()
      }
      return this.wheels[i]
    },
    refillColumn (index, data) { // 属性下级picker列(当某一列选择发生变化时)
      const wheelWrapper = this.$refs.wheelWrapper
      let scroll = wheelWrapper.children[index].querySelector('.x-wheel-scroll')
      let wheel = this.wheels ? this.wheels[index] : false
      let dist = 0
      if (scroll && wheel) {
        let oldData = this.finalData[index]
        console.log(index)
        console.log('data', data)
        console.log('oldData', oldData)
        this.$set(this.finalData, index, data)
        let selectedIndex = wheel.getSelectedIndex()
        if (oldData.length) {
          let oldValue = oldData[selectedIndex].value
          for (let i = 0; i < data.length; i++) {
            if (data[i].value === oldValue) {
              dist = i
              break
            }
          }
        }
        console.log(this.selectedIndex)
        this.selectedIndex[index] = dist
        this.$nextTick(() => {
          // recreate wheel so that the wrapperHeight will be correct.
          wheel = this._createWheel(wheelWrapper, index)
          wheel.wheelTo(dist)
        })
      }
      return dist
    },
    refresh () {
      this.$nextTick(() => {
        this.wheels.forEach((wheel, index) => {
          wheel.refresh()
        })
      })
    }
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
.x-picker-choose {
  position: relative;
  background: #fff;
  height: 80px;
  border-bottom: 1px solid #dcdcdc;
  .x-picker-cancel,
  .x-picker-confirm {
    position: absolute;
    line-height: 80px;
    font-size: 32px;
    padding: 0 28px;
  }
  .x-picker-cancel {
    left: 0;
  }
  .x-picker-confirm {
    right: 0;
  }
}
.x-picker-content {
  position: relative;
}
/*picker组件内容样式start*/
.x-mask-top,
.x-mask-bottom {
  z-index: 10;
  width: 100%;
  height: 160px;
  pointer-events: none;
  transform: translateZ(0);
}

.x-mask-top {
  position: absolute;
  top: 0;
  border-bottom: 1px solid #dcdcdc;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
}

.x-mask-bottom {
  position: absolute;
  bottom: 1px;
  border-top: 1px solid #dcdcdc;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
}

.x-wheel-wrapper {
  display: flex;
  padding: 0 16px;
  background: #fff;
  .x-wheel {
    flex: 1;
    height: 400px;
    overflow: hidden;
    font-size: 42px;
  }
  .x-wheel-scroll {
    padding: 0;
    margin-top: 160px;
    line-height: 36px;
    list-style: none;
  }
  .x-wheel-item {
    list-style: none;
    text-align: center;
    height: 80px;
    line-height: 80px;
    overflow: hidden;
    white-space: nowrap;
    color: #333;
    &.x-wheel-disabled-item {
      opacity: 0.2;
    }
  }
}
/*picker组件内容样式end*/
</style>
