# 動態 Layout 系統配置

## 當前配置

### 路由配置
- **首頁 (`/`)**: 儀錶板頁面，使用 SidebarLayout
- **關於頁面 (`/about`)**: 使用 SidebarLayout  
- **用戶管理 (`/users`)**: 使用 SidebarLayout
- **系統設定 (`/settings`)**: 使用 SidebarLayout
- **Layout 演示 (`/layout-demo`)**: 使用 SidebarLayout
- **歡迎頁面 (`/welcome`)**: 使用 CardLayout

### 佈局類型
1. **SidebarLayout** (側邊欄佈局) - 默認佈局
   - 左側邊欄導航
   - 可收縮功能
   - 麵包屑導航
   - 頂部用戶頭像下拉菜單

2. **CardLayout** (卡片佈局)
   - 居中卡片設計
   - 漸變背景
   - 適合展示頁面

3. **DefaultLayout** (默認佈局)
   - 頂部水平導航
   - 簡潔設計

4. **FullscreenLayout** (全屏佈局)
   - 無導航欄
   - 全屏顯示

## 主要頁面

### 儀錶板 (`/`)
- 歡迎區域
- 統計卡片（用戶數、訂單數等）
- 圖表區域
- 最近活動時間線
- 快速操作按鈕

### 歡迎頁面 (`/welcome`)
- 系統介紹
- 功能特色展示
- 技術棧標籤
- 進入儀錶板按鈕

## 導航結構

### 側邊欄菜單
- 儀錶板 (首頁)
- 關於我們
- 管理功能
  - 用戶管理
  - 系統設定
  - Layout 演示

## 使用方式

1. 訪問 `/` 直接進入儀錶板（SidebarLayout）
2. 訪問 `/welcome` 查看歡迎頁面（CardLayout）
3. 通過側邊欄導航訪問其他功能頁面

## 技術特點

- Vue 3 Composition API
- TypeScript 支持
- Element Plus UI 組件
- 響應式設計
- 動態佈局切換
