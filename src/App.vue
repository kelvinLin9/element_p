<template>
  <div id="app">
    <!-- 導航欄 -->
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
    </el-menu>

    <!-- 路由內容 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { House, InfoFilled } from '@element-plus/icons-vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav-menu {
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 全域樣式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
}
</style>