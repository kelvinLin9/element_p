<template>
  <div class="settings-page">
    <el-row :gutter="20">
      <!-- 左側導航 -->
      <el-col :span="6">
        <el-card>
          <template #header>
            <span>設定選項</span>
          </template>
          <el-menu
            :default-active="activeTab"
            @select="handleTabChange"
            class="settings-menu"
          >
            <el-menu-item index="general">
              <el-icon><Setting /></el-icon>
              <span>一般設定</span>
            </el-menu-item>
            <el-menu-item index="appearance">
              <el-icon><Brush /></el-icon>
              <span>外觀設定</span>
            </el-menu-item>
            <el-menu-item index="security">
              <el-icon><Lock /></el-icon>
              <span>安全設定</span>
            </el-menu-item>
            <el-menu-item index="notifications">
              <el-icon><Bell /></el-icon>
              <span>通知設定</span>
            </el-menu-item>
            <el-menu-item index="advanced">
              <el-icon><Tools /></el-icon>
              <span>進階設定</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>

      <!-- 右側內容 -->
      <el-col :span="18">
        <el-card>
          <template #header>
            <span>{{ currentTabTitle }}</span>
          </template>

          <!-- 一般設定 -->
          <div v-if="activeTab === 'general'" class="settings-content">
            <el-form :model="generalSettings" label-width="120px">
              <el-form-item label="系統名稱">
                <el-input v-model="generalSettings.systemName" />
              </el-form-item>
              <el-form-item label="系統描述">
                <el-input 
                  v-model="generalSettings.systemDescription" 
                  type="textarea" 
                  :rows="3"
                />
              </el-form-item>
              <el-form-item label="語言設定">
                <el-select v-model="generalSettings.language" style="width: 200px">
                  <el-option label="繁體中文" value="zh-TW" />
                  <el-option label="English" value="en" />
                  <el-option label="简体中文" value="zh-CN" />
                </el-select>
              </el-form-item>
              <el-form-item label="時區設定">
                <el-select v-model="generalSettings.timezone" style="width: 200px">
                  <el-option label="台北時間 (UTC+8)" value="Asia/Taipei" />
                  <el-option label="北京時間 (UTC+8)" value="Asia/Shanghai" />
                  <el-option label="東京時間 (UTC+9)" value="Asia/Tokyo" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <!-- 外觀設定 -->
          <div v-if="activeTab === 'appearance'" class="settings-content">
            <el-form :model="appearanceSettings" label-width="120px">
              <el-form-item label="主題模式">
                <el-radio-group v-model="appearanceSettings.theme">
                  <el-radio value="light">淺色模式</el-radio>
                  <el-radio value="dark">深色模式</el-radio>
                  <el-radio value="auto">自動</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="主色調">
                <el-color-picker v-model="appearanceSettings.primaryColor" />
              </el-form-item>
              <el-form-item label="字體大小">
                <el-slider 
                  v-model="appearanceSettings.fontSize" 
                  :min="12" 
                  :max="20" 
                  show-input
                />
              </el-form-item>
              <el-form-item label="圓角設定">
                <el-switch v-model="appearanceSettings.roundedCorners" />
              </el-form-item>
              <el-form-item label="動畫效果">
                <el-switch v-model="appearanceSettings.animations" />
              </el-form-item>
            </el-form>
          </div>

          <!-- 安全設定 -->
          <div v-if="activeTab === 'security'" class="settings-content">
            <el-form :model="securitySettings" label-width="120px">
              <el-form-item label="密碼強度">
                <el-select v-model="securitySettings.passwordStrength" style="width: 200px">
                  <el-option label="低" value="low" />
                  <el-option label="中" value="medium" />
                  <el-option label="高" value="high" />
                </el-select>
              </el-form-item>
              <el-form-item label="登入失敗限制">
                <el-input-number 
                  v-model="securitySettings.maxLoginAttempts" 
                  :min="3" 
                  :max="10"
                />
                <span style="margin-left: 10px; color: #909399;">次</span>
              </el-form-item>
              <el-form-item label="會話超時">
                <el-input-number 
                  v-model="securitySettings.sessionTimeout" 
                  :min="15" 
                  :max="480"
                />
                <span style="margin-left: 10px; color: #909399;">分鐘</span>
              </el-form-item>
              <el-form-item label="雙重驗證">
                <el-switch v-model="securitySettings.twoFactorAuth" />
              </el-form-item>
              <el-form-item label="IP 白名單">
                <el-switch v-model="securitySettings.ipWhitelist" />
              </el-form-item>
            </el-form>
          </div>

          <!-- 通知設定 -->
          <div v-if="activeTab === 'notifications'" class="settings-content">
            <el-form :model="notificationSettings" label-width="120px">
              <el-form-item label="郵件通知">
                <el-switch v-model="notificationSettings.emailNotifications" />
              </el-form-item>
              <el-form-item label="系統通知">
                <el-switch v-model="notificationSettings.systemNotifications" />
              </el-form-item>
              <el-form-item label="桌面通知">
                <el-switch v-model="notificationSettings.desktopNotifications" />
              </el-form-item>
              <el-form-item label="通知頻率">
                <el-select v-model="notificationSettings.frequency" style="width: 200px">
                  <el-option label="即時" value="immediate" />
                  <el-option label="每小時" value="hourly" />
                  <el-option label="每日" value="daily" />
                  <el-option label="每週" value="weekly" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <!-- 進階設定 -->
          <div v-if="activeTab === 'advanced'" class="settings-content">
            <el-form :model="advancedSettings" label-width="120px">
              <el-form-item label="除錯模式">
                <el-switch v-model="advancedSettings.debugMode" />
              </el-form-item>
              <el-form-item label="API 版本">
                <el-select v-model="advancedSettings.apiVersion" style="width: 200px">
                  <el-option label="v1.0" value="v1" />
                  <el-option label="v2.0" value="v2" />
                  <el-option label="v3.0" value="v3" />
                </el-select>
              </el-form-item>
              <el-form-item label="快取設定">
                <el-input-number 
                  v-model="advancedSettings.cacheTimeout" 
                  :min="0" 
                  :max="3600"
                />
                <span style="margin-left: 10px; color: #909399;">秒</span>
              </el-form-item>
              <el-form-item label="日誌等級">
                <el-select v-model="advancedSettings.logLevel" style="width: 200px">
                  <el-option label="錯誤" value="error" />
                  <el-option label="警告" value="warn" />
                  <el-option label="資訊" value="info" />
                  <el-option label="除錯" value="debug" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <!-- 操作按鈕 -->
          <div class="settings-actions">
            <el-button type="primary" @click="saveSettings">儲存設定</el-button>
            <el-button @click="resetSettings">重置</el-button>
            <el-button type="danger" @click="exportSettings">匯出設定</el-button>
            <el-button @click="importSettings">匯入設定</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Setting, Brush, Lock, Bell, Tools } from '@element-plus/icons-vue'

// 當前選中的標籤
const activeTab = ref('general')

// 設定數據
const generalSettings = ref({
  systemName: 'Element Plus 專案',
  systemDescription: '這是一個使用 Vue 3 + Element Plus 建立的現代化專案',
  language: 'zh-TW',
  timezone: 'Asia/Taipei'
})

const appearanceSettings = ref({
  theme: 'light',
  primaryColor: '#409eff',
  fontSize: 14,
  roundedCorners: true,
  animations: true
})

const securitySettings = ref({
  passwordStrength: 'medium',
  maxLoginAttempts: 5,
  sessionTimeout: 60,
  twoFactorAuth: false,
  ipWhitelist: false
})

const notificationSettings = ref({
  emailNotifications: true,
  systemNotifications: true,
  desktopNotifications: false,
  frequency: 'immediate'
})

const advancedSettings = ref({
  debugMode: false,
  apiVersion: 'v2',
  cacheTimeout: 300,
  logLevel: 'info'
})

// 計算屬性
const currentTabTitle = computed(() => {
  const titles: Record<string, string> = {
    general: '一般設定',
    appearance: '外觀設定',
    security: '安全設定',
    notifications: '通知設定',
    advanced: '進階設定'
  }
  return titles[activeTab.value] || '設定'
})

// 方法
const handleTabChange = (key: string) => {
  activeTab.value = key
}

const saveSettings = () => {
  // 這裡可以將設定保存到後端或本地存儲
  ElMessage.success('設定已儲存')
}

const resetSettings = () => {
  // 重置所有設定到默認值
  ElMessage.success('設定已重置')
}

const exportSettings = () => {
  // 匯出設定
  const settings = {
    general: generalSettings.value,
    appearance: appearanceSettings.value,
    security: securitySettings.value,
    notifications: notificationSettings.value,
    advanced: advancedSettings.value
  }
  
  const dataStr = JSON.stringify(settings, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = 'settings.json'
  link.click()
  
  URL.revokeObjectURL(url)
  ElMessage.success('設定已匯出')
}

const importSettings = () => {
  // 匯入設定
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string)
          // 更新設定
          if (settings.general) generalSettings.value = settings.general
          if (settings.appearance) appearanceSettings.value = settings.appearance
          if (settings.security) securitySettings.value = settings.security
          if (settings.notifications) notificationSettings.value = settings.notifications
          if (settings.advanced) advancedSettings.value = settings.advanced
          
          ElMessage.success('設定已匯入')
        } catch (error) {
          ElMessage.error('設定檔案格式錯誤')
        }
      }
      reader.readAsText(file)
    }
  }
  
  input.click()
}
</script>

<style scoped>
.settings-page {
  padding: 20px;
}

.settings-menu {
  border: none;
}

.settings-content {
  min-height: 400px;
}

.settings-actions {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
  display: flex;
  gap: 10px;
}
</style>
