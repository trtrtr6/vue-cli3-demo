<template>
  <div class="x-tab-contain" ref='tabBar'>
    <div class="x-tab-main row" :class="{'x-is-fixed': isShowFixed}" :style="{width:tabWidth}">
      <template v-for="(item, index) in tabList">
        <div class="x-tab-item col-xs row center-xs middle-xs" :class="[isActive === item.value ? 'active' : '']" :key="index" @click="swichTab(item)">
          <div>{{item.label}}</div>
        </div>
      </template>
    </div>
    <div class="x-place-box" v-show="isShowFixed" :style="{height:tabHeight}"></div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: () => { return [] }
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: this.value,
      isShowFixed: false,
      tabWidth: '100%',
      tabHeight: '0'
    }
  },
  mounted () {
    if (this.isFixed) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    swichTab (item) {
      this.isActive = item.value
      this.$emit('input', item.value)
    },
    handleScroll () {
      // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let rect = this.$refs.tabBar.getBoundingClientRect()
      const top = rect.top
      const flag = top < 0
      if (this.isShowFixed !== flag) {
        this.isShowFixed = flag
        if (flag) {
          this.tabWidth = `${rect.width}px`
          this.tabHeight = `${rect.height}px`
        }
      }
    },
    toggle (tabIndex) {
      this.whichTab = tabIndex
      window.location.href = '#tabar' // 锚点
    }
  }
}
</script>
<style lang="less">
.x-tab-contain{
  width:100%;
  height:100%;
}
.x-tab-item{
  padding:6px 0;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  background: #fff;
  border: 1px solid #dcdfe6;
  font-weight: 500;
  border-left: 0;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  font-size: 14px;
  border-radius: 0;
}
.x-tab-item:first-child{
  border-left: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  box-shadow: none!important;
}
.x-tab-item:last-child{
  border-radius: 0 4px 4px 0;
}
.x-tab-item.active{
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  box-shadow: -1px 0 0 0 #409eff;
}
.x-tab-main{
  width:100%;
  .x-place-box{
    width:100%;
  }
}
.x-is-fixed{
  position: fixed;
  top:0px;
  z-index:999;
}
</style>
