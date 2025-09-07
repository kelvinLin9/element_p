<template>
  <div class="welcome-page">
    <div class="hero-section">
      <h1>歡迎使用 Element Plus 管理系統</h1>
      <p class="hero-description">
        這是一個功能完整的後台管理系統，採用 Vue 3 + Element Plus + TypeScript 技術棧開發
      </p>
      <div class="hero-actions">
        <el-button type="primary" size="large" @click="goToDashboard">
          <el-icon><Odometer /></el-icon>
          進入儀錶板
        </el-button>
        <el-button size="large" @click="goToAbout">
          <el-icon><InfoFilled /></el-icon>
          了解更多
        </el-button>
      </div>
    </div>

    <div class="features-section">
      <h2>系統特色</h2>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon size="48" color="#409eff"><Grid /></el-icon>
            </div>
            <h3>動態佈局</h3>
            <p>支持多種佈局模式，可根據不同頁面需求靈活切換</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon size="48" color="#67c23a"><User /></el-icon>
            </div>
            <h3>用戶管理</h3>
            <p>完整的用戶管理功能，包含增刪改查、狀態管理等</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon size="48" color="#e6a23c"><Setting /></el-icon>
            </div>
            <h3>系統設定</h3>
            <p>豐富的系統配置選項，支持個性化定制</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="tech-stack-section">
      <h2>技術棧</h2>
      <div class="tech-items">
        <div class="tech-item">
          <el-tag type="primary" size="large">Vue 3</el-tag>
        </div>
        <div class="tech-item">
          <el-tag type="success" size="large">Element Plus</el-tag>
        </div>
        <div class="tech-item">
          <el-tag type="warning" size="large">TypeScript</el-tag>
        </div>
        <div class="tech-item">
          <el-tag type="info" size="large">Vue Router</el-tag>
        </div>
        <div class="tech-item">
          <el-tag type="danger" size="large">Vite</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Odometer, InfoFilled, Grid, User, Setting } from '@element-plus/icons-vue'

const router = useRouter()

const goToDashboard = () => {
  router.push('/')
}

const goToAbout = () => {
  router.push('/about')
}
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.hero-section {
  max-width: 800px;
  margin-bottom: 80px;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  color: #606266;
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.features-section {
  max-width: 1000px;
  margin-bottom: 80px;
}

.features-section h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 50px;
}

.feature-card {
  padding: 30px 20px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.feature-card p {
  color: #606266;
  line-height: 1.6;
}

.tech-stack-section {
  max-width: 800px;
}

.tech-stack-section h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
}

.tech-items {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.tech-item {
  margin: 10px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-section h2,
  .tech-stack-section h2 {
    font-size: 2rem;
  }
  
  .tech-items {
    gap: 10px;
  }
}
</style>
