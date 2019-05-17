<template>
  <div>
    <el-select v-model="mounth" placeholder="请选择年份" @change="changeYear">
      <el-option
        v-for="item in years"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-select v-model="mounth" placeholder="请选择月份" @change="changeMounth">
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
import {} from '@/utils/commonUtils'
export default {
  data () {
    return {
      date: new Date(),
      dateArr: [],
      mounth: 0,
      years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
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
    changeYear () {
    },
    changeMounth (value) {
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
