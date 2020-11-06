<template>
  <el-menu class="navbar cus-nav" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <el-dropdown class="avatar-container" style="-webkit-app-region: no-drag;" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">注销</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="refresh" style="display:block;">刷新</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <breadcrumb></breadcrumb>
    <div class="options" style="-webkit-app-region: no-drag;">
      <el-button class="options-btn" type="success" size="mini" circle @click="onIpcClick('min')"></el-button>
      <el-button class="options-btn" type="warning" size="mini" circle @click="onIpcClick('resize')"></el-button>
      <el-button class="options-btn" type="danger" size="mini"  circle @click="onIpcClick('close')"></el-button>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { ipcRenderer } from 'electron'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    refresh() {
      location.reload()
    },
    onIpcClick(type) {
      ipcRenderer.send(type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cus-nav {
  background-color: #304156;
}

.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;


  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    //position: absolute;
    //right: 80px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 0;
      position: relative;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-top: 5px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 0;
        font-size: 12px;
      }
    }
  }
}

.options {
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 10px;
  top: 10px;

  &-btn {
    padding: 5px;
  }
}
</style>

