<template>
  <div class="fullscreen-layout">
    <!-- 全屏內容，無導航欄 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 全屏佈局，不包含任何導航元素
</script>

<style scoped>
.fullscreen-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
