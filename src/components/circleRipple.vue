<template>
  <transition name="x-ripple" appear @enter="enter" @beforeEnter="beforeEnter">
    <div class="x-circle-ripple" :style="styles"/>
  </transition>
</template>
<script>
export default {
  props: {
    mergeStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    color: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number
    }
  },
  computed: {
    styles () {
      console.log(this.mergeStyle)
      console.log(this.color)
      return Object.assign({}, { color: this.color, opacity: this.opacity }, this.mergeStyle)
    }
  },
  methods: {
    enter () {
      console.log('enter')
    },
    beforeEnter () {
      console.log('beforeEnter')
    }
  }
}
</script>

<style lang="less">
.x-circle-ripple{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  user-select: none;
  border-radius: 50%;
  background-color: currentColor;
  background-clip: padding-box;
  opacity: 0.1;
}

.x-ripple-enter-active, .x-ripple-leave-active{
  transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 2s cubic-bezier(0.23, 1, 0.32, 1);
}

.x-ripple-enter {
  transform: scale(0);
}

.x-ripple-leave-active{
  opacity: 0 !important;
}
</style>
