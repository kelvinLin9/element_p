<template>
  <el-container style="height: 100vh">
    <!-- 側邊欄 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <!-- Logo區域 -->
      <div style="height: 60px; display: flex; align-items: center; justify-content: center; background: #304156; color: white; border-bottom: 1px solid #434a50;">
        <el-icon v-if="!isCollapse" size="24"><ElementPlus /></el-icon>
        <span v-if="!isCollapse" style="margin-left: 8px;">Element Plus</span>
      </div>
      
      <!-- 側邊欄菜單 -->
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#ffffff"
        style="border: none; height: calc(100vh - 60px);"
      >
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
    </el-aside>

    <!-- 主要內容區域 -->
    <el-container>
      <!-- Header -->
      <el-header style="background: white; border-bottom: 1px solid #e6e6e6; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
        <div style="display: flex; align-items: center;">
          <el-button text @click="toggleCollapse" style="margin-right: 20px;">
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
        <div>
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

      <!-- Main內容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Odometer, 
  User, 
  VideoPlay,
  ShoppingCart,
  ElementPlus,
  Expand,
  Fold
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
</script>
