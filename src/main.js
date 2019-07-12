import Vue from 'vue'
import './style/reset.css' // 不需要了，下面引用的框架里面自带基础reset样式
import 'lib-flexible'
import '@/assets/js/android-1px'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'flexboxgrid/dist/flexboxgrid.min.css'
import './style.less'
import router from './router'
import App from './App.vue'
import store from './store/'
import VueLodash from 'vue-lodash'
import TestApi from '@/api/test'
import VueWorker from 'vue-worker'
import './assets/icons/index'

Vue.config.productionTip = false

Vue.use(VueLodash)
Vue.use(MuseUI)
Vue.use(ElementUI)

Vue.use(TestApi)
Vue.use(VueWorker)

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
