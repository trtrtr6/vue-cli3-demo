<template>
  <div ref="wrapper" class="x-scroll-wrapper">
    <div class="x-scroll-content">
      <div class="x-scroll-list-wrapper">
        <slot></slot>
        <div v-if="pullUpLoad" class="x-pullup" ref="pullup">
          <slot name="pullUp" :pullUpTxt="pullUpTxt" :isLoading="isLoading">
            <div class="x-pullup-load-wrap">
              <div class="x-loading" v-if="isLoading">
                正在加载...
              </div>
              <div class="x-unloading" v-else>
                {{pullUpTxt}}
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
const DEFAULT_OPTIONS = {
  observeDOM: true,
  click: true,
  probeType: 3,
  scrollbar: false,
  pullDownRefresh: false,
  pullUpLoad: false,
  bounce: false
}
const SCROLL_EVENTS = ['scroll', 'beforeScrollStart', 'scrollEnd']
const PULLUP_STATUS_TXT = {
  more: '加载更多',
  noMore: '没有更多'
}
export default {
  provide () {
    return {
      parentScroll: this
    }
  },
  inject: {
    parentScroll: {
      default: null
    }
  },
  props: {
    pullUpProp: { // 上拉加载文字显示
      default: null
    },
    option: { // betterScroll自定义option
      type: Object,
      default () {
        return {}
      }
    },
    scrollEvents: { // 对scroll实例添加事件监听[eventname]
      type: Array,
      default: () => [],
      validator (arr) {
        return arr.every((item) => {
          return SCROLL_EVENTS.indexOf(item) !== -1
        })
      }
    }
  },
  data () {
    return {
      isLoading: false,
      isNoMore: false
    }
  },
  computed: {
    finalScrollEvents () {
      const finalScrollEvents = this.scrollEvents.slice()
      if (!finalScrollEvents.length) {
        this.listenScroll && finalScrollEvents.push('scroll')
        this.listenBeforeScroll && finalScrollEvents.push('beforeScrollStart')
      }
      return finalScrollEvents
    },
    pullUpTxt () {
      let text = Object.assign({}, PULLUP_STATUS_TXT, this.pullUpProp)
      const { more, noMore } = text
      return this.isNoMore ? noMore : more
    },
    pullUpLoad () {
      return this.option.pullUpLoad
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
    if (document.readyState === 'complete') {
      this.refresh()
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.refresh()
      }, false)
    }
  },
  methods: {
    initScroll () {
      const wrapper = this.wrapper = this.$refs.wrapper
      if (!wrapper) return
      // 合并options
      let options = Object.assign({}, DEFAULT_OPTIONS, {
        scrollY: true,
        scrollX: false
      }, this.option)
      this.scroll = new BScroll(wrapper, options)
      this.parentScroll && this._handleNestScroll()
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
      this._listenScrollEvents()
    },
    _listenScrollEvents () {
      this.finalScrollEvents.forEach((event) => {
        this.scroll.on(event, (...args) => {
          this.$emit(event, ...args)
        })
      })
    },
    _checkReachBoundary (pos, scroll, option = {}) {
      // 边界判断
      // outerScroll: 判断是否往上滑到底
      // innerScroll: 判断是否往下拉到底
      // 反之不算越界，不移交scroll权限
      const distY = scroll.distY
      let reachBoundaryY
      if (option.maxOnly) {
        reachBoundaryY = distY < 0 ? pos.y <= scroll.maxScrollY : false
      } else if (option.minOnly) {
        reachBoundaryY = distY > 0 ? pos.y >= scroll.minScrollY : false
      } else {
        reachBoundaryY = distY > 0 ? pos.y >= scroll.minScrollY : distY < 0 ? pos.y <= scroll.maxScrollY : false
      }
      return reachBoundaryY
    },
    _handleNestScroll () {
      this.$nextTick(() => {
        const innerScroll = this.scroll
        const outerScroll = this.parentScroll.scroll
        const scrolls = [innerScroll, outerScroll]
        scrolls.forEach((scroll, index, arr) => {
          scroll.on('touchEnd', () => {
            innerScroll.enable()
            outerScroll.enable()
            outerScroll.initiated = innerScroll.initiated = false
          })
          scroll.on('beforeScrollStart', () => {
            const anotherScroll = arr[(index + 1) % 2]
            anotherScroll.stop()
            anotherScroll.resetPosition()
          })
        })
        const onOutScrollHandle = (pos) => {
          if (!outerScroll.initiated || outerScroll.isInTransition || outerScroll.movingDirectionY === 0 || !this.isVisible(innerScroll)) {
            return
          }
          if (!innerScroll.hasVerticalScroll) {
            !innerScroll.destroyed && innerScroll.destroy()
            outerScroll.off('scroll', onOutScrollHandle)
            return
          }
          const reachBoundary = this._checkReachBoundary(pos, outerScroll, { maxOnly: true })
          // 下拉，out拉不动, inner有空间
          const isInnerPass = outerScroll.movingDirectionY === -1 && pos.y >= 0 && innerScroll.y < 0
          if (reachBoundary || isInnerPass) {
            outerScroll.resetPosition()
            outerScroll.disable()
            innerScroll.pointX = outerScroll.pointX
            innerScroll.pointY = outerScroll.pointY
            innerScroll.enable()
            innerScroll.off('scroll', this._innerScrollEvent)
            innerScroll.on('scroll', this._innerScrollEvent)
          } else {
            innerScroll.disable()
            innerScroll.off('scroll', this._innerScrollEvent)
          }
        }
        outerScroll.on('scroll', onOutScrollHandle)
        outerScroll.on('scrollEnd', () => {
          // 解决第一次点击事件失效
          outerScroll.isInTransition = false
        })
      })
    },
    _innerScrollEvent (pos) {
      const innerScroll = this.scroll
      const outerScroll = this.parentScroll.scroll
      if (!innerScroll.initiated || innerScroll.isInTransition || innerScroll.movingDirectionY === 0) {
        return
      }
      const reachBoundary = this._checkReachBoundary(pos, innerScroll, { minOnly: true })
      // 上拉优先滑动outer, 判断out是否有滑动空间
      const isOuterPass = innerScroll.movingDirectionY === 1 && outerScroll.y > outerScroll.maxScrollY
      if (reachBoundary || isOuterPass) {
        innerScroll.resetPosition()
        innerScroll.disable()
        outerScroll.pointX = innerScroll.pointX
        outerScroll.pointY = innerScroll.pointY
        outerScroll.enable()
      } else {
        outerScroll.disable()
      }
    },
    _initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        this.isLoading = true
        this.$emit('pullingUp')
      })
    },
    forceUpdate (isNoMore) {
      if (this.pullUpLoad && this.isLoading) {
        this.isLoading = false
        this.isNoMore = isNoMore
        this.scroll.finishPullUp() // 数据已加载完毕
        isNoMore && this.scroll.closePullUp()
        this.refresh()
      } else {
        this.refresh()
      }
    },
    isVisible (innerScroll) { // 当前scroll是否在屏幕内
      let x = innerScroll.wrapper.getBoundingClientRect().left
      return x >= 0 && x < this.scroll.wrapperWidth
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>
<style lang="less">
.x-scroll-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  .x-scroll-content {
    position: relative;
    z-index: 1;
  }
  .x-scroll-list-wrapper {
    overflow: hidden;
    .x-pullup {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .x-pullup-load-wrap {
        height: 60px;
        line-height: 60px;
      }
      .x-unloading,
      .x-loading {
        color: #aba6a6;
      }
    }
  }
}
</style>
