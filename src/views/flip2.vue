<template>
  <div class="container">
    <div class="app">
      <div class="scene -gallery">
        <div class="item" :data-key="item.dataKey" v-for="(item, index) in items" :key="index" @click="detail($event)">
          <img :src="item.src" alt="" />
        </div>
    </div>
      <div class="scene -detail" style="display:none;">
        <div class="detail"  @click="item($event)">
          <img />
          <div class="content">
            <div class="title">测试标题</div>
            <div class="description">测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述
              测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述
              测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述
            </div>
          </div>
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
    // this.init()
  },
  methods: {
    detail (e) {
      const detailItem = document.querySelector('.detail')
      const detailScene = document.querySelector('.scene.-detail')

      const item = e.target.parentNode
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

      detailItem.animate([
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
    },
    item (e) {
      const detailItem = document.querySelector('.detail')
      const detailScene = document.querySelector('.scene.-detail')
      const itemImage = document.querySelector(`[data-key="${detailItem.getAttribute('data-image')}"]`)
      let itemImageRect = itemImage.getBoundingClientRect()
      let detailItemRect = detailItem.getBoundingClientRect()

      detailScene.style.display = 'none'
      itemImage.style.opacity = 1

      itemImage.animate([
        {
          zIndex: 2,
          transform: `
              translateX(${detailItemRect.left - itemImageRect.left}px)
              translateY(${detailItemRect.top - itemImageRect.top}px)
              scale(${detailItemRect.width / itemImageRect.width})
            `
        },
        {
          zIndex: 2,
          transform: 'none'
        }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
      })
    }
    // init () {
    //   const items = document.querySelectorAll('.item')
    //   const detailItem = document.querySelector('.detail')
    //   const detailScene = document.querySelector('.scene.-detail')

    //   detailScene.style.display = 'none'

    //   items.forEach((item) => {
    //     item.addEventListener('click', () => {
    //       const itemImage = item.querySelector('img')

    //       detailItem.setAttribute('data-image', item.getAttribute('data-key'))

    //       detailItem.querySelector('img').setAttribute('src', itemImage.getAttribute('src'))

    //       detailScene.style.display = 'block'
    //       item.style.opacity = 0

    //       let firstRect = itemImage.getBoundingClientRect()
    //       let lastRect = detailItem.getBoundingClientRect()

    //       console.log('firstRect', firstRect)
    //       console.log('lastRect', lastRect)
    //       console.log('translateX', (firstRect.left - lastRect.left))
    //       console.log('translateY', (firstRect.top - lastRect.top))
    //       console.log('scale', (firstRect.width / lastRect.width))

    //       detailItem.animate([
    //         {
    //           transform: `
    //             translateX(${firstRect.left - lastRect.left}px)
    //             translateY(${firstRect.top - lastRect.top}px)
    //             scale(${firstRect.width / lastRect.width})
    //           `
    //         },
    //         {
    //           transform: 'none'
    //         }
    //       ], {
    //         duration: 600,
    //         easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
    //       })
    //     })
    //   })

    //   detailItem.addEventListener('click', () => {
    //     const itemImage = document.querySelector(`[data-key="${detailItem.getAttribute('data-image')}"]`)
    //     let itemImageRect = itemImage.getBoundingClientRect()
    //     let detailItemRect = detailItem.getBoundingClientRect()

    //     detailScene.style.display = 'none'
    //     itemImage.style.opacity = 1

    //     itemImage.animate([
    //       {
    //         zIndex: 2,
    //         transform: `
    //           translateX(${detailItemRect.left - itemImageRect.left}px)
    //           translateY(${detailItemRect.top - itemImageRect.top}px)
    //           scale(${detailItemRect.width / itemImageRect.width})
    //         `
    //       },
    //       {
    //         zIndex: 2,
    //         transform: 'none'
    //       }
    //     ], {
    //       duration: 600,
    //       easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
    //     })
    //   })
    // }
  }
}
</script>

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

  > .content {
    background: #232323;
    flex: 1 0 auto;
    padding: 0.8rem 0.5rem;
    animation: slide-down 0.6s ease-in-out;

    @keyframes slide-down {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    > * {
      margin-bottom: 1rem;
    }

    > .title {
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    > .creator {
      opacity: 0.6;
      margin-top: -0.5rem;
    }

    > .description {
      line-height: 1.5;
    }
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
