<template>
  <x-picker :visible.sync="pickerVisible" @change="_pickerChange" @value-change="valueChange"
    @select="valueSelect" :pickerData="pickerData" ref="datePicker"
    :selectedIndex="pickerSelectedIndex" type="date">
  </x-picker>
</template>

<script>
import xPicker from '@/components/picker/picker.vue'
const TYPE_LIST = ['year', 'month', 'date', 'hour', 'minute', 'second']
const NATURE_BOUNDARY_MAP = {
  month: {
    natureMin: 1,
    natureMax: 12
  },
  date: {
    natureMin: 1,
    natureMax: 31
  },
  hour: {
    natureMin: 0,
    natureMax: 23
  },
  minute: {
    natureMin: 0,
    natureMax: 59
  },
  second: {
    natureMin: 0,
    natureMax: 59
  }
}

export default {
  name: 'x-date-picker',
  props: {
    start: {
      type: [String, Date, Array],
      default: () => new Date(0)
    },
    end: {
      type: [String, Date, Array],
      default: () => new Date()
    },
    value: {
      type: [String, Date, Array]
    },
    startColumn: {
      type: String,
      default: 'year'
    },
    columnCount: {
      type: Number,
      default: 3
    },
    format: {
      type: Object,
      default: () => {
        return {
          year: 'yyyy',
          month: 'MM',
          date: 'dd',
          hour: 'hh',
          minute: 'mm',
          second: 'sss'
        }
      }
    },
    valueFormat: { // yyyy-MM-d
      type: String,
      default: ''
    },
    cancelTxt: {
      type: String,
      default: '取消'
    },
    confirmTxt: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      pickerVisible: false,
      pickerData: [],
      pickerSelectedIndex: [0, 0, 0]
    }
  },
  computed: {
    _startIndex () {
      const startIndex = TYPE_LIST.indexOf(this.startColumn)
      return startIndex < 0 ? 0 : startIndex
    },
    _typeList () {
      const { _startIndex, columnCount } = this
      return TYPE_LIST.slice(_startIndex, _startIndex + columnCount)
    },
    startArr () {
      const { _startIndex, columnCount } = this
      return this.dateToArr(this.start).slice(_startIndex, _startIndex + columnCount)
    },
    endArr () {
      const { _startIndex, columnCount } = this
      return this.dateToArr(this.end).slice(_startIndex, _startIndex + columnCount)
    },
    valueArr () {
      const { _startIndex, columnCount } = this
      let value = this.value || this.startArr
      return this.dateToArr(value).slice(_startIndex, _startIndex + columnCount)
    }
  },
  components: {
    xPicker
  },
  created () {
    this.dateList = []
    this._getDateList(0, this.dateList)
    // 获取当前选择所在的列下标
    this.pickerSelectedIndex = this._getPickerSelectedIndexByValue()
    // 获取联动数据源
    this.cascadeData = this.dateList.slice()
  },
  methods: {
    showPicker () { // 显示日期选择器
      this.pickerVisible = true
      this._updatePickerData()
      this.$refs.datePicker.pickerInit()
    },
    _getPickerSelectedIndexByValue () {
      const selectedIndex = []
      const { columnCount, _startIndex, valueArr, dateList } = this
      let data = dateList
      let index = 0
      for (let i = 0; i < columnCount && i < 6 - _startIndex; i++) {
        index = this.findIndex(data, (item) => {
          return valueArr[i] && item.value === valueArr[i]
        })
        selectedIndex[i] = index !== -1 ? index : 0
        data = data[selectedIndex[i]] && data[selectedIndex[i]].children
      }

      return selectedIndex
    },
    dateToArr (date) {
      if (date instanceof Array) return date
      if (!(date instanceof Date)) date = new Date(date.replace(/-/g, '/'))
      return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
    },
    findIndex (ary, fn) {
      let index = -1
      ary.some(function (item, i, ary) {
        const ret = fn.call(this, item, i, ary)
        if (ret) {
          index = i
          return ret
        }
      })
      return index
    },
    dateFormat (date, fmt = 'yyyy-MM-dd') {
      date = typeof date !== 'object' ? new Date(date.replace(/-/g, '/')) : date
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
    _updatePickerData (fromColumn = 0) { // 摘取picker列数组列表
      let data = this.cascadeData
      let i = 0
      while (data) {
        if (i >= fromColumn) {
          let columnData = []
          data.forEach((item) => {
            columnData.push({
              value: item.value,
              text: item.text
            })
          })
          this.pickerData[i] = columnData
          this.pickerSelectedIndex[i] = fromColumn === 0
            ? (this.pickerSelectedIndex[i] < data.length ? this.pickerSelectedIndex[i] || 0 : 0)
            : this.$refs.datePicker.refillColumn(i, columnData)
        }
        data = data.length ? data[this.pickerSelectedIndex[i]].children : null
        i++
      }
      if (i < this.pickerData.length) {
        this.pickerData.splice(i, this.pickerData.length - i)
      }
      this.pickerData = this.pickerData.slice()
    },
    _pickerChange (i, newIndex) { // picker列change处理
      if (newIndex !== this.pickerSelectedIndex[i]) {
        this.pickerSelectedIndex.splice(i, 1, newIndex)
        this._updatePickerData(i + 1)
      }
    },
    valueChange (values, indexes, texts) {
      this.$emit('change', this._getPickerValue(values))
    },
    valueSelect (values, indexes, texts) {
      this.$emit('select', this._getPickerValue(values))
    },
    _getPickerValue (values) {
      const args = []
      const defaultDateArray = this.dateToArr(new Date(0))
      const { _startIndex, columnCount } = this
      for (let i = 0; i < 6; i++) {
        if (i < _startIndex) {
          args[i] = defaultDateArray[i]
        } else if (i >= _startIndex + columnCount) {
          args[i] = NATURE_BOUNDARY_MAP[TYPE_LIST[i]].natureMin
        } else {
          args[i] = values[i - _startIndex]
        }
      }
      args[1]--
      let value = new Date(...args)
      if (this.valueFormat) {
        value = this.dateFormat(value, this.valueFormat)
      }
      return value
    },
    _getDateList (index = 0, item = []) { // 获取所有可选日期数组矩阵
      const { startArr, endArr } = this
      const type = this._typeList[index]
      if (index === 0) {
        const min = type === 'year' ? startArr[index] : Math.max(startArr[index], NATURE_BOUNDARY_MAP[type].natureMin)
        const max = type === 'year' ? endArr[index] : Math.min(endArr[index], NATURE_BOUNDARY_MAP[type].natureMax)
        item.push(...(this._getRange(type, min, max, true, true)))
      } else {
        const natureMin = NATURE_BOUNDARY_MAP[type].natureMin
        const natureMax = type === 'date' ? this.computeNatureMaxDay(item.value, item.year || (new Date()).getFullYear()) : NATURE_BOUNDARY_MAP[type].natureMax
        const min = item.isMin ? Math.max(startArr[index], natureMin) : natureMin
        const max = item.isMax ? Math.min(endArr[index], natureMax) : natureMax
        const year = type === 'month' ? item.value : 0
        const range = this._getRange(type, min, max, item.isMin, item.isMax, year)
        item.children = range
      }
      if (index < this.columnCount - 1) {
        (item.children || item).forEach(subItem => {
          this._getDateList(index + 1, subItem)
        })
      }
    },
    _getRange (type, min, max, fatherIsMin, fatherIsMax, year) { // 获取各个类型日期区间内的数据
      const arr = []
      for (let i = min; i <= max; i++) {
        const obj = {
          type,
          text: '',
          value: i
        }
        if (fatherIsMin && i === min) obj.isMin = true
        if (fatherIsMax && i === max) obj.isMax = true
        if (year) obj.year = year
        arr.push(obj)
      }
      return arr
    },
    computeNatureMaxDay (month, year) { // 闰年处理
      let natureMaxDay = 30
      if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
        natureMaxDay = 31
      } else {
        if (month === 2) {
          natureMaxDay = !year || (!(year % 400) || (!(year % 4) && year % 100)) ? 29 : 28
        }
      }
      return natureMaxDay
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
.mask-top,
.mask-bottom {
  z-index: 10;
  width: 100%;
  height: 160px;
  pointer-events: none;
  transform: translateZ(0);
}

.mask-top {
  position: absolute;
  top: 0;
  border-bottom: 1px solid #dcdcdc;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
}

.mask-bottom {
  position: absolute;
  bottom: 1px;
  border-top: 1px solid #dcdcdc;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
}

.wheel-wrapper {
  display: flex;
  padding: 0 16px;
  background: #fff;
  .wheel {
    flex: 1;
    height: 400px;
    overflow: hidden;
    font-size: 42px;
  }
  .wheel-scroll {
    padding: 0;
    margin-top: 160px;
    line-height: 36px;
    list-style: none;
  }
  .wheel-item {
    list-style: none;
    text-align: center;
    height: 80px;
    line-height: 80px;
    overflow: hidden;
    white-space: nowrap;
    color: #333;
    &.wheel-disabled-item {
      opacity: 0.2;
    }
  }
}
</style>
