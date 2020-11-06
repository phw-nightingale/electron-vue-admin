import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页' },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/teach',
    name: 'Example',
    meta: { title: '账户管理', icon: 'Home' },
    children: [
      {
        path: 'teach',
        name: 'Teach',
        component: () => import('@/views/teacher/index'),
        meta: { title: '教员信息', icon: 'Profile' }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/student/index'),
        meta: { title: '学员信息', icon: 'Profile' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/device/index'),
        meta: { title: '设备管理', icon: 'Game' }
      }
    ]
  },

  {
    path: '/fault',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Fault',
        component: () => import('@/views/fault/index'),
        meta: { title: '故障清单', icon: 'Setting' }
      }
    ]
  },

  {
    path: '/lesson',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Lesson',
        component: () => import('@/views/lesson/index'),
        meta: { title: '课程设置', icon: 'Document' }
      }
    ]
  },

  {
    path: '/history',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'History',
        component: () => import('@/views/history/index'),
        meta: { title: '训练记录', icon: 'Calendar' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

