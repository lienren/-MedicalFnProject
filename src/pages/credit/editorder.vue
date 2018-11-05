<template>
  <div>
    <a-form v-if="isShowContent">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户信息'>
        {{orderDetail.userName}}-{{orderDetail.userPhone}}-{{orderDetail.userSex}}-{{orderDetail.userIdCard}}
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户渠道'>
        {{orderDetail.userChannel}}
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户来源'>
        {{orderDetail.userSource}}
      </a-form-item>

      <a-form-item v-if="orderDetail.userSource==='中介'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='中介信息'>
        {{orderDetail.userSourceName}}-{{orderDetail.userSourceUserName}}-{{orderDetail.userSourcePhone}}
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='贷款金额'>
        <a-input placeholder='请输入贷款金额' style="width:30%;" v-model="loanPrice" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='贷款利息'>
        <a-input placeholder='请输入贷款利息' style="width:30%;" v-model="loanInterest" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='本金'>
        <a-input placeholder='请输入本金' style="width:30%;" v-model="loanServicePrice" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款日期'>
        <a-date-picker v-model="loanTime" placeholder="请选择借款日期" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='还款日期'>
        <a-date-picker v-model="shouldReturnTime" placeholder="请选择还款日期" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='订单备注'>
        <a-input placeholder='请输入订单备注' v-model="remark" />
      </a-form-item>

      <a-form-item :wrapperCol="wrapperButtonCol">
        <a-button-group>
          <a-button @click="clear">清空</a-button>
          <a-button type='primary' @click="sumbitOrder">确认保存</a-button>
        </a-button-group>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import api from '../../api/credit'
// eslint-disable-next-line
import moment from 'moment'

export default {
  components: {},
  data () {
    return {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 }
      },
      wrapperUEditCol: {
        span: 14,
        offset: 4
      },
      wrapperButtonCol: {
        xs: { span: 14, offset: 4 },
        sm: { span: 14, offset: 4 }
      },
      orderDetail: {},
      isShowContent: false,
      timeout: null,
      timeout1: null,
      currentCusValue: '',
      customers: [],
      selCustomer: undefined,
      selCustomerChannel: { key: '新客户', label: '新客户' },
      selCustomerSource: { key: '自有渠道', label: '自有渠道' },
      interms: [],
      selInterm: undefined,
      currentIntermValue: '',
      loanPrice: '',
      loanInterest: '',
      loanServicePrice: '',
      loanTime: undefined,
      shouldReturnTime: undefined,
      remark: ''
    }
  },
  computed: {},
  created () {
    let id = this.$route.query.id
    if (id && id > 0) {
      this.loadOrder(parseInt(id))
    }
  },
  beforeDestroy () { },
  mounted () { },
  methods: {
    async loadOrder (id) {
      let result = await api.getLoanorderdetail({orderid: id})
      if (result) {
        this.orderDetail = result.result[0]
        this.isShowContent = true

        this.selCustomer = this.orderDetail.userId
        this.selCustomerChannel = { key: this.orderDetail.userChannel, label: this.orderDetail.userChannel }
        this.selCustomerSource = { key: this.orderDetail.userSource, label: this.orderDetail.userSource }
        this.loanPrice = this.orderDetail.lastloanPrice / 100
        this.loanInterest = this.orderDetail.lastloanInterest / 100
        this.loanServicePrice = this.orderDetail.lastloanServicePrice / 100
        this.loanTime = moment.unix(this.orderDetail.loanTime / 1000)
        this.shouldReturnTime = moment.unix(this.orderDetail.extReturnTime / 1000)
        this.remark = this.orderDetail.lastRemark
        console.log('this.orderDetail:', this.orderDetail)
      }
    },
    clear () {
      this.loanPrice = ''
      this.loanInterest = ''
      this.loanServicePrice = ''
      this.loanTime = undefined
      this.shouldReturnTime = undefined
      this.remark = ''
    },
    async sumbitOrder () {
      if (!this.selCustomer) {
        this.$message.error('请选择客户信息!')
        return
      }
      if (!this.loanTime) {
        this.$message.error('请选择借款日期!')
        return
      }
      if (!this.shouldReturnTime) {
        this.$message.error('请选择还款日期!')
        return
      }

      if (this.loanTime.unix() > this.shouldReturnTime.unix()) {
        this.$message.error('还款时间应大于借款时间!')
        return
      }

      let result = await api.editLoanOrder({
        id: this.orderDetail.id,
        loanPrice: parseFloat(this.loanPrice) * 100,
        loanInterest: parseFloat(this.loanInterest) * 100,
        loanServicePrice: parseFloat(this.loanServicePrice) * 100,
        loanTime: this.loanTime.unix() * 1000,
        shouldReturnTime: this.shouldReturnTime.unix() * 1000,
        remark: this.remark
      })

      if (result && result.code === '000000') {
        // this.clear()
        this.$message.success('订单修改成功，正在审核!')
      }
    }
  }
}
</script>
