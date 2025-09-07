<template>
  <div class="users-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用戶管理</span>
          <el-button type="primary" @click="showAddDialog = true">
            <el-icon><Plus /></el-icon>
            新增用戶
          </el-button>
        </div>
      </template>

      <!-- 搜索和篩選 -->
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用戶..."
          style="width: 300px"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select v-model="statusFilter" placeholder="狀態篩選" style="width: 120px; margin-left: 10px">
          <el-option label="全部" value="" />
          <el-option label="啟用" value="active" />
          <el-option label="停用" value="inactive" />
        </el-select>
      </div>

      <!-- 用戶表格 -->
      <el-table :data="filteredUsers" style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="email" label="郵箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '啟用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="創建時間" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="editUser(row)">編輯</el-button>
            <el-button 
              size="small" 
              :type="row.status === 'active' ? 'warning' : 'success'"
              @click="toggleUserStatus(row)"
            >
              {{ row.status === 'active' ? '停用' : '啟用' }}
            </el-button>
            <el-button size="small" type="danger" @click="deleteUser(row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分頁 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="totalUsers"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>

    <!-- 新增/編輯用戶對話框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingUser ? '編輯用戶' : '新增用戶'"
      width="500px"
    >
      <el-form :model="userForm" :rules="userRules" ref="userFormRef" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="郵箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" style="width: 100%">
            <el-option label="管理員" value="admin" />
            <el-option label="普通用戶" value="user" />
            <el-option label="訪客" value="guest" />
          </el-select>
        </el-form-item>
        <el-form-item label="狀態" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio value="active">啟用</el-radio>
            <el-radio value="inactive">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="saveUser">確定</el-button>
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
const currentPage = ref(1)
const pageSize = ref(10)
const showAddDialog = ref(false)
const editingUser = ref<any>(null)
const userFormRef = ref()

// 用戶表單
const userForm = ref({
  name: '',
  email: '',
  role: 'user',
  status: 'active'
})

// 表單驗證規則
const userRules = {
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '請輸入郵箱', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的郵箱格式', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '請選擇角色', trigger: 'change' }
  ]
}

// 模擬用戶數據
const users = ref([
  {
    id: 1,
    name: '張三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active',
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
    createTime: '2024-01-16 14:20:00'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: 'guest',
    status: 'inactive',
    createTime: '2024-01-17 09:15:00'
  }
])

// 計算屬性
const filteredUsers = computed(() => {
  let filtered = users.value

  // 搜索過濾
  if (searchQuery.value) {
    filtered = filtered.filter(user => 
      user.name.includes(searchQuery.value) || 
      user.email.includes(searchQuery.value)
    )
  }

  // 狀態過濾
  if (statusFilter.value) {
    filtered = filtered.filter(user => user.status === statusFilter.value)
  }

  return filtered
})

const totalUsers = computed(() => filteredUsers.value.length)

// 方法
const editUser = (user: any) => {
  editingUser.value = user
  userForm.value = { ...user }
  showAddDialog.value = true
}

const toggleUserStatus = (user: any) => {
  user.status = user.status === 'active' ? 'inactive' : 'active'
  ElMessage.success(`用戶 ${user.name} 狀態已更新`)
}

const deleteUser = async (user: any) => {
  try {
    await ElMessageBox.confirm(
      `確定要刪除用戶 ${user.name} 嗎？`,
      '確認刪除',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = users.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      users.value.splice(index, 1)
      ElMessage.success('用戶刪除成功')
    }
  } catch {
    // 用戶取消刪除
  }
}

const saveUser = async () => {
  try {
    await userFormRef.value.validate()
    
    if (editingUser.value) {
      // 編輯用戶
      const index = users.value.findIndex(u => u.id === editingUser.value!.id)
      if (index > -1) {
        users.value[index] = { ...editingUser.value!, ...userForm.value }
      }
      ElMessage.success('用戶更新成功')
    } else {
      // 新增用戶
      const newUser = {
        id: Date.now(),
        ...userForm.value,
        createTime: new Date().toLocaleString()
      }
      users.value.push(newUser)
      ElMessage.success('用戶新增成功')
    }
    
    showAddDialog.value = false
    resetForm()
  } catch {
    // 表單驗證失敗
  }
}

const resetForm = () => {
  userForm.value = {
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  }
  editingUser.value = null
}

onMounted(() => {
  // 組件掛載時的初始化邏輯
})
</script>

<style scoped>
.users-page {
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
