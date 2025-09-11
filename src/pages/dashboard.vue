<template>
  <div class="dashboard">
    <!-- 歡迎區域 -->
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="12">
        <el-card class="welcome-card">
          <div class="welcome-content">
            <h1>歡迎使用管理系統</h1>
            <p>這是一個使用 Vue 3 + Element Plus 打造的後台管理系統</p>
            <div class="actions">
              <el-button type="primary" @click="handleAction('用戶管理')">
                開始使用
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 簡單內容区域 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div class="content-area">
            <h3>主要內容區域</h3>
            <p>您可以在這裡添加任何您需要的內容。</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

// 簡單的事件處理
const handleAction = (action: string) => {
  ElMessage.success(`您點擊了：${action}`)
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.welcome-card {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.welcome-content {
  padding: 40px 20px;
}

.welcome-content h1 {
  margin: 0 0 15px 0;
  font-size: 28px;
  font-weight: 600;
}

.welcome-content p {
  margin: 0 0 30px 0;
  font-size: 16px;
  opacity: 0.9;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.content-area {
  text-align: center;
  padding: 40px 20px;
}

.content-area h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 20px;
}

.content-area p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .welcome-content {
    padding: 30px 15px;
  }
  
  .welcome-content h1 {
    font-size: 22px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
