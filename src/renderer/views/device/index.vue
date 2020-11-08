<template>
  <div class="container">
    <section style="margin-bottom: 10px;">
      <el-button type="primary" icon="el-icon-circle-plus" @click="handleSend">发课</el-button>
    </section>
    <el-row :gutter="10">
      <el-col :span="6" v-for="item in deviceList">
        <device :item="item" @check="handleCheck" @send="handleSendSingle"></device>
      </el-col>
    </el-row>

    <!-- 发课对话框 -->
    <el-dialog title="发送课程" :visible.sync="sendLessonDialogVisible" :close-on-click-modal="false" width="500px">
      <el-form>
        <el-form-item label="选择课程">
          <el-select v-model="sendLesson.idx" placeholder="请选择课程" @change="handleSendChange">
            <el-option v-for="(item, idx) in lessonList" :key="idx" :label="item.title" :value="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <span class="demonstration">训练时间</span>
            <el-slider v-model="send.lesson.trainingTime" show-input disabled></el-slider>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="send.lesson.description" type="textarea" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sendLessonDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import device from '../../components/Device'
import { listDevices } from '../../api/device'
import { lessonAll } from '../../api/lesson'
import { getOnline, send } from '../../api/common'
import websocket from '../../utils/websocket'

export default {
  data() {
    return {
      deviceList: [],
      lessonList: [],
      checkedDeviceList: [], // 群体发课时选中的设备列表
      checkedDevice: {}, // 单独发课时选中的设备
      sendLessonDialogVisible: false,
      sendLesson: {},
      send: {
        status: 0,
        msg: 'request ok',
        command: {
          cmd: 'start',
          to: 0,
          params: {}
        },
        lesson: {}
      },
      sendAction: 'single'
    }
  },
  components: {
    device
  },
  computed: {
    checkedDeviceIds() {
      let ids = ''
      this.checkedDeviceList.forEach(item => {
        ids += (item.id + ',')
      })
      return ids.length === 0 ? ids : ids.substr(0, ids.length - 1)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const _this = this
      // 初始化websocket监听
      websocket.instance.onmessage = function(msg) {
        _this.parseOnline(JSON.parse(msg.data))
      }
      // 初始化设备列表
      listDevices().then(response => {
        _this.deviceList = response.data
        // 获取在线设备
        getOnline()
      })
      // 初始化课程列表
      lessonAll().then(response => {
        _this.lessonList = response.data
      })
    },
    parseOnline(data) {
      const _this = this
      console.log(data)
      switch (data.type) {
        case 'online': {
          const sids = data.sid.split(',')
          const users = data.username.split(',')
          for (let i = 0; i < sids.length; i++) {
            const sid = parseInt(sids[i])
            const user = users[i]
            if (sid !== 0) {
              const device = _this.deviceList[sid - 1]
              device.username = user
              device.status = '在线'
            }
          }
          _this.notify('有设备已上线')
          break
        }
        case 'offline': {
          const sid = parseInt(data.sid)
          const device = _this.deviceList[sid - 1]
          device.username = null
          device.status = '离线'
          this.notify(device.no + '号设备已下线')
          break
        }
      }
    },
    handleCheck(data) {
      const _this = this
      if (data.check) {
        _this.checkedDeviceList.push(data.item)
      } else {
        for (let i = 0; i < _this.checkedDeviceList.length; i++) {
          const device = _this.checkedDeviceList[i]
          if (device.id === data.item.id) {
            _this.checkedDeviceList.splice(i)
            break
          }
        }
      }
    },
    handleSend() {
      const _this = this
      if (_this.checkedDeviceList.length === 0) {
        _this.$message({ type: 'warning', message: '请先选择一个设备' })
      } else {
        // 发课
        _this.sendAction = 'multiple'
        _this.sendLessonDialogVisible = true
      }
    },
    handleSendSingle(item) {
      const _this = this
      _this.checkedDevice = item
      _this.sendAction = 'single'
      _this.sendLessonDialogVisible = true
    },
    handleSendChange(val) {
      this.send.lesson = this.lessonList[val]
    },
    sendMessage() {
      const _this = this
      if (_this.send.lesson.id === undefined) {
        _this.$message({ type: 'warning', message: '请先选择一个课程' })
        return
      }
      switch (_this.sendAction) {
        case 'single': {
          _this.send.sid = _this.checkedDevice.no
          send(_this.send).then(() => {
            _this.sendLessonDialogVisible = false
            _this.$message({ type: 'success', message: '发送成功' })
          })
          break
        }
        case 'multiple': {
          _this.checkedDeviceList.forEach(device => {
            _this.send.sid = device.no
            send(_this.send).then(() => {
              _this.sendLessonDialogVisible = false
              _this.$message({ type: 'success', message: '发送成功' })
            })
          })
          break
        }
      }
    },
    notify(msg) {
      this.$notify({
        title: '提示',
        message: msg,
        position: 'bottom-right'
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
