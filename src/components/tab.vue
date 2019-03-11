<template>
  <div class="x-tab-contain">
    <div class="x-tab-main row">
      <template v-for="(item, index) in tabList">
        <div class="x-tab-item col-xs row center-xs middle-xs" :class="[isActive === item.value ? 'active' : '']" :key="index" @click="swichTab(item)">
          <div>{{item.label}}</div>
        </div>
      </template>
    </div>
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
    }
  },
  data () {
    return {
      isActive: this.value
    }
  },
  methods: {
    swichTab (item) {
      this.isActive = item.value
      this.$emit('input', item.value)
    }
  }
}
</script>
<style>
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
</style>
