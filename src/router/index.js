import Vue from 'vue'
import Router from 'vue-router'
import { LOGIN } from '../store/mutation-types.js'
import { getSessionStore } from '../utils/commonUtils'
import store from '../store/'

Vue.use(Router)

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/home.vue')
const MonacoEditor = () => import(/* webpackChunkName: "monacoEditor" */ '@/views/monacoEditor.vue')
const RippleBtn = () => import(/* webpackChunkName: "rippleBtn" */ '@/views/rippleBtn.vue')
const Other = () => import(/* webpackChunkName: "other" */ '@/views/other.vue')
const Twdb = () => import(/* webpackChunkName: "twdb" */ '@/views/twdb.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/monacoEditor',
    name: '摩纳哥编辑器',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MonacoEditor
  },
  {
    path: '/rippleBtn',
    name: '水波纹按钮的多种实现',
    component: RippleBtn
  },
  {
    path: '/twdb',
    name: '数据双向绑定的多种情况及实现',
    component: Twdb
  },
  {
    path: '/other',
    name: '其他乱七八糟的东西',
    component: Other
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
