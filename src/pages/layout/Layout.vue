<template>
  <a-layout class="layout-main">
    <sidebar :menus="menus" :logoName="logoName" :shortLogoName="shortLogoName" :version="version" :collapsed.sync="collapsed" @on-init="menuInit" @on-logout="logout" @on-collapse="menuCollapse" @on-select="menuSelect"></sidebar>
    <a-layout :style="{ padding:'0 16px', height: '100%', overflow: 'hidden' }">
      <app-header :crumbs="crumbs" :selectMenuKey.sync="selectMenuKey" :badgeNumber="badgeNumber" @on-clickbell="clickBell" @on-clickhead="clickHead" @on-clicksetpassword="setPassword" @on-clicklogout="logout"></app-header>
      <a-layout-content :style="{ height: mainHeight }">
        <app-main></app-main>
      </a-layout-content>
      <app-footer></app-footer>
    </a-layout>
    <app-card :show.sync="cardIsShow"></app-card>
  </a-layout>
</template>

<script>
import { Sidebar, AppHeader, AppMain, AppFooter, AppCard } from './'

export default {
  name: 'layout',
  data () {
    return {
      logoName: '橙汇玩管理平台',
      shortLogoName: '平台',
      version: 'Vers1.2.8',
      collapsed: false,
      menus: [],
      selectMenuKey: '',
      crumbs: [],
      badgeNumber: 0,
      cardIsShow: false,
      spinning: true
    }
  },
  components: {
    Sidebar,
    AppHeader,
    AppMain,
    AppFooter,
    AppCard
  },
  watch: {
    selectMenuKey (val) {
      // console.log('val:', val)
    }
  },
  computed: {
    mainHeight () {
      // header height:40
      // bodyer padding:16
      // footer height:30
      return this.$utils.Common.getWidthHeight().height - 40 - 16 - 30 + 'px'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let userinfo = this.$utils.Store.get('userinfo')
      let menuinfos = this.$utils.Store.get('menuinfos')

      if (userinfo === null || userinfo === undefined || userinfo === {}) {
        // 未登录状态下，进入登录页面
        this.$router.push({ path: '/login' })
      }
      // 设置菜单
      this.menus = menuinfos
    },
    logout () {
      let $this = this
      this.$confirm({
        title: '提示',
        content: '您正在关闭系统，确认是否正常退出？',
        okText: '正常退出',
        cancelText: '取消',
        onOk () {
          // 清除登录状态
          $this.$utils.Store.clear('userinfo')
          // 路由跳转
          $this.$router.push({ path: '/login' })
        },
        onCancel () {
          console.log('cancel!')
        }
      })
    },
    menuInit (data) {
      // 设置面包屑名称
      this.setCrumbs(data.defaultSelectedKeys && data.defaultSelectedKeys.length > 0 ? data.defaultSelectedKeys[0] : '')
    },
    menuCollapse (collapsed) {
      if (collapsed) {
        // 已收缩
      } else {
        // 已展开
      }
    },
    menuSelect (selectItem) {
      // 设置面包屑名称
      this.setCrumbs(selectItem.key)
      // 路由跳转
      this.$router.push({ path: selectItem.key })
    },
    setCrumbs (keyName) {
      // 查找已选择父级和子级菜单名称
      this.crumbs = []

      if (keyName !== '') {
        this.menus.forEach((menu) => {
          if (menu.id === keyName) {
            this.crumbs.push({
              name: menu.name
            })
          }

          if (this.crumbs.length === 0 && menu.children && menu.children.length > 0) {
            menu.children.forEach((child) => {
              if (child.id === keyName) {
                this.crumbs.push({
                  name: menu.name
                })
                this.crumbs.push({
                  name: child.name
                })
              }
            })
          }
        })
      }
    },
    clickBell () {
      this.$message.success('点击了消息中心！')
    },
    clickHead () {
      // this.$message.success('点击了头像！')
    },
    setPassword () {
      this.crumbs = [{ name: '系统管理' }, { name: '修改密码' }]
      this.$router.push({ path: '/setpassword' })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .layout-main {
    position: relative;
    height: 100%;
  }
</style>
