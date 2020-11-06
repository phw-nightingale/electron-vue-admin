<template>
  <div class="container">
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        border
        stripe
        size="medium">
      <el-table-column
          label="ID"
          prop="id"
          min-width="60">
      </el-table-column>
      <el-table-column
          label="机车部门"
          prop="transportDepartment"
          min-width="100">
      </el-table-column>
      <el-table-column
          label="部件名称"
          prop="componentName"
          show-overflow-tooltip
          min-width="100">
      </el-table-column>
      <el-table-column
          label="故障名称"
          prop="faultName"
          show-overflow-tooltip
          min-width="400">
      </el-table-column>
      <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="175">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="page.totalElements"
        :page-size="50"
        style="margin-top: 10px"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { faultList } from '@/api/fault'

export default {
  data() {
    return {
      tableData: [],
      page: {},
      search: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    init() {
      const _this = this
      faultList({ page: 0, size: 50 }).then(response => {
        const data = response.data
        _this.tableData = data.content
        _this.page = data
      })
    },
    handleCurrentChange(page) {
      const _this = this
      faultList({ page: page - 1, size: 50 }).then(response => {
        const data = response.data
        _this.tableData = data.content
        _this.page = data
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
