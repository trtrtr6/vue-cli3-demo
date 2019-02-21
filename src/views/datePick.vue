<template>
  <div>
    <el-button @click="getDateMatrix">获取日期矩阵</el-button>
    <div style="width:300px;" class="row">
      <div v-for="(item,index) in dateArr" :key="index" class="col-xs x-date-item">{{item.date}}</div>
    </div>
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
