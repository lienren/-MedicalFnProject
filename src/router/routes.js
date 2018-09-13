/*
 * @Author: Lienren
 * @Date: 2018-08-19 10:08:52
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-09-08 10:48:52
 */
'use strict'

/* eslint-disable no-undef */
// 生产/测试环境，使用路由懒加载
const view =
  process.env.NODE_ENV === 'development'
    ? file => require(`@/pages/${file}.vue`).default
    : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/', component: view('Login') },
  { path: '/login', component: view('Login') },
  {
    path: '/main',
    component: resolve => require(['../pages/layout/Layout'], resolve),
    children: [
      {
        path: '/DashBoard',
        name: '首页',
        component: view('DashBoard'),
        meta: { title: '首页' }
      },
      {
        path: '/list',
        name: '列表功能',
        component: view('demo/list'),
        meta: { title: '列表功能' }
      },
      {
        path: '/create',
        name: '新增功能',
        component: view('demo/create'),
        meta: { title: '新增功能' }
      }
    ]
  },
  {
    path: '/manage',
    component: resolve => require(['../pages/layout/Layout'], resolve),
    children: [
      {
        path: '/managelist',
        name: '管理员管理',
        component: view('manage/ManageList'),
        meta: { title: '管理员管理' }
      },
      {
        path: '/rolelist',
        name: '角色管理',
        component: view('manage/RoleList'),
        meta: { title: '角色管理' }
      },
      {
        path: '/menulist',
        name: '菜单管理',
        component: view('manage/MenuList'),
        meta: { title: '菜单管理' }
      },
      {
        path: '/logs',
        name: '日志查看',
        component: view('manage/Logs'),
        meta: { title: '日志查看' }
      },
      {
        path: '/setpassword',
        name: '修改个人密码',
        component: view('manage/SetPassword'),
        meta: { title: '修改个人密码' }
      }
    ]
  },
  {
    path: '/bs',
    component: resolve => require(['../pages/layout/Layout'], resolve),
    children: [
      {
        path: '/webabout',
        name: '关于我们',
        component: view('website/About'),
        meta: { title: '关于我们' }
      },
      {
        path: '/deps',
        name: '科室管理',
        component: view('bs/deps'),
        meta: { title: '科室管理' }
      },
      {
        path: '/cls',
        name: '诊所管理',
        component: view('bs/cls'),
        meta: { title: '诊所管理' }
      },
      {
        path: '/doctor',
        name: '医师管理',
        component: view('bs/doctor'),
        meta: { title: '医师管理' }
      }
    ]
  }
]
