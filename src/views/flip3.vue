<template>
  <div class="container">
    <div class="ani_cont">
        <div class="ani_cont2" id="tg2"></div>
    </div>
    <div class="btn_cont">
      <a href="javascript:;" @click="flipani2()">FLIP动画</a>
    </div>
    <div>
      <div class="test1" ref="test1" @click="ceshi($event)">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png"/>
      </div>
      <div class="test2" ref="test2">
        <img>
      </div>
    </div>
    <div class="app">
      <div class="scene -gallery">
        <div class="item" :data-key="item.dataKey" v-for="(item, index) in items" :key="index" @click="detail($event)">
          <img :src="item.src" alt="" />
        </div>
      </div>
      <div class="scene -detail" style="display:none;">
        <div class="detail">
          <img />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          dataKey: 'owl',
          src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png'
        },
        {
          dataKey: 'deer',
          src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-deer.png'
        },
        {
          dataKey: 'hipster',
          src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-hipster.png'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    ceshi (e) {
      const d = e.target
      console.log(d)
      const firstRect = d.getBoundingClientRect()
      console.log(firstRect)
      const dt = this.$refs.test2
      dt.querySelector('img').setAttribute('src', d.getAttribute('src'))

      const lastRect = dt.getBoundingClientRect()
      console.log(lastRect)
      dt.style.background = '#ddd'
      dt.animate([
        {
          transform: `
              translateX(${firstRect.left - lastRect.left}px)
              translateY(${firstRect.top - lastRect.top}px)
              scale(${firstRect.width / lastRect.width})
            `
        },
        {
          transform: 'none'
        }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
      })
      // 不知道为啥加了图片之后requestAnimationFrame不是很好用，
      // 有时候有过渡效果，有时候直接跳过了过渡效果，不是很理想，可能是对这个东西理解还不到位
      // dt.style.transform = `translate(${firstRect.left - lastRect.left}px,${firstRect.top - lastRect.top}px) scale(${firstRect.width / lastRect.width})`
      // requestAnimationFrame(function () {
      //   dt.className = dt.className + ' trans2'
      //   dt.style.transform = ''
      // })
    },
    flipani2 () {
      var tg2 = document.getElementById('tg2')
      var rt = tg2.getBoundingClientRect()
      tg2.style.left = '400px'
      var rt2 = tg2.getBoundingClientRect()
      var invert = rt.left - rt2.left
      console.log(invert)
      tg2.style.transform = 'translateX(' + invert + 'px)'
      requestAnimationFrame(function () {
        tg2.className = tg2.className + ' trans2'
        tg2.style.transform = ''
      })
    },
    detail (e) {
      console.log(e)
      const detailItem = document.querySelector('.detail')
      const detailScene = document.querySelector('.scene.-detail')

      const item = e.target.parentNode
      console.log(item)
      const itemImage = item.querySelector('img')
      detailItem.setAttribute('data-image', item.getAttribute('data-key'))

      detailItem.querySelector('img').setAttribute('src', itemImage.getAttribute('src'))
      detailScene.style.display = 'block'
      item.style.opacity = 0

      let firstRect = itemImage.getBoundingClientRect()
      let lastRect = detailItem.getBoundingClientRect()
      console.log('firstRect', firstRect)
      console.log('lastRect', lastRect)
      console.log('translateX', (firstRect.left - lastRect.left))
      console.log('translateY', (firstRect.top - lastRect.top))
      console.log('scale', (firstRect.width / lastRect.width))
      detailItem.style.transform = `translate(${firstRect.left - lastRect.left}px,${firstRect.top - lastRect.top}px) scale(${firstRect.width / lastRect.width})`
      requestAnimationFrame(function () {
        detailItem.className = detailItem.className + ' trans2'
        detailItem.style.transform = ''
      })
    }
  }
}
</script>
<style>
.test1{
  width:100Px;
  height:100Px;
  background: #ddd;
}
.test2{
  width:200Px;
  height:200Px;
  transform-origin: top left;
  background: #fff;
}
.test1 img,.test2 img{
  width:100%;
  height:100%;
}
.trans2{
  transition:transform 3s linear;
}
.ani_cont {
  margin: 20px;
  padding: 20px;
  width: 120px;
  height: 120px;
  background: #0C5486;
  position: relative;
}
.ani_cont2 {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  background: #C91010;
}
</style>

<style lang="less" scoped>
.container{
  height: 100%;
  width: 100%;
}
.app {
  height: 100%;
  width: 100%;
  font-family: Lato, sans-serif;
  background: white;
  overflow: hidden;
}

.scene {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;

  &.-gallery {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;

    > .item {
      flex-basis: 30%;
      flex-grow: 0;
      flex-shrink: 0;
      height: auto;
      min-height: 100% / 3;
      // overflow: hidden;
    }
  }
}

.item {
  transform-origin: top left;

  > img {
    height: auto;
    width: 100%;
  }
}

.detail {
  color: white;
  width: 100%;
  height: 100%;
  transform-origin: top left;
  display: flex;
  flex-direction: column;

  > img {
    height: auto;
    width: 100%;
    height: auto;
    flex: 0 1 auto;
    z-index: 1;
  }
}

body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #1D1F20;
}

html, body {
  font-size: 14px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
  position: relative;
}
</style>
