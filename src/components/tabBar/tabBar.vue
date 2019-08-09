<template>
  <div class="x-tab-bar">
    <div class="x-row">
      <slot>
        <x-tab-bar-item v-for="(item, index) in data" :label="item | labelFilter"
          :value="item | valueFilter(index)" :icon="item.icon" :key="index"></x-tab-bar-item>
      </slot>
      <div class="x-tab-bar-slider" ref="slider" v-show="showSlider"></div>
    </div>
  </div>
</template>
<script>
import xTabBarItem from './tabBarItem.vue'
let vendor = (() => {
  let elementStyle = document.createElement('div').style
  let transformNames = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  /* istanbul ignore next */
  return false
})()
function findIndex (ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}
function prefixStyle (style) {
  /* istanbul ignore if */
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend'
    }
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
const TRANSFORM = prefixStyle('transform')
const TRANSITION = prefixStyle('transition')
export default {
  props: {
    width: { // bar宽度的百分比
      type: Number,
      default: 0
    },
    value: {
      type: [String, Number],
      required: true
    },
    useTransition: {
      type: Boolean,
      default: false
    },
    showSlider: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: { xTabBarItem },
  methods: {
    _getOffsetLeft (index) {
      return this.tabItems[index].$el.offsetLeft || 0
    },
    _updateSliderStyle () {
      if (!this.showSlider) return
      const slider = this.$refs.slider
      this.$nextTick(() => {
        const width = this.computedWidth
        const index = findIndex(this.tabItems, (tab) => tab.value === this.value)
        slider.style.width = width + '%'
        this.setSliderTransform(this._getOffsetLeft(index))
      })
    },
    setSliderTransform (offset) {
      const slider = this.$refs.slider
      if (typeof offset === 'number') {
        offset = `${offset}px`
      }
      if (slider) {
        if (this.useTransition) slider.style[TRANSITION] = `${TRANSFORM} 0.2s linear`
        slider.style[TRANSFORM] = `translateX(${offset}) translateZ(0)`
      }
    },
    initSliderLayout () {
      if (this.showSlider) {
        const width = this.computedWidth
        const slider = this.$refs.slider
        slider.style.width = width + '%'
        slider.style.left = ((50 / this.computedLength) - width / 2) + '%'
      }
    },
    addItem (item) {
      this.tabItems.push(item)
    },
    removeItem (item) {
      const index = this.tabItems.indexOf(item)
      if (index > -1) this.tabItems.splice(index, 1)
    },
    trigger (value) {
      this.$emit('click', value)
      if (value !== this.value) {
        this.$emit('change', value)
        this.$emit('input', value)
      }
    }
  },
  filters: {
    labelFilter (item) {
      return typeof item === 'object' ? item.label : item
    },
    valueFilter (item, index) {
      return typeof item === 'object' ? item.value : index
    }
  },
  created () {
    this.tabItems = []
  },
  mounted () {
    this.initSliderLayout()
  },
  computed: {
    computedLength () {
      if (this.$slots.default) return this.$slots.default.length
      if (this.data && this.data.length) return this.data.length
      return 1
    },
    computedWidth () {
      if (this.showSlider) {
        if (this.width > 0) return this.width
        return Number(100 / this.computedLength)
      }
      return 0
    }
  },
  watch: {
    width () {
      this.initSliderLayout()
    },
    value () {
      this._updateSliderStyle()
    }
  }
}
</script>

<style lang="less">
.x-tab-bar {
  position: relative;
  > .x-row {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .x-tab-item {
    text-align: center;
    font-size: 30px;
  }
  .x-tab-bar-slider {
    position: absolute;
    left: 0;
    bottom: 1px;
    height: 6px;
    background: rgba(247, 65, 67, 1);
  }
}
</style>
