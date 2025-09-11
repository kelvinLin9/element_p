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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>