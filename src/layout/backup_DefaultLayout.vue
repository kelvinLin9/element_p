<template>
  <div class="default-layout">
    <!-- 頂部導航欄 -->
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      router
      class="nav-menu"
    >
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <span>首頁</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><InfoFilled /></el-icon>
        <span>關於我們</span>
      </el-menu-item>
      <el-menu-item index="/users">
        <el-icon><User /></el-icon>
        <span>用戶管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <el-icon><Setting /></el-icon>
        <span>設定</span>
      </el-menu-item>
      <el-menu-item index="/layout-demo">
        <el-icon><Grid /></el-icon>
        <span>Layout 演示</span>
      </el-menu-item>
    </el-menu>

    <!-- 主要內容區域 -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { House, InfoFilled, User, Setting, Grid } from '@element-plus/icons-vue'
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.nav-menu {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main-content {
  padding: 20px;
}
</style>
