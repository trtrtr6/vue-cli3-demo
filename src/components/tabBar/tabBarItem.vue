<template>
  <div class="x-tabbar-item" :class="{'x-tabbar-item_active': isActive}" @click="handleClick">
    <slot name="icon" :isActive="isActive">
      <i :class="icon"></i>
    </slot>
    <slot :isActive="isActive">
      <div class="x-label" v-html="label"></div>
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      required: true,
      type: [String, Number]
    },
    value: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$parent.addItem(this)
  },
  destroyed () {
    this.$parent.removeItem(this)
  },
  computed: {
    isActive () {
      return this.$parent.value === this.value
    }
  },
  methods: {
    handleClick () {
      this.$parent.trigger(this.value)
    }
  }
}
</script>

<style lang="less">
.x-tabbar-item {
  text-align: center;
  font-weight: 400;
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  .x-label {
    font-size: 32px;
    color: #808080;
    line-height: 45px;
    padding-top: 22px;
    padding-bottom: 21px;
  }
  &.x-tabbar-item_active .x-label {
    color: #333;
  }
}
</style>
