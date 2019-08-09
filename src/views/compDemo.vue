<template>
  <div class="wrapper">
    <x-scroll ref="outscroll">
      <div class="header-container" @touchend="onTouchEnd">
        <div>
          <h1>头部信息</h1>
        </div>
        <div>
          <xc-button @click.native="pickerVisible=true">打开picker</xc-button>
          <xc-button @click.native="handleConfirm">打开confirm</xc-button>
        </div>
      </div>
      <div class="content-container">
        <div class="tab-bar-container" @touchend="onTouchEnd">
          <x-tab-bar ref="tabBar" :width="10" v-model="selectedIndex" :data="tabData">
          </x-tab-bar>
        </div>
        <div class="tab-slide-container">
          <x-slide ref="slide" @scroll="onSlideScroll" @change="selectChange">
            <x-slide-item>
              <x-scroll>
                <div class="scroll-list">
                  <div v-for="n in 50" :key="n">侧呃呃呃额1111</div>
                </div>
              </x-scroll>
            </x-slide-item>
            <x-slide-item>
              <x-scroll>
                <div class="scroll-list">
                  <div v-for="n in 300" :key="n">侧呃呃呃额222222</div>
                </div>
              </x-scroll>
            </x-slide-item>
          </x-slide>
        </div>
      </div>
    </x-scroll>
    <x-picker :visible.sync="pickerVisible">
      <div class="content-box">
        <p v-for="n in 15" :key="n">
          测试picker
        </p>
      </div>
    </x-picker>
  </div>
</template>
<script>
import xTabBar from '@/components/tabBar/tabBar.vue'
import xSlide from '@/components/slide/slide.vue'
import xSlideItem from '@/components/slide/slideItem.vue'
import xScroll from '@/components/bScroll.vue'
import xPicker from '@/components/picker/picker.vue'
import { removeClass, addClass } from '@/utils/dom'
import xcButton from '@/components/xcButton'

export default {
  data () {
    return {
      pickerVisible: false,
      selectedIndex: 0,
      tabData: [
        '选项一',
        '选项二'
      ]
    }
  },
  components: {
    xTabBar,
    xSlide,
    xSlideItem,
    xScroll,
    xPicker,
    xcButton
  },
  created () {
  },
  mounted () {
  },
  methods: {
    onTouchEnd () {
      let scroll = this.$refs.outscroll
      if (scroll && scroll.scroll) {
        this.$nextTick(() => scroll.scroll.enable())
      }
    },
    showToast (str) {
      this.$createToast({
        txt: str
      }).show()
    },
    onSlideScroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabBar.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabBar.setSliderTransform(deltaX)
    },
    addActiveCls (e) {
      addClass(e.currentTarget, 'li-item-active')
    },
    removeActiveCls (e) {
      removeClass(e.currentTarget, 'li-item-active')
    },
    selectChange (index) {
      this.selectedIndex = index
    },
    handleConfirm () {
      this.$createDialog({
        type: 'confirm',
        content: '从我的订阅中移除该策略？',
        onConfirm: () => {
          this.showToast('点了确定。。。')
        },
        onCancel: () => {
          this.showToast('点了取消。。。')
        }
      }).show()
    }

  },
  watch: {
    selectedIndex (val) {
      this.$refs.slide && this.$refs.slide.goToPage(val)
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/border-1px.less";
.col-xs {
  padding-left: 0;
  padding-right: 0;
}
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  font-size: 26px;
  line-height: 37px;
  width: 100vw;
  .header-container {
    width: 100vw;
    color: #ffffff;
    background: linear-gradient(
      270deg,
      rgba(146, 147, 150, 1) 0%,
      rgba(116, 113, 122, 1) 100%
    );
    padding: 30px;
    & > div {
      padding-bottom: 20px;
    }
    .x-button {
      font-size: 28px;
    }
  }
  .content-container {
    width: 100vw;
  }
  .tab-bar-container {
    border-bottom: 1px solid #e6e6e6; /*px*/
    .x-tab-bar {
      width: 78%;
      margin: 0 auto;
      height: 88px;
    }
    .tab-bar-item {
      font-size: 32px;
      font-weight: 400;
      text-align: center;
      color: rgba(51, 51, 51, 1);
      line-height: 45px;
      padding-top: 22px;
      padding-bottom: 21px;
    }
  }
  .tab-slide-container {
    height: calc(100vh - 88px);
    .scroll-list {
      padding: 30px 30px 60px 30px;
    }
  }
  .content-box {
    border-radius: 20px 20px 8px 8px;
    background: rgba(255, 255, 255, 1);
    padding: 0 30px 30px 30px;
  }
}
</style>
