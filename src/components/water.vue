<template>
  <canvas ref="water"></canvas>
</template>
<script>
import { Debounce, getCurrentPx } from '@/utils/commonUtils'
import { requestAnimationFrame, cancelAnimationFrame } from '@/utils/requestAnimationFrame'
export default {
  props: {
    max: {
      type: Number,
      default: 1000
    },
    rangeValue: {
      type: [Number],
      default: 0
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    colorStart: {
      type: String,
      default: 'rgba(238,220,178,1)'
    },
    colorEnd: {
      type: String,
      default: 'rgba(192,150,99,0.2)'
    },
    textColor: {
      type: String,
      default: '#F2691D'
    },
    textStrokeColor: {
      type: String,
      default: 'rgba(242,78,29,1)'
    },
    useEasing: {
      type: Boolean,
      default: true
    },
    easingFn: {
      type: Function,
      default (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b
        return -c / 2 * ((--t) * (t - 2) - 1) + b
      }
    }
  },
  data () {
    return {
      drawCloseFlag: false, // 绘制过程是否已经完毕
      rAF: null,
      ctx: null,
      nowRange: 0,
      startTime: null, // 动画开始时间
      // 画布属性
      mW: 200, // 画布宽度默认200 自动获取样式中设置的宽
      mH: 200, // 画布高度默认200 自动获取样式中设置的高
      // Sin 曲线属性
      sX: 0,
      waveWidth: 0.035, // 波浪宽度,数越小越宽
      waveHeight: 6, // 波浪高度,数越大越高
      speed: 0.05, // 波浪速度，数越大速度越快
      xOffset: 0, // 波浪x偏移量
      isClip: false // 控制只裁剪一次
    }
  },
  computed: {
    sY () {
      return this.mH / 2
    },
    axisLength () { // 轴长
      return this.mW
    },
    // 圆属性
    r () { // 圆心
      return this.mH / 2
    },
    cR () { // 圆半径
      return this.r - getCurrentPx(12)
    }
  },
  watch: {
    rangeValue () {
      this.drawWater()
    }
  },
  methods: {
    drawWater () {
      let rootFontSize = document.documentElement.style.fontSize
      if (rootFontSize === '0px') {
        setTimeout(() => {
          this.waterInit()
        }, 350)
      } else {
        this.waterInit()
      }
    },
    waterInit () {
      if (!this.ctx) {
        this.creatCtx()
      }
      if (this.autoplay) {
        // 自动执行动画
        this.start()
        if (!this.ctx) {
          window.addEventListener('scroll', this.handleScroll)
        }
      }
    },
    start () { // 开始绘制
      this.startTime = null
      this.nowRange = 0
      cancelAnimationFrame(this.rAF)
      this.rAF = requestAnimationFrame(this.render)
    },
    pause () { // 暂停绘制
      cancelAnimationFrame(this.rAF)
      this.rAF = null
    },
    continue: Debounce(function () { // 继续绘制
      this.rAF = requestAnimationFrame(this.render)
    }, 300),
    handleScroll () {
      const waterBox = this.$refs.water.getBoundingClientRect()
      if (waterBox.bottom < 0) {
        if (this.drawCloseFlag) this.pause()
      } else {
        if (!this.rAF) this.continue()
      }
    },
    creatCtx () {
      const scaleFactor = window.devicePixelRatio
      const canvas = this.$refs.water
      this.ctx = canvas.getContext('2d')
      const canvasBox = canvas.getBoundingClientRect()
      console.log('canvasBox', canvasBox)
      console.log('scaleFactor', scaleFactor)
      // 画布属性
      this.mW = canvasBox.width
      this.mH = canvasBox.height
      // *scaleFactor去毛边
      canvas.width = canvasBox.width * scaleFactor
      canvas.height = canvasBox.height * scaleFactor
      this.ctx.scale(scaleFactor, scaleFactor)
    },
    drawCircle (type) {
      const { ctx, r, cR } = this
      ctx.beginPath()
      if (type === 'left') {
        ctx.fillStyle = 'rgba(255,255,255,0.24)'
        ctx.arc(r + getCurrentPx(10), r - getCurrentPx(6), cR, 0, 2 * Math.PI)
      } else if (type === 'right') {
        ctx.fillStyle = 'rgba(255,255,255,0.24)'
        ctx.arc(r - getCurrentPx(10), r, cR, 0, 2 * Math.PI)
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.arc(r, r, cR, 0, 2 * Math.PI)
      }

      ctx.fill()
      ctx.restore()
    },
    clipCircle () {
      let { r, cR } = this
      this.ctx.beginPath()
      this.ctx.save()
      this.ctx.arc(r, r, cR, 0, 2 * Math.PI)
      this.ctx.restore()
      this.ctx.clip()
    },
    drawSin () {
      let { sX, axisLength, waveWidth, xOffset, nowRange, waveHeight, mH } = this
      this.ctx.save()
      var points = [] // 用于存放绘制Sin曲线的点
      this.ctx.beginPath()
      // 在整个轴长上取点
      for (var x = sX; x < sX + axisLength; x += 20 / axisLength) {
        // 此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
        var y = -Math.sin((sX + x) * waveWidth + xOffset)
        var dY = mH * (1 - nowRange / this.max)
        points.push([x, dY + y * waveHeight])
        this.ctx.lineTo(x, dY + y * waveHeight)
      }
      // 封闭路径
      this.ctx.lineTo(axisLength, mH)
      this.ctx.lineTo(sX, mH)
      const point = points[0]
      if (point) {
        this.ctx.lineTo(point[0], point[1])
      }
      // 渐变色
      var linearGradient = this.ctx.createLinearGradient(0, 0, 0, 180)
      linearGradient.addColorStop(0, this.colorStart)
      linearGradient.addColorStop(1, this.colorEnd)
      this.ctx.fillStyle = linearGradient
      this.ctx.fill()
      this.ctx.restore()
    },
    drawText () {
      let { nowRange, r } = this
      this.ctx.save()
      this.ctx.font = `bold ${getCurrentPx(48)}px sans-serif`
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = this.textColor
      this.ctx.fillText(~~(nowRange), r, r)
      this.ctx.strokeStyle = this.textStrokeColor
      this.ctx.strokeText(~~(nowRange), r, r)
      this.ctx.restore()
    },
    drawLabelText () {
      let { r } = this
      this.ctx.save()
      this.ctx.font = `bold ${getCurrentPx(24)}px sans-serif`
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = 'rgba(255,255,255,1)'
      this.ctx.fillText('价值分', r, r + getCurrentPx(35))
      this.ctx.restore()
    },
    render (timestamp) {
      if (!this.startTime) this.startTime = timestamp
      const progress = timestamp - this.startTime
      let { rangeValue, nowRange, mW, mH, speed } = this
      this.ctx.clearRect(0, 0, mW, mH)

      this.drawCircle()
      this.drawCircle('left')
      this.drawCircle('right')

      if (!this.isClip) {
        this.isClip = true
        this.clipCircle()
      }
      if (nowRange < rangeValue && progress < this.duration) {
        if (this.useEasing) {
          this.nowRange = this.easingFn(progress, 0, this.rangeValue, this.duration)
        } else {
          this.nowRange = this.rangeValue * (progress / this.duration)
        }
        this.nowRange = this.nowRange > this.rangeValue ? this.rangeValue : this.nowRange
        this.nowRange = this.nowRange.toFixed(0)
        if (this.nowRange === this.rangeValue) {
          this.drawCloseFlag = true
        }
      }
      this.drawSin()
      this.drawText()
      this.drawLabelText()
      this.xOffset += speed
      this.rAF = requestAnimationFrame(this.render)
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    cancelAnimationFrame(this.rAF)
  }
}
</script>
