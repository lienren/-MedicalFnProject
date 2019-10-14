/*
 * @Author: Lienren
 * @Date: 2018-08-19 10:08:52
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-10-13 22:18:11
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
    path: '/yp',
    component: resolve => require(['../pages/layout/Layout'], resolve),
    children: [
      {
        path: '/attrs',
        name: '属性管理',
        component: view('yp/attrs'),
        meta: { title: '属性管理' }
      },
      {
        path: '/members',
        name: '会员管理',
        component: view('yp/members'),
        meta: { title: '会员管理' }
      },
      {
        path: '/bsusers',
        name: '业务人员管理',
        component: view('yp/bsusers'),
        meta: { title: '业务人员管理' }
      },
      {
        path: '/groups',
        name: '团建管理',
        component: view('yp/groups'),
        meta: { title: '团建管理' }
      },
      {
        path: '/activitys',
        name: '活动管理',
        component: view('yp/activitys'),
        meta: { title: '活动管理' }
      },
      {
        path: '/sites',
        name: '场地管理',
        component: view('yp/sites'),
        meta: { title: '场地管理' }
      },
      {
        path: '/orders',
        name: '需求订单管理',
        component: view('yp/orders'),
        meta: { title: '需求订单管理' }
      },
      {
        path: '/parentchild',
        name: '亲子汇管理',
        component: view('yp/parentchild'),
        meta: { title: '亲子汇管理' }
      },
      {
        path: '/case',
        name: '案例管理',
        component: view('yp/case'),
        meta: { title: '案例管理' }
      },
      {
        path: '/comms',
        name: '通用设置',
        component: view('yp/comms'),
        meta: { title: '通用设置' }
      },
      {
        path: '/touryes',
        name: '陶冶户外',
        component: view('yp/touryes'),
        meta: { title: '陶冶户外' }
      }
    ]
  }
]
