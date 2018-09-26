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
  dateFormat (date, fmt) { // author: meizz
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
  }
}
