import DatePicker from './datePicker.vue'
import addDatePicker from './api'

DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker)
  addDatePicker(Vue, DatePicker)
}

export default DatePicker
