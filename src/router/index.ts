import { createRouter, createWebHistory } from 'vue-router'

// 路由配置 - 使用動態引入（懶加載）
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '首頁'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about.vue'),
    meta: {
      title: '關於我們'
    }
  }
]

// 建立 router 實例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守衛 - 設定頁面標題
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Element Plus 專案`
  }
  next()
})

export default router
