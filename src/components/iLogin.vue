<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div style="padding-top:20px;">
        <a-form>
          <a-form-item v-if="!loginButtonLoading">
            <a-input placeholder="请填写登录帐号" size="large" v-model="loginName">
              <a-icon slot="prefix" type="idcard" />
              <a-icon v-if="loginName" slot="suffix" type="close-circle" @click="loginName=''" />
            </a-input>
          </a-form-item>
          <a-form-item v-if="!loginButtonLoading">
            <a-input placeholder="请填写登录密码" size="large" v-model="loginPwd" type="password">
              <a-icon slot="prefix" type="key" />
              <a-icon v-if="loginPwd" slot="suffix" type="close-circle" @click="loginPwd=''" />
            </a-input>
          </a-form-item>
          <a-form-item v-if="!loginButtonLoading">
            <a-input-group compact>
              <a-input style="width:65%" placeholder="请填写右侧图文验证码" size="large" v-model="imgCode">
                <a-icon slot="prefix" type="picture" />
                <a-icon v-if="imgCode" slot="suffix" type="close-circle" @click="imgCode=''" />
              </a-input>
              <a-button style="width:35%;" size="large" @click="getImage">
                <img :src="imgCodeSrc" alt="">
              </a-button>
            </a-input-group>
          </a-form-item>
          <a-form-item>
            <a-button :type="loginButtonType" size="large" style="width:100%;" @click="login" :loading="loginButtonLoading">{{loginButtonText}}</a-button>
          </a-form-item>
          <a-form-item>
            <p class="text-tip">PRESENTED BY LI.R&D TEAM 2018-2020.</p>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>

import api from '../api/manage'

// region private methods
function guid () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4()
}

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

export default {
  components: {},
  data () {
    return {
      loginName: '',
      loginPwd: '',
      imgCode: '',
      loginButtonLoading: false,
      loginButtonText: '登 录',
      loginButtonType: 'primary',
      imgCodeToken: '',
      imgCodeSrc: ''
    }
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      this.getImage()
    },
    async getImage () {
      this.imgCodeToken = guid()
      let result = await api.getImageCode({ token: this.imgCodeToken })
      this.imgCodeSrc = result.result.imgbase64
    },
    async login () {
      if (this.loginName === '') {
        this.$message.error('请填写帐号信息！')
        return
      }

      if (this.loginPwd === '') {
        this.$message.error('请填写密码！')
        return
      }

      if (this.imgCode === '') {
        this.$message.error('请填写图文验证码！')
        return
      }

      if (this.imgCodeToken === '') {
        this.$message.error('请先获取图文验证码！')
        return
      }

      this.loginButtonLoading = true
      this.loginButtonText = '登录权限验证中，请稍后'

      let result = await api.login({
        loginName: this.loginName,
        loginPwd: this.loginPwd,
        imgCode: this.imgCode,
        imgCodeToken: this.imgCodeToken
      }, {
        defFail: false
      })

      if (result.code === '000000') {
        this.$utils.Store.set('userinfo', {
          ...result.result
        })

        // 路由跳转
        this.$router.push({ path: '/dashboard' })
      } else {
        this.loginButtonLoading = false
        this.loginButtonText = `${result.message}请重新填写后再试一次`
        this.loginButtonType = 'danger'
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .login-wrap {
    .ms-login {
      position: relative;
      width: 380px;
      padding: 10px 20px 0;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1001;

      .ant-form-item {
        margin-bottom: 12px;

        .text-tip {
          color: #f1f1f1;
          text-align: center;
          font-size: 12px;
          padding: 0;
          margin: 0;
        }

        &:last-child {
          margin-bottom: 0 !important;
        }
      }
    }
  }
</style>
