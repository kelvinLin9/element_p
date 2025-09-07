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
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <template #title>首頁</template>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><InfoFilled /></el-icon>
            <template #title>關於我們</template>
          </el-menu-item>
          <el-sub-menu index="management">
            <template #title>
              <el-icon><Management /></el-icon>
              <span>管理功能</span>
            </template>
            <el-menu-item index="/users">
              <el-icon><User /></el-icon>
              <template #title>用戶管理</template>
            </el-menu-item>
            <el-menu-item index="/settings">
              <el-icon><Setting /></el-icon>
              <template #title>系統設定</template>
            </el-menu-item>
            <el-menu-item index="/layout-demo">
              <el-icon><Grid /></el-icon>
              <template #title>Layout 演示</template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
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
  House, 
  InfoFilled, 
  User, 
  Setting, 
  Management,
  ElementPlus,
  Expand,
  Fold,
  Grid
} from '@element-plus/icons-vue'

const route = useRoute()
const isCollapse = ref(false)

// 切換側邊欄收縮狀態
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 麵包屑導航
const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean)
  const breadcrumbItems = [{ name: '首頁', path: '/' }]
  
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
    'about': '關於我們',
    'users': '用戶管理',
    'settings': '系統設定',
    'layout-demo': 'Layout 演示'
  }
  return routeNames[segment] || segment
}
</script>

<style scoped>
.sidebar-layout {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  transition: width 0.3s;
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
