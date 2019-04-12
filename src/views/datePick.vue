<template>
  <div>
    <el-select v-model="mounth" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div style="padding:15px;font-size:16px;">{{options[mounth].label + '的日历'}}</div>
    <el-row class="x-date">
      <el-col v-for="(item,index) in dateArr" :key="index" class="x-date-item" :class="{'x-not-self-mounth': !item.isCurrentMonth,'x-today': item.isToday}">{{item.day}}</el-col>
    </el-row>
  </div>
</template>
<script>
import dateUtils from '@/utils/dateUtils'
import { mounths } from '@/utils/constants'
export default {
  data () {
    return {
      date: dateUtils.dateFormat(new Date()),
      dateArr: [],
      mounth: 0,
      options: mounths
    }
  },
  created () {
    const now = new Date()
    this.mounth = now.getMonth()
    this.getDateMatrix(new Date())
  },
  methods: {
    getDateMatrix (date) {
      const dArr = dateUtils.getMonthMatrix(date)
      this.dateArr = dArr
    },
    change (value) {
      const date = new Date()
      date.setMonth(value)
      this.getDateMatrix(date)
    }
  }
}
</script>
<style>
.x-date{
  width: 300px;
  padding:15px;
}
.x-date-item{
  width:14.28%;
  padding: 3px 0;
}
.x-today{
  color:#409eff;
  font-weight: bold;
}
.x-not-self-mounth{
  color:#c0c4cc
}
</style>
