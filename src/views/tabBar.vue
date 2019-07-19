<template>
  <div class="wrapper">
    <b-scroll ref="bscroll" @scroll="bscroll" :listenScroll="true" :probeType="3" :bounce="false">
      <div>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
      </div>
      <div>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
        <p>测试类容测试类容测试类容测试类容测试类容</p>
      </div>
      <div class="bar" ref="bar">
        <div class="bar-slide" ref="barSlider"></div>
      </div>
      <div class="swiper-wrapper" id="swiper-wrapper" ref="swiper-wrapper">
        <b-slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot"
          :interval="interval" :threshold="threshold" :speed="speed" @scroll="scroll" :index="index"
          :stopPropagation="stopPropagation" @change="change">
          <div v-for="(item,index) in data" :key="index" class="tab-slide" @click="test($event)">
            <b-scroll ref="scroll" :bounce="false" :listenScroll="true" :probeType="3"
              @topScroll="topScroll" :listenTop="true">
              <div v-if="index === 1">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
                <img :src="item.picUrl">
              </div>
              <div v-else>
                <img :src="item.picUrl">
              </div>
            </b-scroll>
          </div>
        </b-slide>
      </div>
    </b-scroll>
  </div>
</template>
<script>
import bSlide from '@/components/bSlide'
import bScroll from '@/components/bScroll'
export default {
  data () {
    return {
      position: 0,
      top: false,
      index: 0,
      turnToPrev: false,
      turnToNext: false,
      isAutoPlay: false,
      isLoop: false,
      isShowDot: false,
      stopPropagation: false,
      speed: 400,
      threshold: 0.3,
      interval: 4000,
      data: [
        {
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg'
        },
        {
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg'
        },
        {
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg'
        }
      ]
    }
  },
  components: {
    bSlide,
    bScroll
  },
  mounted () {
    document.addEventListener('touchmove', (e) => {
      if (document.getElementById('swiper-wrapper').contains(e.target)) {
        console.log(this.stopPropagation, this.top)
        if ((this.stopPropagation && this.top) || this.first) {
          const touch = e.touches[0]
          if (this.startY) {
            const dix = touch.clientY - this.startY
            const dir = this.getSlideDirection(this.startX, this.startY, touch.clientX, touch.clientY)
            if (dir === 2) {
              console.log('====', dix)
              this.first = true
              // this.$refs.bscroll.scrollTo(0, dix - this.position, 0)
            }
          } else {
            this.startY = touch.clientY
            this.startX = touch.clientX
          }
        } else {
          this.startY = null
          this.startX = null
        }
      }
    })
    document.addEventListener('touchend', (e) => {
      this.startY = null
      this.first = false
    })
    this.position = this.$refs.bar.getBoundingClientRect().top
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.scroll.forEach((item) => {
          item.disable()
        })
      }, 20)
    })
  },
  methods: {
    scroll (pos, slide) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.bar.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.setSliderTransform(deltaX)
    },
    change (index) {
      this.index = index
      console.log('当前index', index)
    },
    setSliderTransform (offset) {
      const slider = this.$refs.barSlider
      if (typeof offset === 'number') {
        offset = `${offset}px`
      }
      if (slider) {
        // slider.style.transition = `transform 0.2s linear`
        slider.style.transform = `translateX(${offset}) translateZ(0)`
      }
    },
    goToPage () {
      this.$refs.slide.goToPage(2)
    },
    test (e) {
      console.log(e)
    },
    bscroll (pos) {
      if (Math.abs(pos.y) >= this.position) {
        this.stopPropagation = true
        this.$refs.scroll.forEach((item) => {
          item.enable()
        })
      } else {
        this.stopPropagation = false
        this.$refs.scroll.forEach((item) => {
          item.disable()
        })
      }
    },
    topScroll (flag) {
      console.log(flag)
      this.top = flag
    },
    // 返回角度
    getSlideAngle (dx, dy) {
      return Math.atan2(dy, dx) * 180 / Math.PI
    },

    // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    getSlideDirection (startX, startY, endX, endY) {
      var dy = startY - endY
      var dx = endX - startX
      var result = 0

      // 如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result
      }

      var angle = this.getSlideAngle(dx, dy)
      if (angle >= -45 && angle < 45) {
        result = 4
      } else if (angle >= 45 && angle < 135) {
        result = 1
      } else if (angle >= -135 && angle < -45) {
        result = 2
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3
      }

      return result
    }

  }
}
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  overflow-x: hidden;
  height: 100vh;
  .bar-slide {
    width: 33vw;
    height: 10vh;
    background: #fe6400;
  }
}
.swiper-wrapper {
  position: relative;
  .tab-slide {
    width: 100%;
    height: 90vh;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
