<template>
  <div class="container">
    <div>
      <h1>时间格式转换</h1>
      <span>yyyy-MM-dd hh:mm:ss S q</span>
      <div>
        <el-input placeholder="请输入内容" v-model="format" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="getFormatDate"></el-button>
        </el-input>
        <p>{{fdate}}</p>
      </div>
    </div>
    <div>
      <h1>对时间进行转换</h1>
      <span>(1分钟内显示刚刚,1小时内显示xx分钟前,今日的显示时分,昨天显示昨天+时分,一年内显示月日时分,一年外显示年月日)</span>
      <p><el-button slot="append" @click="randomDate" size="mini">随机生成时间并转换</el-button></p>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          {{item.date+'=========='+item.formatDate}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import dateUtils from '@/utils/dateUtils'
export default {
  data () {
    return {
      format: 'yyyy-MM-dd q hh:mm:ss S',
      fdate: '',
      list: []
    }
  },
  methods: {
    getFormatDate () {
      this.fdate = dateUtils.dateFormat(new Date(), this.format)
    },
    randomDate () {
      let s1 = new Date()
      s1.setFullYear(s1.getFullYear() - 1)
      for (let i = 0; i < 10; i++) {
        let date = new Date()
        date = dateUtils.getRandomDateBetween(s1, new Date())
        const obj = {
          date: dateUtils.dateFormat(date, 'yyyy-MM-dd hh:mm:ss'),
          formatDate: dateUtils.timeChange(date)
        }
        this.list.push(obj)
      }
      let s2 = new Date()
      s2.setMonth(s2.getMonth() - 1)
      for (let i = 0; i < 10; i++) {
        let date = new Date()
        date = dateUtils.getRandomDateBetween(s2, new Date())
        const obj = {
          date: dateUtils.dateFormat(date, 'yyyy-MM-dd hh:mm:ss'),
          formatDate: dateUtils.timeChange(date)
        }
        this.list.push(obj)
      }
      let s3 = new Date()
      s3.setDate(s3.getDate() - 1)
      for (let i = 0; i < 10; i++) {
        let date = new Date()
        date = dateUtils.getRandomDateBetween(s3, new Date())
        const obj = {
          date: dateUtils.dateFormat(date, 'yyyy-MM-dd hh:mm:ss'),
          formatDate: dateUtils.timeChange(date)
        }
        this.list.push(obj)
      }
    }
  },
  filters: {

  }
}
</script>
<style>
.container .el-input{
  width:300px;
}
</style>
