<template>
  <el-row :gutter="10">
    <el-col :span="6" style="margin-bottom: 10px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-checkbox>设备</el-checkbox>
          <el-button style="float: right; padding: 3px 0" type="text">结束</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">
            发送 |&nbsp;
          </el-button>
        </div>
        <div class="text item">
          <svg-icon icon-class="Device" style="font-size: 80px; margin-right: 10px;"/>
          <div class="device-info">
            <el-tag type="success" style="margin-bottom: 4px;">
              在线
            </el-tag>
            <el-tag style="margin-bottom: 4px;">1号机</el-tag>
            <el-tag style="margin-bottom: 4px;">空闲</el-tag>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>

export default {
  name: 'device',
  data() {
    return {
    }
  },
  props: {
    item: Object
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

.clearfix {
}
</style>
