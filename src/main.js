import Vue from 'vue'
import './assets/css/reset.css' // 不需要了，下面引用的框架里面自带基础reset样式
import 'lib-flexible'
import '@/assets/js/android-1px'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'flexboxgrid/dist/flexboxgrid.min.css'
import router from './router'
import App from './App.vue'
import store from './store/'
import VueLodash from 'vue-lodash'
import TestApi from '@/api/test'
import VueWorker from 'vue-worker'
import './assets/icons/index'

import xToast from '@/components/toast'
import xDialog from '@/components/dialog'
import xDatePicker from '@/components/datePicker'

Vue.config.productionTip = false

Vue.use(VueLodash)
Vue.use(MuseUI)
Vue.use(ElementUI)

Vue.use(TestApi)
Vue.use(VueWorker)

Vue.use(xToast)
Vue.use(xDialog)
Vue.use(xDatePicker)

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_TITLE)
console.log(process.env.VUE_APP_SECRET)
console.log(process.env.FOO)
console.log(process.env.VUE_APP_LOCALALL)
console.log(process.env.VUE_APP_LOCALDEV)
console.log(process.env.VUE_APP_ALL)
console.log(process.env.VUE_APP_PRODUCT)
console.log(process.env.BASE_URL)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
