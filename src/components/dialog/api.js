import createAPI from '@/utils/createApi'

export default function addDialog (Vue, Dialog) {
  createAPI(Vue, Dialog, ['confirm', 'cancel'], true)
}
