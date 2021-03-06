<template>
  <div class="app-container">

    <el-button-group style="margin-bottom: 10px;">
      <el-button type="primary" icon="el-icon-edit"
                 @click="dialogFormVisible = true; student = { password: '12345', role: 'STUDENT'}">添加学员
      </el-button>
    </el-button-group>

    <el-table
        element-loading-text="Loading"
        v-loading.body="listLoading"
        highlight-current-row
        :data="userList"
        border
        stripe
        fit
    >
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="55">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="55">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="110">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="245" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="dialogFormVisible = true; student = scope.row">编辑</el-button>
          <el-button type="warning" size="mini" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
          <el-button type="primary" size="mini">成绩曲线</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑学员对话框 -->
    <el-dialog title="学员管理" :visible.sync="dialogFormVisible">
      <el-form :model="student">
        <el-form-item label="用户名" :label-width="labelWidth">
          <el-input v-model="student.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="labelWidth">
          <el-input v-model="student.password" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="labelWidth">
          <el-input v-model="student.role" disabled auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveStudent">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { removeStudent, saveStudent, studentList } from '../../api/user'

export default {
  data() {
    return {
      userList: [],
      listLoading: true,
      labelWidth: '60px',
      dialogFormVisible: false,
      student: {},
      action: 'save'
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
      studentList().then(response => {
        _this.listLoading = false
        _this.userList = response.data
      })
    },
    handleSaveStudent() {
      const _this = this
      _this.listLoading = true
      const stu = _this.student
      const data = {
        username: stu.username,
        role: stu.role,
        password: stu.password
      }
      if (stu.id !== undefined) {
        data.id = stu.id
      }
      saveStudent(data).then(response => {
        _this.listLoading = false
        _this.dialogFormVisible = false
        const data = response.data
        _this.updateDataList(data)
        _this.$message({ type: 'success', message: '更新完成' })
      })
    },
    updateDataList(data) {
      const _this = this
      let isNew = true
      for (let i = 0; i < _this.userList.length; i++) {
        let item = _this.userList[i]
        if (item.id === data.id) {
          item = data
          isNew = false
          break
        }
      }
      if (isNew) {
        _this.userList.push(data)
      }
    },
    handleRemove(idx, row) {
      const _this = this
      _this.listLoading = true
      _this.$confirm('此操作将永久删除该学员的信息，以及相关训练记录和历史，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeStudent(row.id).then(() => {
          _this.listLoading = false
          _this.userList.splice(idx)
          _this.$message({ type: 'success', message: '删除完成' })
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
