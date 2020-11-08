<template>
  <div class="dashboard-container" :style="size">
    <svg-icon class="dashboard-svg" icon-class="Dashboard"></svg-icon>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'dashboard',
  components: {
    SvgIcon
  },
  data() {
    return {
      size: ''
    }
  },
  methods: {
    setDashboardSize() {
      this.size = 'height: ' + (document.documentElement.clientHeight - 120) + 'px;' + 'width: ' + (document.documentElement.clientWidth - 240) + 'px;'
    }
  },
  created() {
    this.setDashboardSize()
    window.addEventListener('resize', this.setDashboardSize)
  },
  destroyed() {
    window.removeEventListener('resize', this.setDashboardSize)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }

  &-svg {
    font-size: 400px;
    margin-bottom: -50px;
  }
}
</style>
