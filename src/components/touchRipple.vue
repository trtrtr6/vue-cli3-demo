<template>
  <!--最外层用div包裹-->
  <div @mousedown="handleMouseDown" @mouseup="end()" @mouseleave="end()" @touchstart="handleTouchStart"  @touchend="end()" @touchcancel="end()">
    <!--外层包裹防止波纹溢出-->
    <div :style="setStyle" ref="holder">
      <!--多个波纹用 v-for 控制-->
      <circle-ripple :key="ripple.key" :color="ripple.color" :opacity="ripple.opacity" :merge-style="ripple.style" v-for="ripple in ripples"></circle-ripple>
    </div>
    <!--利用slot分发实际内容-->
    <slot></slot>
  </div>
</template>

<script>
import circleRipple from './circleRipple'
export default {
  props: {
    // 是否从中间扩散，设为false会从点击处扩散
    centerRipple: {
      type: Boolean,
      default: true
    },
    // 外层包裹的样式
    setStyle: {
      type: Object,
      default () {
        return {
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          overflow: 'hidden'
        }
      }
    },
    // 波纹颜色
    color: {
      type: String,
      default: ''
    },
    // 波纹透明度
    opacity: {
      type: Number
    }
  },
  data () {
    return {
      nextKey: 0, // 记录下一个波纹元素的key值， 相当于uuid，不设置的话会使动画失效
      ripples: [] // 波纹元素参数数组
    }
  },
  mounted () {
    this.ignoreNextMouseDown = false // 防止既有 touch 又有 mouse点击的情况
  },
  methods: {
    // isRippleTouchGenerated 是否是touch 事件开始的
    start (event, isRippleTouchGenerated) {
    // 过滤 touchstart 和 mousedown 同时存在的情况
      if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
        this.ignoreNextMouseDown = false
        return
      }

      // 添加一个 波纹元素组件
      this.ripples.push({
        key: this.nextKey++,
        color: this.color,
        opacity: this.opacity,
        style: this.centerRipple ? {} : this.getRippleStyle(event) // 不是从中心扩展的需要计算波纹元素的位置
      })
      this.ignoreNextMouseDown = isRippleTouchGenerated
    },
    end () {
      if (this.ripples.length === 0) return
      this.ripples.splice(0, 1) // 删除一个波纹元素
      this.stopListeningForScrollAbort() // 结束 touch 滚动的处理
    },
    handleMouseDown (event) {
      // 只监听鼠标左键的点击
      if (event.button === 0) {
        this.start(event, false)
      }
    },
    handleTouchStart (event) {
      event.stopPropagation() // 防止多个波纹点击组件嵌套
      if (event.touches) {
        this.startListeningForScrollAbort(event) // 启动 touchmove 触发滚动处理
        this.startTime = Date.now()
      }
      this.start(event.touches[0], true)
    },
    // touchmove 结束波纹控制
    stopListeningForScrollAbort () {
      if (!this.handleMove) this.handleMove = this.handleTouchMove.bind(this)
      document.body.removeEventListener('touchmove', this.handleMove, false)
    },
    startListeningForScrollAbort (event) {
      this.firstTouchY = event.touches[0].clientY
      this.firstTouchX = event.touches[0].clientX
      document.body.addEventListener('touchmove', this.handleMove, false)
    },
    handleTouchMove (event) {
      const timeSinceStart = Math.abs(Date.now() - this.startTime)
      if (timeSinceStart > 300) {
        this.stopListeningForScrollAbort()
        return
      }
      const deltaY = Math.abs(event.touches[0].clientY - this.firstTouchY)
      const deltaX = Math.abs(event.touches[0].clientX - this.firstTouchX)
      // 滑动范围在 > 6px 结束波纹点击效果
      if (deltaY > 6 || deltaX > 6) this.end()
    },
    getRippleStyle (event) {
      let holder = this.$refs.holder
      //  这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
      let rect = holder.getBoundingClientRect()
      // 获取点击点的位置
      let x = event.offsetX
      let y
      if (x !== undefined) {
        y = event.offsetY
      } else {
        x = event.clientX - rect.left
        y = event.clientY - rect.top
      }
      // 获取最大边长
      let max
      if (rect.width === rect.height) {
        max = rect.width * 1.412
      } else {
        max = Math.sqrt(
          (rect.width * rect.width) + (rect.height * rect.height)
        )
      }
      const dim = (max * 2) + 'px'
      console.log(`x:${x} y:${y} max:${max} w:${rect.width} h:${rect.height} dim:${dim} `)
      return {
        width: dim,
        height: dim,
        // 通过margin控制波纹中心点和点击点一致
        'margin-left': -max + x + 'px',
        'margin-top': -max + y + 'px'
      }
    }
  },
  components: {
    'circle-ripple': circleRipple
  }
}
</script>
