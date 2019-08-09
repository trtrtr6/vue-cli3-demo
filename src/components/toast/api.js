import createAPI from '@/utils/createApi'

export default function addToast (Vue, Toast) {
  createAPI(Vue, Toast, ['timeout'], true)
}
