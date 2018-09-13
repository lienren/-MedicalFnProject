<template>
  <a-layout-header class="layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in crumbs" :key="index">{{item.name}}</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="layout-header-right">
      <a-icon title="修改密码" type="key" class="layout-setpassword" @click="clickSetPassword" />
      <a-badge dot :count="badgeNumber" class="layout-notification">
        <a-icon title="消息中心" type="bell" @click="clickBell" />
      </a-badge>
      <a-icon title="安全退出" type="logout" class="layout-logout" @click="clickLogout" />
      <div title="基本信息" class="layout-headimg" @click="clickHeaderImg">
        <a-avatar class="layout-headimg-avatar" icon="user" size="small"></a-avatar>
      </div>
    </a-layout>
  </a-layout-header>
</template>

<script>

export default {
  props: {
    crumbs: {
      type: Array
    },
    badgeNumber: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {
    clickBell () {
      this.$emit('on-clickbell')
    },
    clickSetPassword () {
      this.$emit('on-clicksetpassword')
    },
    clickHeaderImg () {
      this.$emit('on-clickhead')
    },
    clickLogout () {
      this.$emit('on-clicklogout')
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .layout-header {
    position: relative;
    height: 40px;
    padding: 0;
    background: none;
    div {
      line-height: 40px;
    }
    .layout-header-right {
      height: 24px;
      line-height: 24px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -12px;
    }
    .layout-setpassword {
      width: 18px;
      height: 18px;
      font-size: 18px;
      line-height: 18px;
      position: absolute;
      right: 105px;
      top: 50%;
      margin-top: -9px;
      color: #666;
      cursor: pointer;
    }
    .layout-notification {
      width: 18px;
      height: 18px;
      font-size: 18px;
      line-height: 18px;
      position: absolute;
      right: 72px;
      top: 50%;
      margin-top: -9px;
      color: #666;
      cursor: pointer;
    }
    .layout-logout {
      width: 18px;
      height: 18px;
      font-size: 18px;
      line-height: 18px;
      position: absolute;
      right: 39px;
      top: 50%;
      margin-top: -9px;
      color: #666;
      cursor: pointer;
    }
    .layout-headimg {
      padding: 0;
      cursor: pointer;
      width: 24px;
      height: 24px;
      line-height: 24px;
      .layout-headimg-avatar {
        color: #fff;
        background-color: #1890ff;
      }
    }
  }
</style>
