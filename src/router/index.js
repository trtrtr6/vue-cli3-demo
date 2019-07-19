import Vue from 'vue'
import Router from 'vue-router'
import { LOGIN } from '../store/mutation-types.js'
import { getSessionStore } from '../utils/commonUtils'
import store from '../store/'

Vue.use(Router)

const Home = () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
const MonacoEditor = () => import(/* webpackChunkName: "monacoEditor" */ '@/views/monacoEditor.vue')
const RippleBtn = () => import(/* webpackChunkName: "rippleBtn" */ '@/views/rippleBtn.vue')
const Other = () => import(/* webpackChunkName: "other" */ '@/views/other.vue')
const Twdb = () => import(/* webpackChunkName: "twdb" */ '@/views/twdb.vue')
const Transition = () => import(/* webpackChunkName: "transition" */ '@/views/transition.vue')
const Flip = () => import(/* webpackChunkName: "flip" */ '@/views/flip.vue')
const Flip2 = () => import(/* webpackChunkName: "flip2" */ '@/views/flip2.vue')
const Flip3 = () => import(/* webpackChunkName: "flip3" */ '@/views/flip3.vue')
const TimeFormat = () => import(/* webpackChunkName: "timeFormat" */ '@/views/timeFormat.vue')
const Dialog = () => import(/* webpackChunkName: "dialog" */ '@/views/dialog.vue')
const DatePick = () => import(/* webpackChunkName: "datePick" */ '@/views/datePick.vue')
const Echarts = () => import(/* webpackChunkName: "echarts" */ '@/views/echarts.vue')
const TabDemo = () => import(/* webpackChunkName: "tabDemo" */ '@/views/tabDemo.vue')
const TabMountDemo = () => import(/* webpackChunkName: "tabMounting" */ '@/views/tabMounting.vue')
const Validate = () => import(/* webpackChunkName: "validate" */ '@/views/validate.vue')
const ViewPart = () => import(/* webpackChunkName: "viewPart" */ '@/views/viewPart.vue')
const WaterCompView = () => import(/* webpackChunkName: "waterCompView" */ '@/views/waterCompView.vue')
const PkCompView = () => import(/* webpackChunkName: "pkCompView" */ '@/views/pkCompView.vue')
const SvgIcon = () => import(/* webpackChunkName: "svgIcon" */ '@/views/svgIcon.vue')
const Drop = () => import(/* webpackChunkName: "drop" */ '@/views/drop.vue')
const Android1px = () => import(/* webpackChunkName: "android1px" */ '@/views/android1px.vue')
const TabBar = () => import(/* webpackChunkName: "tabBar" */ '@/views/tabBar.vue')

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
    path: '/transition',
    name: '动画过渡',
    component: Transition
  },
  {
    path: '/flip',
    name: 'flip动画实例（使用第三方库flipping未成功，暂时放弃）',
    component: Flip
  },
  {
    path: '/flip2',
    name: 'flip动画实例（原生的 Web Animations API 实现）',
    component: Flip2
  },
  {
    path: '/flip3',
    name: 'flip动画实例（原生的 requestAnimationFrame 实现）',
    component: Flip3
  },
  {
    path: '/timeFormat',
    name: '时间格式化相关',
    component: TimeFormat
  },
  {
    path: '/dialog',
    name: '自定义弹窗',
    component: Dialog
  },
  {
    path: '/datePick',
    name: '日期选择器',
    component: DatePick
  },
  {
    path: '/echarts',
    name: '图表相关',
    component: Echarts
  },
  {
    path: '/tabDemo',
    name: 'tab切换',
    component: TabDemo
  },
  {
    path: '/tabMountDemo',
    name: 'tab切换吸顶demo',
    component: TabMountDemo
  },
  {
    path: '/validate',
    name: 'Proxy类型数据劫持校验',
    component: Validate
  },
  {
    path: '/viewPart',
    name: '页面显示部分内容',
    component: ViewPart
  },
  {
    path: '/waterCompView',
    name: '水球动画组件',
    component: WaterCompView
  },
  {
    path: '/pkCompView',
    name: 'pk投票组件',
    component: PkCompView
  },
  {
    path: '/svgIcon',
    name: 'svg图标使用',
    component: SvgIcon
  },
  {
    path: '/drop',
    name: '下拉选项卡',
    component: Drop
  },
  {
    path: '/android1px',
    name: 'flexible下安卓1px处理方案',
    component: Android1px
  },
  {
    path: '/tabBar',
    name: '测试一下',
    component: TabBar
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
