<template>
  <div class="wrapper">
    <b-scroll ref="bscroll" @scroll="bscroll" :listenScroll="true" @touchEnd="btouchEnd"
      :listenBeforeScroll="true" @beforeScrollStart="bbeforeScrollStart" :probeType="3"
      :bounce="false">
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
          :interval="interval" :threshold="threshold" :speed="speed" @scroll="scroll"
          @change="change" @touchEnd="touchEnd" @beforeScrollStart="beforeScrollStart">
          <div v-for="(item,index) in data" :key="index" class="tab-slide" @click="test($event)">
            <b-scroll ref="scroll" :bounce="false" :listenScroll="true" :listenScrollEnd="true"
              @scroll="innerScroll" :listenBeforeScroll="true" @scrollEnd="scrollEnd" :probeType="3"
              @topScroll="topScroll">
              <div v-if="index === 0 || index === 1">
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
      turnToPrev: false,
      turnToNext: false,
      isAutoPlay: false,
      isLoop: false,
      isShowDot: false,
      speed: 400,
      threshold: 0.3,
      interval: 4000,
      data: [
        {
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg'
        },
        {
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg'
        }
      ]
    }
  },
  components: {
    bSlide,
    bScroll
  },
  mounted () {
    this.position = this.$refs.bar.getBoundingClientRect().top
    this.$nextTick(() => {
      setTimeout(() => {
        this.disableInner()
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
    touchEnd () {
      console.log('===', 'touchEnd')
      this.$refs.scroll.forEach((item) => {
        item.enable()
      })
      this.$refs.bscroll.enable()
    },
    beforeScrollStart () {
      console.log('===', 'beforeScrollStart', this.$refs.slide.slide)
      if (this.$refs.slide.slide.movingDirectionX) {
        this.$refs.scroll.forEach((item) => {
          item.disable()
        })
        this.$refs.bscroll.disable()
      }
    },
    change (index) {
      this.index = index
      console.log('当前index', index)
      this.disableInner()
    },
    setSliderTransform (offset) {
      const slider = this.$refs.barSlider
      if (typeof offset === 'number') {
        offset = `${offset}px`
      }
      if (slider) {
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
      this.disableInner()
    },
    bbeforeScrollStart () {
      if (this.$refs.bscroll.scroll.movingDirectionY) {
        this.$refs.scroll.forEach((item) => {
          item.disable()
        })
        this.$refs.slide.slide.disable()
      }
    },
    btouchEnd () {
      this.$refs.scroll.forEach((item) => {
        item.enable()
      })
      this.$refs.slide.slide.enable()
    },
    disableInner () {
      const y = this.$refs.bscroll.scroll.y
      const index = this.index || 0
      const scrolls = this.$refs.scroll
      scrolls.forEach((item) => {
        if (!item.scroll.enabled) scrolls[index].enable()
      })
      if (Math.abs(y) < this.position) {
        if (scrolls[index].scroll.enable) scrolls[index].disable()
      } else {
        this.$refs.slide.slide.enable()
      }
    },
    topScroll (flag) {
      if (flag) {
        this.$refs.bscroll.enable()
      } else {
        const top = this.$refs.bar.getBoundingClientRect().top
        if (top <= 0) this.$refs.bscroll.disable()
      }
    },
    scrollEnd () {
      this.$refs.bscroll.enable()
    },
    innerScroll (pos) {
      console.log('===', pos)
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
