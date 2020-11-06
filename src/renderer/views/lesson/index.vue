<template>
  <div class="container">
    <section class="tool-bar">
      <el-button type="primary" @click="handleAddClick">添加课程</el-button>
    </section>
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
          label="课程标题"
          prop="title"
          min-width="100">
      </el-table-column>
      <el-table-column
          label="课程描述"
          prop="description"
          show-overflow-tooltip
          min-width="200">
      </el-table-column>
      <el-table-column
          label="训练时长"
          prop="trainingTime"
          show-overflow-tooltip
          min-width="200">
      </el-table-column>
      <el-table-column
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
          min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="修改时间"
          prop="updateTime"
          show-overflow-tooltip
          min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="175">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)">删除
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

    <el-dialog title="添加课程" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="lesson">
        <el-form-item label="课程标题" :label-width="formLabelWidth">
          <el-input v-model="lesson.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="lesson.description">
          </el-input>
        </el-form-item>
        <el-form-item label="训练时长" :label-width="formLabelWidth">
          <el-slider
              v-model="lesson.trainingTime"
              :min="10"
              :max="120"
              :step="1"
              show-input
              show-tooltip>
          </el-slider>
        </el-form-item>
        <el-form-item label="选择故障组件" :label-width="formLabelWidth" v-if="action === 'add'">
          <el-select v-model="selectComponentName" filterable placeholder="请选择" @change="handleComponentNameChange">
            <el-option
                :key="0"
                label="全部"
                value="all">
            </el-option>
            <el-option
                v-for="item in componentNames"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置故障" :label-width="formLabelWidth" v-if="action === 'add'">
          <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入故障名称"
              :titles="['故障库', '已设置故障']"
              :button-texts="['撤回', '添加']"
              :value="targetFaults"
              :data="sourceFaults"
              @right-check-change="handleToClick"
              @left-check-change="handleFromClick"
              @change="handleFaultElementChange">
          </el-transfer>
        </el-form-item>
        <el-form-item label="课程总览" :label-width="formLabelWidth" v-if="action === 'update'">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: lesson.faultIds.split(',').length}"
              placeholder="请输入内容"
              v-model="override">
          </el-input>
        </el-form-item>
        <el-form-item class="dialog-footer" style="text-align: center;">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveLesson">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addLesson, lessonList } from '@/api/lesson'
import { componentNames, faultList, listAll, listIdIn } from '@/api/fault'
import { removeLesson, updateLesson } from '../../api/lesson'

export default {
  data() {
    return {
      tableData: [],
      page: {},
      search: '',
      lesson: { faultIds: '' },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      targetFaults: [],
      sourceFaults: [],
      componentNames: [],
      selectComponentName: '',
      action: ''
    }
  },
  computed: {
    override: {
      get() {
        let res = ''
        const faults = this.lesson.faults
        if (faults instanceof Array) {
          faults.forEach(item => {
            res += (item.faultName + '；')
          })
        }
        return res
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleEdit(index, row) {
      const _this = this
      _this.lesson = row
      _this.dialogFormVisible = true
      _this.action = 'update'
      listIdIn(_this.lesson.faultIds).then(response => {
        const data = response.data
        _this.lesson.faults = data
        _this.sourceFaults = data
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
      removeLesson(row.id).then(() => location.reload())
    },
    init() {
      const _this = this
      lessonList({ page: 0, size: 50 }).then(response => {
        const data = response.data
        _this.tableData = data.content
        _this.page = data
      })

      componentNames().then(response => {
        const data = response.data
        _this.componentNames = data
      })
    },
    handleCurrentChange(page) {
      const _this = this
      lessonList({ page: page - 1, size: 50 }).then(response => {
        const data = response.data
        _this.tableData = data.content
        _this.page = data
      })
    },
    handleAddClick() {
      this.dialogFormVisible = true
      this.action = 'add'
      this.lesson = { faultIds: '' }
    },
    filterMethod(query, item) {
      return item.faultName.indexOf(query) > -1
    },
    handleSaveLesson() {
      const _this = this
      if (_this.action === 'add') {
        _this.targetFaults.forEach(e => {
          _this.lesson.faultIds += (e + ',')
        })
        _this.lesson.faultIds = _this.lesson.faultIds.substr(0, _this.lesson.faultIds.length - 1)
        addLesson(_this.lesson).then(() => {
          _this.dialogFormVisible = false
          location.reload()
        })
      } else if (_this.action === 'update') {
        const data = _this.lesson
        console.log(data)
        data.faults = []
        updateLesson(data).then(() => {
          _this.dialogFormVisible = false
          location.reload()
        })
      }
    },
    handleComponentNameChange(componentName) {
      const _this = this
      if (componentName === 'all') {
        listAll().then(response => {
          const data = response.data
          data.forEach(item => {
            item.key = item.id
            item.label = item.faultName
            item.disabled = true
          })
          _this.sourceFaults = data
        })
      } else {
        faultList({ componentName, page: 0, size: 100 }).then(response => {
          const data = response.data
          data.content.forEach(item => {
            item.key = item.id
            item.label = item.faultName
          })
          _this.sourceFaults = data.content
          _this.targetFaults.forEach(tar => {
            _this.sourceFaults.forEach(src => {
              if (src.key === tar) {
                _this.sourceFaults.forEach(item => {
                  if (item.key !== tar) {
                    item.disabled = true
                  }
                })
              }
            })
          })
        })
      }
    },
    handleFaultElementChange(value) {
      const _this = this
      if (value.length < _this.targetFaults.length) {
        _this.sourceFaults.forEach(item => {
          item.disabled = false
        })
      }
      _this.targetFaults = value
    },
    handleToClick(data) {
      // console.log(data)
    },
    handleFromClick(data) {
      const _this = this
      // console.log(data)
      if (data.length > 0) {
        _this.sourceFaults.forEach(item => {
          item.disabled = (item.key !== data[0])
        })
      } else {
        _this.sourceFaults.forEach(item => {
          item.disabled = false
        })
      }
    },
    findFaultByKey(key) {
      this.sourceFaults.forEach(item => {
        if (item.key === key) {
          return item
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}

.tool-bar {
  margin-bottom: 10px;
}
</style>
