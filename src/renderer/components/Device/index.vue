<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-checkbox @change="handleChecked" :disabled="enable">设备{{ item.no }}</el-checkbox>
      <el-button style="float: right; padding: 3px 0" type="text" :disabled="enable" @click="handleEnd">结束</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" :disabled="enable" @click="handleSend">发送 |&nbsp;
      </el-button>
    </div>
    <div class="text item">
      <svg-icon icon-class="Device" style="font-size: 80px; margin-right: 10px;"/>
      <div class="device-info">
        <el-tag :type="type" style="margin-bottom: 4px;">
          {{ item.status }}
        </el-tag>
        <el-tag style="margin-bottom: 4px;">{{ item.no }}号机</el-tag>
        <el-tag style="margin-bottom: 4px;">{{ username }}</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>

import websocket from '../../utils/websocket'

export default {
  name: 'device',
  data() {
    return {}
  },
  props: {
    item: Object
  },
  computed: {
    enable() {
      return this.item.status === '离线'
    },
    type() {
      return this.item.status === '离线' ? 'info' : 'success'
    },
    username() {
      return this.item.username === null ? '空闲' : this.item.username
    }
  },
  methods: {
    handleChecked(val) {
      this.$emit('check', { check: val, item: this.item })
    },
    handleEnd() {
      const _this = this
      _this.$confirm('确认要结束该设备的课程？', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const data = {
          cmd: 'end',
          sid: _this.item.no
        }
        websocket.instance.send(JSON.stringify(data))
        _this.$message({ type: 'success', message: '指令发送成功' })
      })
    },
    handleSend() {
      this.$emit('send', this.item)
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.box-card {
  margin-bottom: 10px;
}
</style>
