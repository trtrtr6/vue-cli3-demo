import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueLodash from 'vue-lodash'
import 'lib-flexible'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.config.productionTip = false

Vue.use(VueLodash)
Vue.use(MuseUI)

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_TITLE)
console.log(process.env.VUE_APP_SECRET)
console.log(process.env.FOO)
console.log(process.env.VUE_APP_ALL)
console.log(process.env.VUE_APP_PRODUCT)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
