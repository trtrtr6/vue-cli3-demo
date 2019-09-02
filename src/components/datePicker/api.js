import createAPI from '@/utils/createApi'

export default function addDialog (Vue, DatePicker) {
  createAPI(Vue, DatePicker, ['select', 'change', 'cancel'], true)
}
