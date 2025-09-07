<template>
  <div class="about-page">
    <el-container>
      <el-header>
        <h1>關於我們</h1>
      </el-header>
      <el-main>
        <el-card class="about-card">
          <template #header>
            <div class="card-header">
              <span>專案資訊</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="框架">Vue 3</el-descriptions-item>
            <el-descriptions-item label="UI 庫">Element Plus</el-descriptions-item>
            <el-descriptions-item label="路由">Vue Router 4</el-descriptions-item>
            <el-descriptions-item label="建構工具">Vite</el-descriptions-item>
            <el-descriptions-item label="語言">TypeScript</el-descriptions-item>
          </el-descriptions>
          <div style="margin-top: 20px;">
            <el-button type="primary" @click="goToHome">返回首頁</el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.about-page {
  padding: 20px;
}

.about-card {
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #409eff;
  text-align: center;
}
</style>
