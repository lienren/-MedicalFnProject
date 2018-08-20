<template>
  <div>
    <a-form>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='用户信息'>
        <h3>{{userinfo.loginName}} / {{userinfo.realName}}</h3>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='原密码'>
        <a-input placeholder='请输入原始密码' v-model="oldPassword" type="password">
        </a-input>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='新密码'>
        <a-input placeholder='请输入新的密码' v-model="newPassword" type="password">
        </a-input>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='再输一次'>
        <a-input placeholder='请再输入一次新的密码' v-model="newPassword1" type="password">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="wrapperButtonCol">
        <a-row>
          <a-col :span="4">
            <a-button icon="to-top" @click="clear">清空</a-button>
          </a-col>
          <a-col :span="4">
            <a-button icon="save" type="primary" @click="setPassword">确认保存</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import api from '../../api/manage'

export default {
  components: {},
  data () {
    return {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 }
      },
      wrapperButtonCol: {
        xs: { span: 14, offset: 2 },
        sm: { span: 14, offset: 2 }
      },
      userinfo: {},
      oldPassword: '',
      newPassword: '',
      newPassword1: ''
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
      this.userinfo = this.$utils.Store.get('userinfo')
    },
    clear () {
      this.oldPassword = ''
      this.newPassword = ''
      this.newPassword1 = ''
    },
    async setPassword () {
      if (this.oldPassword === '') {
        this.$message.error('请填写原始密码！')
        return
      }
      if (this.newPassword === '') {
        this.$message.error('请填写新密码！')
        return
      }
      if (this.newPassword !== this.newPassword1) {
        this.$message.error('两次输入新密码不一致！')
        return
      }

      let result = await api.setPassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })

      if (result && result.code === '000000') {
        this.$message.success('密码修改成功，请重新登录！')

        // 清除登录状态
        this.$utils.Store.clear('userinfo')
        // 路由跳转
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
