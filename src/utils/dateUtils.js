import dtime from 'time-formater'

export default {
  addHours (date, n) {
    let d = new Date(date)
    return d.setHours(d.getHours() + n)
  },
  addHoursStr (date, n, format = 'YYYY-MM-DD HH') {
    const d = this.addHours(date, n)
    return this.getDateStr(d, format)
  },
  addDays (date, n) {
    let d = new Date(date)
    return d.setDate(d.getDate() + n)
  },
  addDaysStr (date, n, format) {
    const d = this.addDays(date, n)
    return this.getDateStr(d, format)
  },
  getDateStr (date, format = 'YYYY-MM-DD') {
    return dtime(date).format(format)
  },
  /**
   * 根据步长生成区间内的日期数组
   * @param {*} start
   * @param {*} end
   * @param {*} step
   */
  getDateInterval (start, end, step) {
    const startTime = new Date(start)
    const endTime = new Date(end)
    let arr = []
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      const str = dtime(startTime).format('YYYY-MM-DD')
      arr.push(str)
      startTime.setDate(startTime.getDate() + step)
    }
    return arr
  },
  /**
   * 根据步长生成区间内的时间数组
   * @param {*} start
   * @param {*} end
   * @param {*} step
   * @param {*} format
   */
  getTimeInterval (start, end, step, format = 'HH') {
    const startTime = new Date(start)
    const endTime = new Date(end)
    let arr = []
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      const str = dtime(startTime).format(format)
      arr.push(str)
      startTime.setHours(startTime.getHours() + step)
    }
    return arr
  },
  isBetweenDate (date, start, end) {
    let d = new Date(date.substring(0, 10)) // 截取日期部分，得到YYYY-MM-DD格式的日期
    return new Date(start) <= d && d <= new Date(end)
  },
  /**
   * 格式化时间
   * @param {*} date
   * @param {*} fmt
   */
  dateFormat (date, fmt = 'yyyy-MM-dd') {
    date = typeof date !== 'object' ? new Date(date) : date
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  },
  /**
   * 生成日期区间内的随机日期
   * @param {*} start
   * @param {*} end
   */
  getRandomDateBetween (start, end) {
    const date = new Date()
    start = start.getTime()
    end = end.getTime()
    const dif = end - start
    date.setTime(Math.random(dif) * dif + start)
    return date
  },
  isYestday (d) {
    d = typeof d !== 'object' ? new Date(d) : d
    const date = (new Date()) // 当前时间
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() // 今天凌晨
    const yestday = new Date(today - 24 * 3600 * 1000).getTime()
    const timeValue = d.getTime()
    return timeValue < today && yestday <= timeValue
  },
  isYear (d) {
    d = typeof d !== 'object' ? new Date(d) : d
    const takeNewYear = this.dateFormat(new Date(), 'yyyy')// 当前时间的年份
    const takeTimeValue = this.dateFormat(d, 'yyyy')// 传入时间的年份
    return takeTimeValue === takeNewYear
  },
  /**
   * 1分钟内显示刚刚,1小时内显示xx分钟前,今日的显示时分,昨天显示昨天+时分,一年内显示月日时分,一年外显示年月日
   * @param {*} date
   */
  timeChange (d) {
    const timeValue = d.getTime()
    var timeNew = Date.parse(new Date()) // 当前时间
    var timeDiffer = timeNew - timeValue // 与当前时间误差
    let returnTime = ''

    if (timeDiffer <= 60000) { // 一分钟内
      returnTime = '刚刚'
    } else if (timeDiffer > 60000 && timeDiffer < 3600000) { // 1小时内
      returnTime = Math.floor(timeDiffer / 60000) + '分钟前'// 显示xx分钟前
    } else if (timeDiffer >= 3600000 && timeDiffer < 86400000 && this.isYestday(timeValue) === false) { // 今日
      returnTime = this.dateFormat(timeValue, 'hh:mm')// 显示时分
    } else if (timeDiffer > 3600000 && this.isYestday(timeValue) === true) { // 昨天
      returnTime = '昨天' + this.dateFormat(timeValue, 'hh:mm')// 显示昨天+时分
    } else if (timeDiffer > 86400000 && this.isYestday(timeValue) === false && this.isYear(timeValue) === true) { // 今年
      returnTime = this.dateFormat(timeValue, 'MM-dd hh:mm')// 显示月日时分
    } else if (timeDiffer > 86400000 && this.isYestday(timeValue) === false && this.isYear(timeValue) === false) { // 不属于今年
      returnTime = this.dateFormat(timeValue, 'yyyy-MM-dd')// 显示年月日
    }
    return returnTime
  },
  // 获取当月的日期矩阵（默认6行），不够的用上月或者下月日期来补
  getMonthMatrix (date) {
    const d = new Date(date)
    d.setDate(1)
    const currentMonth = d.getMonth()
    // 获取矩阵开始日期
    d.setDate(1 - d.getDay())
    const matrix = []
    for (let i = 0; i < 42; i++) {
      if (i > 0) {
        d.setDate(d.getDate() + 1)
      }
      const month = d.getMonth()
      const dayObj = {}
      dayObj.date = d.getDate()
      dayObj.index = d.getDay()
      dayObj.isCurrentMonth = (month === currentMonth)
      matrix.push(dayObj)
    }
    return matrix
  }
}
