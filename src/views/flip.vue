<template>
  <div>
    <section class="gallery">
      <div v-for="(item,index) in imgList" :key="index" class="photo photo-1" @click="test(item,$event)">
        <img :src="item.src"/>
      </div>
    </section>
    <section class="details" ref='detail' data-key='phone'>
      <div class="photo">
        <img :src="src"/>
      </div>
      <!-- <p class="description">
        Lorem ipsum dolor sit amet...
      </p> -->
    </section>
  </div>
</template>

<script>
import Flipping from 'flipping'
export default {
  data () {
    return {
      imgList: [
        {
          src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png',
          flipKey: 'photo-1'
        },
        {
          src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png',
          flipKey: 'photo-2'
        },
        {
          src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png',
          flipKey: 'photo-3'
        }
      ],
      flipping: null,
      src: '',
      isActive: true
    }
  },
  mounted () {
    this.flipping = new Flipping({
      duration: 6000,
      attribute: 'data-key'
    })
  },
  methods: {
    test (item, e) {
      const r = e.target.getBoundingClientRect()
      const t = this.$refs.detail
      this.src = item.src
      this.isActive = false
      t.style.top = r.top + 'px'
      t.style.left = r.left + 'px'
      t.style.width = r.width + 'px'
      this.flipping.read()
      t.style.width = '300px'
      this.flipping.flip()
    }
  }
}
</script>

<style scoped>
.gallery{
  width:100px;
  position: absolute;
}
img{
  width:100%;
}
.details{
  display:block;
  opacity:1;
  position: absolute;
}
.hide{
  opacity:0;
}
</style>
