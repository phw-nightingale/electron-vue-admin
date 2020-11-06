<template>
  <div class="container">
    <section style="margin-bottom: 10px;">
      <el-button type="primary" icon="el-icon-circle-plus">发课</el-button>
    </section>
    <device></device>
  </div>
</template>

<script>
import device from '../../components/Device'

export default {
  data() {
    return {}
  },
  components: {
    device
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 初始化设备列表
      // 初始化课程列表
      // 获取在线设备
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
