import Vue from 'vue'
import Router from 'vue-router'
import { LOGIN } from '../store/mutation-types.js'
import { getSessionStore } from '../utils/commonUtils'
import store from '../store/'

Vue.use(Router)

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
]

// 页面刷新时，重新赋值token
if (getSessionStore('adminInfo')) {
  store.commit(LOGIN, JSON.parse(getSessionStore('adminInfo')))
}

const router = new Router({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/') {
//     if (store.state.adminInfo) {
//       next()
//     } else {
//       next({path: '/'})
//     }
//   } else { // 已登录访问登录页面直接跳转到主页
//     if (store.state.adminInfo) {
//       next({path: '/manage'})
//     } else {
//       next()
//     }
//   }
// })
export default router
