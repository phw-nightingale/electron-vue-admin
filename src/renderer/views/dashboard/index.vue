<template>
  <div class="dashboard-container">
    <div id="lesson-table" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getScoreLine } from '../../api/history'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      lessonTableOption: {
        title: {
          text: '本月训练情况图'
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
          data: ['第一周', '第二周', '第三周', '第四周']
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
            data: ['第一次', '第二次', '第三次', '第四次', '第五次', '第六次', '第七次']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '第一周',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      },
      lessonCharts: {}
    }
  },
  mounted() {
    this.initCharts()
  },
  created() {
    const _this = this
    const params = _this.$route.query
    console.log(params)
    if (typeof params.userId !== 'undefined') {
      getScoreLine(params.userId).then(response => {
        const data = response.data
        const legend = [].push(data.student.username)
        const xAxisData = {
          type: 'category',
          boundaryGap: false,
          data: []
        }
        for (let i = 0; i < data.scores.length; i++) {
          xAxisData.data.push('第' + (i + 1) + '次')
        }
        const xAxis = []
        xAxis.push(xAxisData)

        const series = []
        const serie = {
          name: '第一周',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        }
        const title = data.student.username + '训练情况图'

        serie.data = data.scores
        series.push(serie)
        _this.lessonTableOption.legend.data = legend
        _this.lessonTableOption.xAxis = xAxis
        _this.lessonTableOption.series = series
        _this.lessonTableOption.title.text = title
        _this.lessonCharts.setOption(_this.lessonTableOption)
      })
    }
  },
  methods: {
    initCharts() {
      const _this = this
      _this.lessonCharts = _this.$echarts.init(document.getElementById('lesson-teacher'))
      _this.lessonCharts.setOption(_this.lessonTableOption)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    padding: 10px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
