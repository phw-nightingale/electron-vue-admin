<template>
  <div class="app-container">
    <el-row style="margin-bottom: 10px;">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="学员姓名">
          <el-autocomplete
              class="inline-input"
              v-model="search.username"
              :fetch-suggestions="handleUserInput"
              placeholder="请输入学员姓名"
              :trigger-on-focus="false"
              @select="handleUserSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="课程标题">
          <el-autocomplete
              class="inline-input"
              v-model="search.title"
              :fetch-suggestions="handleTitleInput"
              placeholder="请输入标题"
              :trigger-on-focus="false"
              @select="handleTitleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
              v-model="search.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleTimePick">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="chart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Analysis',
  data() {
    return {
      chart: null,
      search: {},
      options: {
        title: {
          text: '学员成绩曲线图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
    }
  },
  methods: {
    initChart() {
      const _this = this
      _this.chart = _this.$echarts.init(document.getElementById('chart'))
      _this.chart.setOption(_this.options)
    },
    initOptions(params) {

    },
    handleUserInput(key) {
    },
    handleUserSelect() {
    },
    handleTitleInput(key) {
    },
    handleTitleSelect() {
    },
    handleTimePick(date) {
      console.log(date)
    },
    handleSearch() {
      console.log(this.search)
    }
  },
  created() {
  },
  mounted() {
    this.initChart()
  }
}
</script>

<style scoped>
#chart {
  width: 100%;
  height: 600px;
}
</style>
