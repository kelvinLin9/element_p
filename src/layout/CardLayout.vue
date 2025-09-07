<template>
  <div class="card-layout">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <div class="header-actions">
            <el-button-group>
              <el-button 
                :type="$route.path === '/' ? 'primary' : 'default'"
                @click="$router.push('/')"
              >
                <el-icon><House /></el-icon>
                首頁
              </el-button>
              <el-button 
                :type="$route.path === '/about' ? 'primary' : 'default'"
                @click="$router.push('/about')"
              >
                <el-icon><InfoFilled /></el-icon>
                關於
              </el-button>
            </el-button-group>
          </div>
        </div>
      </el-header>

      <el-main class="main-content">
        <el-row justify="center">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="10">
            <el-card class="content-card" shadow="hover">
              <router-view />
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { House, InfoFilled } from '@element-plus/icons-vue'

const route = useRoute()

// 根據路由動態設定頁面標題
const pageTitle = computed(() => {
  const titleMap: Record<string, string> = {
    '/': '歡迎使用 Element Plus',
    '/about': '關於我們',
    '/users': '用戶管理',
    '/settings': '系統設定'
  }
  return titleMap[route.path] || 'Element Plus 專案'
})
</script>

<style scoped>
.card-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.main-content {
  padding: 40px 20px;
}

.content-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .main-content {
    padding: 20px 10px;
  }
}
</style>
