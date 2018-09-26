import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLodash from 'vue-lodash'

Vue.config.productionTip = false

Vue.use(VueLodash)

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
