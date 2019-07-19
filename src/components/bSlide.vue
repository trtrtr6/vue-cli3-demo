<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"
        :key="index"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { addClass } from '@/utils/dom'
export default {
  name: 'slide',
  props: {
    index: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    stopPropagation: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    this.update()

    window.addEventListener('resize', () => {
      if (!this.slide || !this.slide.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    })
  },
  activated () {
    if (!this.slide) {
      return
    }
    this.slide.enable()
    let pageIndex = this.slide.getCurrentPage().pageX
    this.slide.goToPage(pageIndex, 0, 0)
    this.currentPageIndex = pageIndex
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    this.slide.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy () {
    this.slide.disable()
    clearTimeout(this.timer)
  },
  methods: {
    update () {
      if (this.slide) {
        this.slide.destroy()
      }
      this.$nextTick(() => {
        this.init()
      })
    },
    refresh () {
      this._setSlideWidth(true)
      this.slide.refresh()
    },
    prev () {
      this.slide.prev()
    },
    next () {
      this.slide.next()
    },
    goToPage (index) {
      this.slide.goToPage(index)
    },
    init () {
      clearTimeout(this.timer)
      this.currentPageIndex = 0
      this._setSlideWidth()
      if (this.showDot) {
        this._initDots()
      }
      this._initSlide()
      this.slide.goToPage(this.index, 0, 0)
      if (this.autoPlay) {
        this._play()
      }
    },
    _setSlideWidth (isResize) {
      this.children = this.$refs.slideGroup.children
      let width = 0
      let slideWidth = this.$refs.slide.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slide-item')

        child.style.width = slideWidth + 'px'
        width += slideWidth
      }
      if (this.loop && !isResize) {
        width += 2 * slideWidth
      }
      this.$refs.slideGroup.style.width = width + 'px'
    },
    _initSlide () {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        probeType: 3,
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        bounce: false,
        stopPropagation: this.stopPropagation,
        click: this.click
        // eventPassthrough: 'vertical'
      })
      this.slide.on('scroll', this._onScroll)
      this.slide.on('scrollEnd', this._onScrollEnd)

      this.slide.on('touchEnd', () => {
        if (this.autoPlay) {
          this._play()
        }
      })

      this.slide.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _onScroll (pos) {
      this.$emit('scroll', pos, this.slide)
    },
    _onScrollEnd () {
      let pageIndex = this.slide.getCurrentPage().pageX
      if (this.currentPageIndex !== pageIndex) {
        this.currentPageIndex = pageIndex
        this.$emit('change', pageIndex)
      }
      if (this.autoPlay) {
        this._play()
      }
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slide.next()
      }, this.interval)
    }
  },
  watch: {
    loop () {
      this.update()
    },
    autoPlay () {
      this.update()
    },
    speed () {
      this.update()
    },
    threshold () {
      this.update()
    },
    stopPropagation () {
      this.update()
    }
  }
}
</script>

<style lang="less">
.slide {
  min-height: 1px;
  .slide-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slide-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fe6400;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: #ffffff;
      }
    }
  }
}
</style>
