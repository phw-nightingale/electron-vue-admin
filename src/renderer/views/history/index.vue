<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; width: 300px;">
      <el-input placeholder="请输入姓名" @change="handleStuNameChange" v-model="studentName">
        <template slot="prepend">学员姓名：</template>
      </el-input>
    </div>
    <el-table
        :data="page.content"
        v-loading.body="listLoading"
        element-loading-text="Loading"
        border fit stripe
        highlight-current-row
        style="margin-bottom: 10px"
    >
      <el-table-column label='序号' min-width="20" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="设备ID" min-width="30" align="center">
        <template slot-scope="scope">
          {{ scope.row.machineId }}
        </template>
      </el-table-column>
      <el-table-column label="课程" min-width="45" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.courseTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学员" min-width="45" align="center">
        <template slot-scope="scope">
          {{ scope.row.studentName }}
        </template>
      </el-table-column>
      <el-table-column label="分数" min-width="30" align="center">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column label="评语" min-width="110">
        <template slot-scope="scope">
          {{ scope.row.reason }}
        </template>
      </el-table-column>
      <el-table-column label="用时(分钟)" min-width="40">
        <template slot-scope="scope">
          {{ scope.row.usedTime }}
        </template>
      </el-table-column>
      <el-table-column label="课程创建时间" min-width="110">
        <template slot-scope="scope">
          {{ scope.row.courseCreateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="65" align="center">
        <template slot-scope="scope">
          <el-button @click="handleShowTableClick(scope.row)" type="primary" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="page.totalElements"
        @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
import { historyPage } from '@/api/history'
import { pageStuNameLike } from '../../api/history'

export default {
  data() {
    return {
      page: {},
      listLoading: true,
      studentName: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      _this.listLoading = true
      historyPage({ page: 0, size: 50 }).then(response => {
        _this.listLoading = false
        _this.page = response.data
        console.log(response.data)
      })
    },
    handleSaveLesson() {
      console.log('handle save lesson')
    },
    handleStuNameChange(name) {
      const _this = this
      _this.listLoading = true
      pageStuNameLike({ studentName: name, page: 0, size: 100 }).then(response => {
        _this.listLoading = false
        const data = response.data
        console.log(data)
        _this.historyList = data.content
      })
    },
    handleShowTableClick(data) {
      this.$router.push({
        path: '/dashboard', query: { userId: data.userId }
      })
    },
    handlePageChange(page) {
      const _this = this
      historyPage({ page, size: 50 }).then(response => {
        _this.page = response.data
        _this.$message({ type: 'success', message: '数据加载完成' })
      })
    }
  }
}
</script>
