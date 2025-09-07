<template>
  <div class="orders-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>訂單管理</span>
          <div class="header-actions">
            <el-button type="success" @click="exportOrders">
              <el-icon><Download /></el-icon>
              匯出訂單
            </el-button>
            <el-button type="primary" @click="showAddDialog = true">
              <el-icon><Plus /></el-icon>
              新增訂單
            </el-button>
          </div>
        </div>
      </template>

      <!-- 搜索和篩選 -->
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索訂單號或用戶..."
          style="width: 300px"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select v-model="statusFilter" placeholder="狀態篩選" style="width: 120px; margin-left: 10px">
          <el-option label="全部" value="" />
          <el-option label="待付款" value="pending" />
          <el-option label="已付款" value="paid" />
          <el-option label="已取消" value="cancelled" />
          <el-option label="已完成" value="completed" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          style="margin-left: 10px"
        />
      </div>

      <!-- 訂單統計 -->
      <div class="order-stats">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-content">
                <div class="stat-number">{{ orderStats.total }}</div>
                <div class="stat-label">總訂單數</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-content">
                <div class="stat-number">{{ orderStats.pending }}</div>
                <div class="stat-label">待付款</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-content">
                <div class="stat-number">{{ orderStats.paid }}</div>
                <div class="stat-label">已付款</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-content">
                <div class="stat-number">¥{{ orderStats.revenue }}</div>
                <div class="stat-label">總收入</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 訂單表格 -->
      <el-table :data="filteredOrders" style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="訂單號" width="120" />
        <el-table-column prop="userName" label="用戶" width="100" />
        <el-table-column prop="concertTitle" label="演唱會" width="200" />
        <el-table-column prop="ticketCount" label="票數" width="80" />
        <el-table-column prop="unitPrice" label="單價" width="100">
          <template #default="{ row }">
            ¥{{ row.unitPrice }}
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="總金額" width="120">
          <template #default="{ row }">
            ¥{{ row.totalAmount }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="訂單日期" width="120" />
        <el-table-column prop="paymentDate" label="付款日期" width="120" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="viewOrder(row)">查看</el-button>
            <el-button 
              size="small" 
              :type="row.status === 'pending' ? 'success' : 'warning'"
              @click="updateOrderStatus(row)"
            >
              {{ row.status === 'pending' ? '確認付款' : '修改狀態' }}
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              v-if="row.status === 'pending'"
              @click="cancelOrder(row)"
            >
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分頁 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="totalOrders"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>

    <!-- 新增訂單對話框 -->
    <el-dialog
      v-model="showAddDialog"
      title="新增訂單"
      width="600px"
    >
      <el-form :model="orderForm" :rules="orderRules" ref="orderFormRef" label-width="100px">
        <el-form-item label="用戶" prop="userName">
          <el-select v-model="orderForm.userName" style="width: 100%" filterable>
            <el-option 
              v-for="user in users" 
              :key="user.id" 
              :label="user.name" 
              :value="user.name" 
            />
          </el-select>
        </el-form-item>
        <el-form-item label="演唱會" prop="concertTitle">
          <el-select v-model="orderForm.concertTitle" style="width: 100%">
            <el-option 
              v-for="concert in concerts" 
              :key="concert.id" 
              :label="concert.title" 
              :value="concert.title" 
            />
          </el-select>
        </el-form-item>
        <el-form-item label="票數" prop="ticketCount">
          <el-input-number v-model="orderForm.ticketCount" :min="1" :max="10" style="width: 100%" />
        </el-form-item>
        <el-form-item label="單價" prop="unitPrice">
          <el-input-number v-model="orderForm.unitPrice" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="狀態" prop="status">
          <el-radio-group v-model="orderForm.status">
            <el-radio value="pending">待付款</el-radio>
            <el-radio value="paid">已付款</el-radio>
            <el-radio value="completed">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="saveOrder">確定</el-button>
      </template>
    </el-dialog>

    <!-- 訂單詳情對話框 -->
    <el-dialog
      v-model="showDetailDialog"
      title="訂單詳情"
      width="500px"
    >
      <el-descriptions :column="1" border v-if="selectedOrder">
        <el-descriptions-item label="訂單號">{{ selectedOrder.id }}</el-descriptions-item>
        <el-descriptions-item label="用戶">{{ selectedOrder.userName }}</el-descriptions-item>
        <el-descriptions-item label="演唱會">{{ selectedOrder.concertTitle }}</el-descriptions-item>
        <el-descriptions-item label="票數">{{ selectedOrder.ticketCount }}</el-descriptions-item>
        <el-descriptions-item label="單價">¥{{ selectedOrder.unitPrice }}</el-descriptions-item>
        <el-descriptions-item label="總金額">¥{{ selectedOrder.totalAmount }}</el-descriptions-item>
        <el-descriptions-item label="狀態">
          <el-tag :type="getStatusType(selectedOrder.status)">
            {{ getStatusText(selectedOrder.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="訂單日期">{{ selectedOrder.orderDate }}</el-descriptions-item>
        <el-descriptions-item label="付款日期">{{ selectedOrder.paymentDate || '未付款' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Download } from '@element-plus/icons-vue'

// 響應式數據
const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref<[Date, Date] | null>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const showAddDialog = ref(false)
const showDetailDialog = ref(false)
const selectedOrder = ref<any>(null)
const orderFormRef = ref()

// 訂單表單
const orderForm = ref({
  userName: '',
  concertTitle: '',
  ticketCount: 1,
  unitPrice: 0,
  status: 'pending'
})

// 表單驗證規則
const orderRules = {
  userName: [
    { required: true, message: '請選擇用戶', trigger: 'change' }
  ],
  concertTitle: [
    { required: true, message: '請選擇演唱會', trigger: 'change' }
  ],
  ticketCount: [
    { required: true, message: '請輸入票數', trigger: 'blur' }
  ],
  unitPrice: [
    { required: true, message: '請輸入單價', trigger: 'blur' }
  ]
}

// 模擬用戶數據
const users = ref([
  { id: 1, name: '張三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
])

// 模擬演唱會數據
const concerts = ref([
  { id: 1, title: '周杰倫 2024 世界巡迴演唱會' },
  { id: 2, title: '五月天 人生無限公司' },
  { id: 3, title: '蔡依林 PLAY 世界巡迴演唱會' }
])

// 模擬訂單數據
const orders = ref([
  {
    id: 'ORD001',
    userName: '張三',
    concertTitle: '周杰倫 2024 世界巡迴演唱會',
    ticketCount: 2,
    unitPrice: 2800,
    totalAmount: 5600,
    status: 'paid',
    orderDate: '2024-01-15',
    paymentDate: '2024-01-15'
  },
  {
    id: 'ORD002',
    userName: '李四',
    concertTitle: '五月天 人生無限公司',
    ticketCount: 1,
    unitPrice: 3200,
    totalAmount: 3200,
    status: 'pending',
    orderDate: '2024-01-16',
    paymentDate: null
  },
  {
    id: 'ORD003',
    userName: '王五',
    concertTitle: '蔡依林 PLAY 世界巡迴演唱會',
    ticketCount: 3,
    unitPrice: 3500,
    totalAmount: 10500,
    status: 'completed',
    orderDate: '2024-01-17',
    paymentDate: '2024-01-17'
  }
])

// 計算屬性
const filteredOrders = computed(() => {
  let filtered = orders.value

  // 搜索過濾
  if (searchQuery.value) {
    filtered = filtered.filter(order => 
      order.id.includes(searchQuery.value) || 
      order.userName.includes(searchQuery.value)
    )
  }

  // 狀態過濾
  if (statusFilter.value) {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  // 日期過濾
  if (dateRange.value) {
    const [startDate, endDate] = dateRange.value
    filtered = filtered.filter(order => {
      const orderDate = new Date(order.orderDate)
      return orderDate >= startDate && orderDate <= endDate
    })
  }

  return filtered
})

const totalOrders = computed(() => filteredOrders.value.length)

// 訂單統計
const orderStats = computed(() => {
  const stats = {
    total: orders.value.length,
    pending: orders.value.filter(o => o.status === 'pending').length,
    paid: orders.value.filter(o => o.status === 'paid').length,
    revenue: orders.value
      .filter(o => o.status === 'paid' || o.status === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0)
  }
  return stats
})

// 方法
const getStatusType = (status: string) => {
  const statusTypes: Record<string, string> = {
    'pending': 'warning',
    'paid': 'success',
    'cancelled': 'danger',
    'completed': 'info'
  }
  return statusTypes[status] || 'info'
}

const getStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'pending': '待付款',
    'paid': '已付款',
    'cancelled': '已取消',
    'completed': '已完成'
  }
  return statusTexts[status] || status
}

const viewOrder = (order: any) => {
  selectedOrder.value = order
  showDetailDialog.value = true
}

const updateOrderStatus = async (order: any) => {
  if (order.status === 'pending') {
    try {
      await ElMessageBox.confirm(
        `確定要確認訂單 ${order.id} 的付款嗎？`,
        '確認付款',
        {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
      
      order.status = 'paid'
      order.paymentDate = new Date().toISOString().split('T')[0]
      ElMessage.success('付款確認成功')
    } catch {
      // 用戶取消
    }
  } else {
    ElMessage.info('修改狀態功能開發中...')
  }
}

const cancelOrder = async (order: any) => {
  try {
    await ElMessageBox.confirm(
      `確定要取消訂單 ${order.id} 嗎？`,
      '確認取消',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    order.status = 'cancelled'
    ElMessage.success('訂單取消成功')
  } catch {
    // 用戶取消
  }
}

const saveOrder = async () => {
  try {
    await orderFormRef.value.validate()
    
    const newOrder = {
      id: `ORD${String(orders.value.length + 1).padStart(3, '0')}`,
      ...orderForm.value,
      totalAmount: orderForm.value.ticketCount * orderForm.value.unitPrice,
      orderDate: new Date().toISOString().split('T')[0],
      paymentDate: orderForm.value.status === 'paid' ? new Date().toISOString().split('T')[0] : null
    }
    
    orders.value.push(newOrder)
    ElMessage.success('訂單新增成功')
    
    showAddDialog.value = false
    resetForm()
  } catch {
    // 表單驗證失敗
  }
}

const resetForm = () => {
  orderForm.value = {
    userName: '',
    concertTitle: '',
    ticketCount: 1,
    unitPrice: 0,
    status: 'pending'
  }
}

const exportOrders = () => {
  ElMessage.success('訂單匯出功能開發中...')
}

onMounted(() => {
  // 組件掛載時的初始化邏輯
})
</script>

<style scoped>
.orders-page {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.order-stats {
  margin-bottom: 20px;
}

.stat-card {
  text-align: center;
}

.stat-content {
  padding: 20px;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
