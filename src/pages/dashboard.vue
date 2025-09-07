<template>
  <div class="dashboard">
    <!-- 歡迎區域 -->
    <el-row :gutter="20" class="welcome-section">
      <el-col :span="24">
        <el-card class="welcome-card">
          <div class="welcome-content">
            <div class="welcome-text">
              <h1>歡迎使用 Element Plus 管理系統</h1>
              <p>這是一個功能完整的後台管理系統，包含用戶管理、系統設定等功能。</p>
            </div>
            <div class="welcome-actions">
              <el-button type="primary" size="large" @click="goToUsers">
                <el-icon><User /></el-icon>
                用戶管理
              </el-button>
              <el-button type="success" size="large" @click="goToSettings">
                <el-icon><Setting /></el-icon>
                系統設定
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 統計卡片 -->
    <el-row :gutter="20" class="stats-section">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon users">
              <el-icon size="32"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalUsers }}</div>
              <div class="stat-label">總用戶數</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon active">
              <el-icon size="32"><UserFilled /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.activeUsers }}</div>
              <div class="stat-label">活躍用戶</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon orders">
              <el-icon size="32"><ShoppingCart /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalOrders }}</div>
              <div class="stat-label">總訂單數</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon revenue">
              <el-icon size="32"><Money /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">¥{{ stats.revenue }}</div>
              <div class="stat-label">總收入</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 圖表和表格區域 -->
    <el-row :gutter="20" class="charts-section">
      <!-- 用戶增長圖表 -->
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>用戶增長趨勢</span>
              <el-button-group>
                <el-button :type="chartPeriod === '7d' ? 'primary' : 'default'" @click="chartPeriod = '7d'">7天</el-button>
                <el-button :type="chartPeriod === '30d' ? 'primary' : 'default'" @click="chartPeriod = '30d'">30天</el-button>
                <el-button :type="chartPeriod === '90d' ? 'primary' : 'default'" @click="chartPeriod = '90d'">90天</el-button>
              </el-button-group>
            </div>
          </template>
          <div class="chart-placeholder">
            <el-icon size="64" color="#409eff"><TrendCharts /></el-icon>
            <p>用戶增長圖表</p>
            <small>選擇時間範圍查看詳細數據</small>
          </div>
        </el-card>
      </el-col>

      <!-- 最近活動 -->
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>最近活動</span>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="activity in recentActivities"
              :key="activity.id"
              :timestamp="activity.time"
              :type="activity.type"
            >
              <el-card>
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.description }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快速操作 -->
    <el-row :gutter="20" class="quick-actions-section">
      <el-col :span="24">
        <el-card>
          <template #header>
            <span>快速操作</span>
          </template>
          <div class="quick-actions">
            <el-button type="primary" @click="goToUsers">
              <el-icon><User /></el-icon>
              新增用戶
            </el-button>
            <el-button type="success" @click="goToSettings">
              <el-icon><Setting /></el-icon>
              系統設定
            </el-button>
            <el-button type="warning" @click="exportData">
              <el-icon><Download /></el-icon>
              匯出數據
            </el-button>
            <el-button type="info" @click="viewReports">
              <el-icon><Document /></el-icon>
              查看報表
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  User, 
  UserFilled, 
  ShoppingCart, 
  Money, 
  Setting, 
  TrendCharts,
  Download,
  Document
} from '@element-plus/icons-vue'

const router = useRouter()

// 統計數據
const stats = reactive({
  totalUsers: 1234,
  activeUsers: 856,
  totalOrders: 5678,
  revenue: 123456
})

// 圖表時間範圍
const chartPeriod = ref('7d')

// 最近活動數據
const recentActivities = ref([
  {
    id: 1,
    title: '新用戶註冊',
    description: '用戶 張三 註冊了帳號',
    time: '2024-01-20 10:30:00',
    type: 'primary'
  },
  {
    id: 2,
    title: '系統更新',
    description: '系統已更新到最新版本 v2.1.0',
    time: '2024-01-20 09:15:00',
    type: 'success'
  },
  {
    id: 3,
    title: '數據備份',
    description: '每日數據備份已完成',
    time: '2024-01-20 08:00:00',
    type: 'info'
  },
  {
    id: 4,
    title: '安全警告',
    description: '檢測到異常登入嘗試',
    time: '2024-01-19 23:45:00',
    type: 'warning'
  }
])

// 方法
const goToUsers = () => {
  router.push('/users')
}

const goToSettings = () => {
  router.push('/settings')
}

const exportData = () => {
  ElMessage.success('數據匯出功能開發中...')
}

const viewReports = () => {
  ElMessage.info('報表功能開發中...')
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.welcome-section {
  margin-bottom: 20px;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.welcome-text h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 600;
}

.welcome-text p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.welcome-actions {
  display: flex;
  gap: 15px;
}

.stats-section {
  margin-bottom: 20px;
}

.stat-card {
  height: 120px;
}

.stat-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.stat-icon.users {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-icon.active {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.stat-icon.orders {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.charts-section {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.chart-placeholder p {
  margin: 10px 0 5px 0;
  font-size: 16px;
}

.chart-placeholder small {
  font-size: 12px;
}

.quick-actions-section {
  margin-bottom: 20px;
}

.quick-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .welcome-actions {
    justify-content: center;
  }
  
  .quick-actions {
    justify-content: center;
  }
  
  .stat-content {
    flex-direction: column;
    text-align: center;
  }
  
  .stat-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
