<template>
  <div class="tab-mounting-demo" @click="testThrottle">
    <mu-container>
      <mu-card style="width: 100%; margin: 0 auto;">
        <mu-card-header title="Myron Avatar" sub-title="sub title">
          <mu-avatar slot="avatar">
            <img src="../assets/logo.png">
          </mu-avatar>
        </mu-card-header>
        <mu-card-media title="Image Title" sub-title="Image Sub Title">
          <img src="../assets/logo.png">
        </mu-card-media>
        <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>
        <mu-card-actions>
          <mu-button flat>Action 1</mu-button>
          <mu-button flat>Action 2</mu-button>
        </mu-card-actions>
      </mu-card>
    </mu-container>
    <div class="main-box">
      <div class="row center-xs middle-xs tab-box">
        <x-tab v-model="tab" :tabList="tabList" :isFixed="true"></x-tab>
      </div>
      <div class="content-box" ref="content-box">
        <div class="box-item" v-for="(item, index) in tabList" :key="index">
          <mu-carousel hide-controls>
            <mu-carousel-item>
              <img src="../assets/logo.png">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../assets/logo.png">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../assets/logo.png">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../assets/logo.png">
            </mu-carousel-item>
          </mu-carousel>
          <mu-card style="width: 100%; margin: 0 auto;">
            <mu-card-title :title="item.label" :sub-title="item.label"></mu-card-title>
            <mu-card-text>
              散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
              调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
              似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
              找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </mu-card-text>
          </mu-card>
        </div>
      </div>
    </div>
    <div class="test"></div>
  </div>
</template>
<script>
import xTab from '@/components/tab'
import { Throttle } from '@/utils/commonUtils'
export default {
  data () {
    return {
      tab: '1',
      tabList: [
        {
          value: '1',
          label: '测试一'
        },
        {
          value: '2',
          label: '测试二'
        },
        {
          value: '3',
          label: '测试三'
        }
      ]
    }
  },
  components: {
    xTab
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.test()
    })
  },
  methods: {
    test: Throttle(function () {
      console.log('scroll触发了：' + new Date())
    }, 1000),
    // testThrottle () { // 错误的调用方式，无效
    //   return Throttle(function () {
    //     console.log('click触发了：' + new Date())
    //   }, 1000)
    // },
    testThrottle: Throttle(function () {
      console.log('click触发了：' + new Date())
    }, 1000)
  }
}
</script>
<style lang="less" scoped>
.tab-mounting-demo{
  position: relative;
  width:100%;
  height:100%;
  .tab-box{
    width:100%;
    position: absolute;
    padding:10px;
  }
  .content-box{
    padding: 50px 10px 0 10px;
  }
  .test{
    border:1px solid #ddd;/*px*/
    margin: 20px;
    height:200px;
  }
}
</style>
<style lang="less">
.alert-demo-wrapper {
  width: 100%;
  > .mu-alert {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
