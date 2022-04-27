import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']

// 前置守卫
// next()       放行
// next(false)  跳转终止
// next(地址)   跳转到某个地址
// next必须执行，否则页面卡住
router.beforeEach((to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 关闭进度条
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
