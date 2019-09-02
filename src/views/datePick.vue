<template>
  <div>
    <el-select v-model="mounth" placeholder="请选择月份" @change="changeMounth">
      <el-option v-for="item in options" :key="item.value" :label="item.label"
        :value="item.value" />
    </el-select>
    <div style="padding:15px;font-size:16px;">
      {{ options[mounth].label + '的日历' }}
    </div>
    <el-row class="x-date">
      <el-col v-for="(item,index) in dateArr" :key="index" class="x-date-item"
        :class="{'x-not-self-mounth': !item.isCurrentMonth,'x-today': item.isToday}">
        {{ item.day }}
      </el-col>
    </el-row>
    <div @click="showPicker">显示日期选择器</div>
    <!-- <x-date-picker ref="datePiceker"></x-date-picker> -->
  </div>
</template>
<script>
import dateUtils from '@/utils/dateUtils'
import { mounths } from '@/utils/constants'

export default {
  data () {
    return {
      options: mounths,
      date: new Date(),
      dateArr: [],
      mounth: 0,
      years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
    }
  },
  created () {
    const now = new Date()
    this.mounth = now.getMonth()
    this.getDateMatrix(new Date())
  },
  mounted () {
    this.datePicker = this.$createDatePicker({
      start: [2019, 1, 1],
      end: '2022-03-02',
      value: '2019-03-18',
      columnCount: 3,
      valueFormat: 'yyyy-MM-dd',
      onSelect: (value) => {
        this.$createDialog({
          type: 'alert',
          content: value.toString()
        }).show()
      },
      onChange: (value) => {
        console.log(value)
      }
    })
  },
  methods: {
    showPicker () {
      // this.$refs.datePiceker.showPicker()
      this.datePicker.showPicker()
    },
    getDateMatrix (date) {
      const dArr = dateUtils.getMonthMatrix(date)
      this.dateArr = dArr
    },
    changeMounth (value) {
      const date = new Date()
      date.setMonth(value)
      this.getDateMatrix(date)
    }
  }
}
</script>
<style lang="less">
.x-date {
  width: 300px;
  padding: 15px;
}
.x-date-item {
  width: 14.28%;
  padding: 3px 0;
}
.x-today {
  color: #409eff;
  font-weight: bold;
}
.x-not-self-mounth {
  color: #c0c4cc;
}
</style>
