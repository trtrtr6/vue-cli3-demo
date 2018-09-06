<template>
  <div class="about">
    <h1>This is an about page</h1>
    <x-button>水波纹按钮</x-button>
    <xc-button @click.native="test()">水波纹按钮</xc-button>
    <div class="VueStar__decoration" :class="{'VueStar__decoration--active':active}"></div>
  </div>
</template>
<script>
import xButton from '../components/xButton'
import xcButton from '../components/xcButton'
export default {
  components: {
    xButton,
    xcButton
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    test () {
      if (this.active) {
        this.active = false
      } else {
        this.active = true
      }
    }
  }
}
</script>
<style>
.VueStar__decoration {
  overflow-x: scroll;
    width: 100px;
    height: 100px;
    background: url("../assets/123.png") no-repeat;
    background-position: 0 0;
    -webkit-transition: background-position 1s steps(25);
    transition: background-position 1s steps(25);
    -webkit-transition-duration: 0s;
    transition-duration: 0s;
}
.VueStar__decoration--active {
    -webkit-transition-duration: 1s;
    transition-duration: 1s;
    background-position: -2500px 0;
}
</style>
