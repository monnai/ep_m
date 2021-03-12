import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      component: () => import('page/index/Index')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('page/login/Login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('page/index/Index')
    },
    {
      path: '/zxProject',
      name: 'zxProject',
      component: () => import('page/zxProject/ZxProject')
    },
    {
      path: '/zxDetail',
      name: 'zxDetail',
      component: () => import('page/zxProject/ZxProjectDetail')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('page/mine/Mine')
    }
  ]
})

// router跳转之前做登录拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // if (sessionStorage.username) {
    //   next()
    // } else {
    //   next({ path: '/login' })
    // }
    next()
  }
})

export default router
