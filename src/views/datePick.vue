<template>
  <div>
    <el-button @click="getDateMatrix">获取日期矩阵</el-button>
    <el-row style="width:300px;" class="x-date">
      <el-col v-for="(item,index) in dateArr" :key="index" class="x-date-item">{{item.date}}</el-col>
    </el-row>
  </div>
</template>
<script>
import dateUtils from '@/utils/dateUtils'
export default {
  data () {
    return {
      date: dateUtils.dateFormat(new Date()),
      dateArr: []
    }
  },
  methods: {
    getDateMatrix () {
      const dArr = dateUtils.getMonthMatrix(new Date())
      this.dateArr = dArr
    }
  }
}
</script>
<style>
.x-date-item{
  width:14.28%;
  padding: 0;
}
</style>
