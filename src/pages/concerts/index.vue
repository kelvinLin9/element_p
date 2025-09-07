<template>
  <div class="concerts-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>演唱會管理</span>
          <el-button type="primary" @click="showAddDialog = true">
            <el-icon><Plus /></el-icon>
            新增演唱會
          </el-button>
        </div>
      </template>

      <!-- 搜索和篩選 -->
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索演唱會..."
          style="width: 300px"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select v-model="statusFilter" placeholder="狀態篩選" style="width: 120px; margin-left: 10px">
          <el-option label="全部" value="" />
          <el-option label="進行中" value="active" />
          <el-option label="已結束" value="ended" />
          <el-option label="即將開始" value="upcoming" />
        </el-select>
        <el-select v-model="venueFilter" placeholder="場地篩選" style="width: 150px; margin-left: 10px">
          <el-option label="全部場地" value="" />
          <el-option label="台北小巨蛋" value="taipei" />
          <el-option label="高雄巨蛋" value="kaohsiung" />
          <el-option label="台中洲際棒球場" value="taichung" />
        </el-select>
      </div>

      <!-- 演唱會表格 -->
      <el-table :data="filteredConcerts" style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="演唱會名稱" width="200" />
        <el-table-column prop="artist" label="藝人" width="150" />
        <el-table-column prop="venue" label="場地" width="150" />
        <el-table-column prop="date" label="演出日期" width="120" />
        <el-table-column prop="time" label="演出時間" width="100" />
        <el-table-column prop="ticketPrice" label="票價" width="100">
          <template #default="{ row }">
            ¥{{ row.ticketPrice }}
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="座位數" width="100" />
        <el-table-column prop="soldTickets" label="已售" width="100" />
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="editConcert(row)">編輯</el-button>
            <el-button size="small" type="success" @click="viewTickets(row)">票務</el-button>
            <el-button size="small" type="danger" @click="deleteConcert(row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分頁 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="totalConcerts"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>

    <!-- 新增/編輯演唱會對話框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingConcert ? '編輯演唱會' : '新增演唱會'"
      width="600px"
    >
      <el-form :model="concertForm" :rules="concertRules" ref="concertFormRef" label-width="100px">
        <el-form-item label="演唱會名稱" prop="title">
          <el-input v-model="concertForm.title" />
        </el-form-item>
        <el-form-item label="藝人" prop="artist">
          <el-input v-model="concertForm.artist" />
        </el-form-item>
        <el-form-item label="場地" prop="venue">
          <el-select v-model="concertForm.venue" style="width: 100%">
            <el-option label="台北小巨蛋" value="台北小巨蛋" />
            <el-option label="高雄巨蛋" value="高雄巨蛋" />
            <el-option label="台中洲際棒球場" value="台中洲際棒球場" />
            <el-option label="新竹縣立體育場" value="新竹縣立體育場" />
          </el-select>
        </el-form-item>
        <el-form-item label="演出日期" prop="date">
          <el-date-picker
            v-model="concertForm.date"
            type="date"
            placeholder="選擇日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="演出時間" prop="time">
          <el-time-picker
            v-model="concertForm.time"
            placeholder="選擇時間"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="票價" prop="ticketPrice">
          <el-input-number v-model="concertForm.ticketPrice" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="座位數" prop="capacity">
          <el-input-number v-model="concertForm.capacity" :min="1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="狀態" prop="status">
          <el-radio-group v-model="concertForm.status">
            <el-radio value="upcoming">即將開始</el-radio>
            <el-radio value="active">進行中</el-radio>
            <el-radio value="ended">已結束</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="saveConcert">確定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'

// 響應式數據
const searchQuery = ref('')
const statusFilter = ref('')
const venueFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const showAddDialog = ref(false)
const editingConcert = ref<any>(null)
const concertFormRef = ref()

// 演唱會表單
const concertForm = ref({
  title: '',
  artist: '',
  venue: '',
  date: '',
  time: '',
  ticketPrice: 0,
  capacity: 0,
  status: 'upcoming'
})

// 表單驗證規則
const concertRules = {
  title: [
    { required: true, message: '請輸入演唱會名稱', trigger: 'blur' }
  ],
  artist: [
    { required: true, message: '請輸入藝人姓名', trigger: 'blur' }
  ],
  venue: [
    { required: true, message: '請選擇場地', trigger: 'change' }
  ],
  date: [
    { required: true, message: '請選擇演出日期', trigger: 'change' }
  ],
  time: [
    { required: true, message: '請選擇演出時間', trigger: 'change' }
  ],
  ticketPrice: [
    { required: true, message: '請輸入票價', trigger: 'blur' }
  ],
  capacity: [
    { required: true, message: '請輸入座位數', trigger: 'blur' }
  ]
}

// 模擬演唱會數據
const concerts = ref([
  {
    id: 1,
    title: '周杰倫 2024 世界巡迴演唱會',
    artist: '周杰倫',
    venue: '台北小巨蛋',
    date: '2024-03-15',
    time: '19:30',
    ticketPrice: 2800,
    capacity: 15000,
    soldTickets: 12000,
    status: 'upcoming'
  },
  {
    id: 2,
    title: '五月天 人生無限公司',
    artist: '五月天',
    venue: '高雄巨蛋',
    date: '2024-02-20',
    time: '19:00',
    ticketPrice: 3200,
    capacity: 12000,
    soldTickets: 12000,
    status: 'ended'
  },
  {
    id: 3,
    title: '蔡依林 PLAY 世界巡迴演唱會',
    artist: '蔡依林',
    venue: '台中洲際棒球場',
    date: '2024-04-10',
    time: '20:00',
    ticketPrice: 3500,
    capacity: 20000,
    soldTickets: 8500,
    status: 'upcoming'
  }
])

// 計算屬性
const filteredConcerts = computed(() => {
  let filtered = concerts.value

  // 搜索過濾
  if (searchQuery.value) {
    filtered = filtered.filter(concert => 
      concert.title.includes(searchQuery.value) || 
      concert.artist.includes(searchQuery.value)
    )
  }

  // 狀態過濾
  if (statusFilter.value) {
    filtered = filtered.filter(concert => concert.status === statusFilter.value)
  }

  // 場地過濾
  if (venueFilter.value) {
    filtered = filtered.filter(concert => concert.venue.includes(venueFilter.value))
  }

  return filtered
})

const totalConcerts = computed(() => filteredConcerts.value.length)

// 方法
const getStatusType = (status: string) => {
  const statusTypes: Record<string, string> = {
    'upcoming': 'warning',
    'active': 'success',
    'ended': 'info'
  }
  return statusTypes[status] || 'info'
}

const getStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'upcoming': '即將開始',
    'active': '進行中',
    'ended': '已結束'
  }
  return statusTexts[status] || status
}

const editConcert = (concert: any) => {
  editingConcert.value = concert
  concertForm.value = { ...concert }
  showAddDialog.value = true
}

const viewTickets = (concert: any) => {
  ElMessage.info(`查看 ${concert.title} 的票務資訊`)
}

const deleteConcert = async (concert: any) => {
  try {
    await ElMessageBox.confirm(
      `確定要刪除演唱會 ${concert.title} 嗎？`,
      '確認刪除',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = concerts.value.findIndex(c => c.id === concert.id)
    if (index > -1) {
      concerts.value.splice(index, 1)
      ElMessage.success('演唱會刪除成功')
    }
  } catch {
    // 用戶取消刪除
  }
}

const saveConcert = async () => {
  try {
    await concertFormRef.value.validate()
    
    if (editingConcert.value) {
      // 編輯演唱會
      const index = concerts.value.findIndex(c => c.id === editingConcert.value!.id)
      if (index > -1) {
        concerts.value[index] = { ...editingConcert.value!, ...concertForm.value }
      }
      ElMessage.success('演唱會更新成功')
    } else {
      // 新增演唱會
      const newConcert = {
        id: Date.now(),
        ...concertForm.value,
        soldTickets: 0
      }
      concerts.value.push(newConcert)
      ElMessage.success('演唱會新增成功')
    }
    
    showAddDialog.value = false
    resetForm()
  } catch {
    // 表單驗證失敗
  }
}

const resetForm = () => {
  concertForm.value = {
    title: '',
    artist: '',
    venue: '',
    date: '',
    time: '',
    ticketPrice: 0,
    capacity: 0,
    status: 'upcoming'
  }
  editingConcert.value = null
}

onMounted(() => {
  // 組件掛載時的初始化邏輯
})
</script>

<style scoped>
.concerts-page {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
