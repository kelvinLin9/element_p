<template>
  <div class="sidebar-layout">
    <el-container>
      <!-- 側邊欄 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <div class="logo">
          <el-icon v-if="!isCollapse" size="24"><ElementPlus /></el-icon>
          <span v-if="!isCollapse" class="logo-text">Element Plus</span>
        </div>
        
        <el-menu
          :default-active="$route.path"
          :collapse="isCollapse"
          router
          class="sidebar-menu"
        >
          <!-- 主要功能區域 -->
          <el-menu-item index="/">
            <el-icon><Odometer /></el-icon>
            <template #title>儀錶板</template>
          </el-menu-item>
          <el-menu-item index="/users">
            <el-icon><User /></el-icon>
            <template #title>用戶管理</template>
          </el-menu-item>
          <el-menu-item index="/concerts">
            <el-icon><VideoPlay /></el-icon>
            <template #title>演唱會管理</template>
          </el-menu-item>
          <el-menu-item index="/orders">
            <el-icon><ShoppingCart /></el-icon>
            <template #title>訂單管理</template>
          </el-menu-item>
        </el-menu>

        <!-- 底部功能區域 - 在 sidebar 內部 -->
        <div class="sidebar-bottom">
          <!-- 多國語系 -->
          <div class="bottom-item">
            <el-dropdown @command="handleLanguageChange" v-if="!isCollapse">
              <el-button type="text" class="bottom-button">
                <el-icon><Setting /></el-icon>
                <span>多國語系</span>
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="zh-TW">繁體中文</el-dropdown-item>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                  <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-tooltip content="多國語系" placement="right" v-else>
              <el-button type="text" class="bottom-button" @click="showLanguageMenu = true">
                <el-icon><Setting /></el-icon>
              </el-button>
            </el-tooltip>
          </div>

          <!-- 暗黑模式 -->
          <div class="bottom-item">
            <el-tooltip :content="isDarkMode ? '切換到淺色模式' : '切換到暗黑模式'" placement="right">
              <el-button type="text" class="bottom-button" @click="toggleDarkMode">
                <el-icon><Moon v-if="!isDarkMode" /><Sunny v-else /></el-icon>
                <span v-if="!isCollapse">{{ isDarkMode ? '淺色模式' : '暗黑模式' }}</span>
              </el-button>
            </el-tooltip>
          </div>

          <!-- 登入登出 -->
          <div class="bottom-item">
            <el-tooltip :content="isLoggedIn ? '登出' : '登入'" placement="right">
              <el-button type="text" class="bottom-button" @click="handleLoginLogout">
                <el-icon><SwitchButton /></el-icon>
                <span v-if="!isCollapse">{{ isLoggedIn ? '登出' : '登入' }}</span>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </el-aside>

      <!-- 主要內容區域 -->
      <el-container>
        <el-header class="header">
          <div class="header-left">
            <el-button 
              type="text" 
              @click="toggleCollapse"
              class="collapse-btn"
            >
              <el-icon size="20">
                <Expand v-if="isCollapse" />
                <Fold v-else />
              </el-icon>
            </el-button>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item 
                v-for="item in breadcrumbs" 
                :key="item.path"
                :to="item.path"
              >
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <el-dropdown>
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>個人資料</el-dropdown-item>
                  <el-dropdown-item>設定</el-dropdown-item>
                  <el-dropdown-item divided>登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Odometer, 
  User, 
  VideoPlay,
  ShoppingCart,
  Setting, 
  Moon,
  Sunny,
  SwitchButton,
  ArrowDown,
  ElementPlus,
  Expand,
  Fold
} from '@element-plus/icons-vue'

const route = useRoute()
const isCollapse = ref(false)

// 底部功能狀態
const isDarkMode = ref(false)
const isLoggedIn = ref(true)
const showLanguageMenu = ref(false)
const currentLanguage = ref('zh-TW')

// 切換側邊欄收縮狀態
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 麵包屑導航
const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean)
  const breadcrumbItems = [{ name: '儀錶板', path: '/' }]
  
  let currentPath = ''
  pathArray.forEach((segment) => {
    currentPath += `/${segment}`
    const name = getRouteName(segment)
    breadcrumbItems.push({ name, path: currentPath })
  })
  
  return breadcrumbItems
})

// 根據路徑獲取路由名稱
const getRouteName = (segment: string) => {
  const routeNames: Record<string, string> = {
    'users': '用戶管理',
    'concerts': '演唱會管理',
    'orders': '訂單管理'
  }
  return routeNames[segment] || segment
}

// 底部功能方法
const handleLanguageChange = (language: string) => {
  currentLanguage.value = language
  // 這裡可以實現語言切換邏輯
  console.log('切換語言到:', language)
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  // 這裡可以實現暗黑模式切換邏輯
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  console.log('切換暗黑模式:', isDarkMode.value)
}

const handleLoginLogout = () => {
  if (isLoggedIn.value) {
    // 登出邏輯
    isLoggedIn.value = false
    console.log('用戶已登出')
  } else {
    // 登入邏輯
    isLoggedIn.value = true
    console.log('用戶已登入')
  }
}
</script>

<style scoped>
.sidebar-layout {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  transition: width 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #434a50;
}

.logo-text {
  margin-left: 8px;
}

.sidebar-menu {
  border: none;
  background-color: #304156;
  flex: 1;
}

.sidebar-menu .el-menu-item,
.sidebar-menu .el-sub-menu__title {
  color: #bfcbd9;
}

.sidebar-menu .el-menu-item:hover,
.sidebar-menu .el-sub-menu__title:hover {
  background-color: #263445;
  color: #409eff;
}

.sidebar-menu .el-menu-item.is-active {
  background-color: #409eff;
  color: white;
}

.sidebar-bottom {
  border-top: 1px solid #434a50;
  padding: 10px 0;
  background-color: #304156;
  margin-top: auto;
}

.bottom-item {
  margin-bottom: 5px;
}

.bottom-item:last-child {
  margin-bottom: 0;
}

.bottom-button {
  width: 100%;
  color: #bfcbd9;
  text-align: left;
  padding: 8px 20px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bottom-button:hover {
  background-color: #263445;
  color: #409eff;
}

.bottom-button .el-icon {
  font-size: 16px;
}

.bottom-button span {
  font-size: 14px;
}

.header {
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.collapse-btn {
  margin-right: 20px;
}

.main-content {
  background-color: #f5f5f5;
  padding: 20px;
}
</style>
