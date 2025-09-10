import { createRouter, createWebHistory } from 'vue-router'

// 路由配置 - 使用動態引入（懶加載）
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard.vue'),
    meta: {
      title: '儀錶板 - 首頁',
      layout: 'sidebar' // 使用側邊欄佈局
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about.vue'),
    meta: {
      title: '關於我們',
      layout: 'sidebar' // 使用側邊欄佈局
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
    path: '/concerts',
    name: 'Concerts',
    component: () => import('@/pages/concerts/index.vue'),
    meta: {
      title: '演唱會管理',
      layout: 'sidebar' // 使用側邊欄佈局
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/pages/orders/index.vue'),
    meta: {
      title: '訂單管理',
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
  // 可選：保留作為介紹頁面，但改用不常見的路徑
  {
    path: '/intro',
    name: 'Introduction',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '系統介紹',
      layout: 'card' // 使用卡片佈局
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
