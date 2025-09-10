<template>
  <div id="app">
    <!-- 動態 Layout 系統 -->
    <DynamicLayout />
  </div>
</template>

<script setup lang="ts">
import DynamicLayout from '@/layout/DynamicLayout.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh; /* 確保應用高度為視窗高度 */
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

html, body {
  height: 100%;
}

body {
  background-color: #f5f5f5;
}
</style>