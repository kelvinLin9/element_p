<template>
  <div class="home-page">
    <el-container>
      <el-header>
        <h1>歡迎來到首頁</h1>
      </el-header>
      <el-main>
        <el-card class="welcome-card">
          <template #header>
            <div class="card-header">
              <span>首頁內容</span>
            </div>
          </template>
          <p>這是一個使用 Vue 3 + Element Plus + Vue Router 建立的簡易專案。</p>
          <el-button type="primary" @click="goToAbout">前往關於頁面</el-button>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.welcome-card {
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
