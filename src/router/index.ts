import { createRouter, createWebHistory } from 'vue-router'

// 路由配置 - 使用動態引入（懶加載）
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '首頁',
      layout: 'card' // 使用卡片佈局
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about.vue'),
    meta: {
      title: '關於我們',
      layout: 'default' // 使用默認佈局
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/pages/users/index.vue'),
    meta: {
      title: '用戶管理',
      layout: 'sidebar' // 使用側邊欄佈局
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/settings/index.vue'),
    meta: {
      title: '系統設定',
      layout: 'sidebar' // 使用側邊欄佈局
    }
  },
  {
    path: '/layout-demo',
    name: 'LayoutDemo',
    component: () => import('@/pages/layout-demo.vue'),
    meta: {
      title: 'Layout 演示',
      layout: 'default' // 使用默認佈局
    }
  }
]

// 建立 router 實例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守衛 - 設定頁面標題
router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Element Plus 專案`
  }
  next()
})

export default router
