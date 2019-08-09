<template>
  <div class="wrapper">
    <div class="content" ref="BScroll">
      <table>
        <tr>
          <th class="cross">对对对</th>
          <th class="rows" v-for="n in 100" :key="n">对对对</th>
        </tr>
        <tr v-for="n in 50" :key="n">
          <td class="clos">sss</td>
          <td v-for="n in 100" :key="n">搜索</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      scroller: null,
      X: 0,
      Y: 0,
      flag: false
    }
  },
  methods: {
    init () { // 初始化配置
      const that = this
      console.log(2232343)
      this.scroller = new BScroll(this.$refs.BScroll, {
        preventDefault: false, // 阻止浏览器默认行为
        probeType: 3, // 1:非实时派发scroll事件; 2:在屏幕滑动的过程中实时的派发 scroll 事件; 3:不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        scrollX: true, // 启动x轴滚动
        scrollY: true, // 启动y轴滚动
        momentum: true, // 是否开启快速滑动
        directionLockThreshold: 0, // 斜滑时，锁定一个方向滚动
        bounce: { // 滑动到边缘时出现回弹动画
          top: false,
          bottom: true,
          left: false,
          right: false
        },
        pullUpLoad: { // 开启上拉加载，Boolean | Object
          threshold: 50
        }
      })
      function _onScroll (pos) { // 滚动函数
        const frozenCrosses = document.querySelectorAll('.wrapper .cross')
        const frozenRows = document.querySelectorAll('.wrapper .rows')
        const frozenClos = document.querySelectorAll('.wrapper .clos')
        const loadMore = document.querySelectorAll('.wrapper .loadMore')
        that.X = pos.x
        that.Y = pos.y
        frozenCrosses.forEach((el) => {
          console.log(el, `translate(${pos.x}px, ${pos.y}px, 0px)`)
          el.style.transform = `translate(${pos.x}px, ${pos.y}px, 0px)`
        })
        frozenRows.forEach((el) => {
          el.style.transform = `translate3d(0px, ${-pos.y}px, 0px)`
        })
        frozenClos.forEach((el) => {
          el.style.transform = `translate3d(${-pos.x}px, 0px, 0px)`
        })
        loadMore.forEach((el) => {
          el.style.transform = `translate3d(0px, ${pos.y}px, 0px)`
        })
      }
      this.scroller.on('scroll', _onScroll)
      this.scroller.on('scrollEnd', _onScroll)
      this.scroller.on('beforeScrollStart', () => {
        setTimeout(() => {
          this.scroller.refresh()
        }, 20)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>
<style>
.content {
  overflow: hidden;
  max-height: 800px;
  width: 100vw;
}
table {
  width: 8200px;
}
.rows {
  background: #fe6400;
}
.clos {
  background: green;
}
</style>
