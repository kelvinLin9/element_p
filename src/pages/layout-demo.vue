<template>
  <div class="layout-demo">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>動態 Layout 演示</span>
        </div>
      </template>

      <el-alert
        title="動態 Layout 系統"
        type="info"
        description="這個頁面展示了不同的 Layout 選項。您可以通過路由配置來為不同頁面指定不同的佈局。"
        show-icon
        :closable="false"
        style="margin-bottom: 20px"
      />

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="layout-card">
            <template #header>
              <el-icon><Menu /></el-icon>
              <span>默認佈局</span>
            </template>
            <p>頂部水平導航欄佈局，適合簡單的應用。</p>
            <el-button type="primary" @click="goToLayout('default')">
              查看示例
            </el-button>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover" class="layout-card">
            <template #header>
              <el-icon><Grid /></el-icon>
              <span>側邊欄佈局</span>
            </template>
            <p>左側邊欄導航佈局，適合管理後台系統。</p>
            <el-button type="primary" @click="goToLayout('sidebar')">
              查看示例
            </el-button>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover" class="layout-card">
            <template #header>
              <el-icon><CreditCard /></el-icon>
              <span>卡片佈局</span>
            </template>
            <p>居中卡片佈局，適合展示型頁面。</p>
            <el-button type="primary" @click="goToLayout('card')">
              查看示例
            </el-button>
          </el-card>
        </el-col>
      </el-row>

      <el-divider />

      <div class="layout-info">
        <h3>Layout 配置說明</h3>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="路由配置">
            在路由的 meta 中指定 layout 屬性
          </el-descriptions-item>
          <el-descriptions-item label="可用佈局">
            default, sidebar, card, fullscreen
          </el-descriptions-item>
          <el-descriptions-item label="動態切換">
            根據路由自動切換對應的佈局組件
          </el-descriptions-item>
        </el-descriptions>

        <h4 style="margin-top: 20px;">代碼示例：</h4>
        <el-input
          type="textarea"
          :rows="8"
          readonly
          :value="codeExample"
          style="margin-top: 10px"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Menu, Grid, CreditCard } from '@element-plus/icons-vue'

const router = useRouter()

const goToLayout = (layoutType: string) => {
  switch (layoutType) {
    case 'default':
      router.push('/about')
      break
    case 'sidebar':
      router.push('/users')
      break
    case 'card':
      router.push('/')
      break
  }
}

const codeExample = `// 路由配置示例
{
  path: '/users',
  name: 'Users',
  component: () => import('@/pages/users/index.vue'),
  meta: {
    title: '用戶管理',
    layout: 'sidebar' // 指定使用側邊欄佈局
  }
}

// 可用的佈局類型：
// - default: 默認水平導航佈局
// - sidebar: 側邊欄佈局
// - card: 卡片佈局
// - fullscreen: 全屏佈局`
</script>

<style scoped>
.layout-demo {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.layout-card {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.layout-card .el-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.layout-info {
  margin-top: 20px;
}

.layout-info h3 {
  color: #409eff;
  margin-bottom: 15px;
}

.layout-info h4 {
  color: #606266;
  margin-bottom: 10px;
}
</style>
