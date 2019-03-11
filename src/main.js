import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueLodash from 'vue-lodash'
import 'lib-flexible'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'flexboxgrid/dist/flexboxgrid.min.css'
import './style.less'
import TestApi from '@/api/test'

Vue.config.productionTip = false

Vue.use(VueLodash)
Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(TestApi)

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
