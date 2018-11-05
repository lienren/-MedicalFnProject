<template>
  <div>
    <a-form>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户信息'>
        <a-select showSearch :value="selCustomer" placeholder="请输入客户姓名、手机号或身份证号" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @search="handleCusSearch" @change="handleCusChange" :notFoundContent="null">
          <a-select-option v-for="c in customers" :key="c.value">{{c.text}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户渠道'>
        <a-select labelInValue :defaultValue="selCustomerChannel" style="width: 120px" @change="handleCusChannelChange">
          <a-select-option value="新客户">新客户</a-select-option>
          <a-select-option value="老客户">老客户</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户来源'>
        <a-select labelInValue :defaultValue="selCustomerSource" style="width: 120px" @change="handleCusSourceChange">
          <a-select-option value="自有来源">自有来源</a-select-option>
          <a-select-option value="中介">中介</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-if="selCustomerSource.key==='中介'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='中介信息'>
        <a-select showSearch :value="selInterm" placeholder="请输入中介名称、联系人姓名或电话" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @search="handleIntermSearch" @change="handleIntermChange" :notFoundContent="null">
          <a-select-option v-for="i in interms" :key="i.value">{{i.text}}</a-select-option>
        </a-select>
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
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {
    handleCusSearch (value) {
      if (value) {
        this.cusFetch(value, data => {
          this.customers = data && data.length > 0 ? data : this.customers
        })
      }
    },
    handleCusChange (value) {
      this.selCustomer = value
      this.cusFetch(value, data => {
        this.customers = data && data.length > 0 ? data : this.customers
      })
    },
    cusFetch (value, callback) {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.currentCusValue = value
      let $this = this
      let userinfo = this.$utils.Store.get('userinfo')

      async function fake () {
        let result = await api.searchLoanuser({
          managerId: userinfo.id,
          userName: value,
          userPhone: value,
          userIdCard: value,
          isVerfiy: 1
        }, {
          load: false
        })

        if ($this.currentCusValue === value) {
          let data = []
          result.result.list.forEach((r) => {
            data.push({
              value: `${r.id}`,
              text: `${r.userName}-${r.userPhone}-${r.userSex}-${r.userIdCard}`,
              userName: r.userName,
              userPhone: r.userPhone,
              userSex: r.userSex,
              userIdCard: r.userIdCard
            })
          })
          callback(data)
        }
      }

      this.timeout = setTimeout(fake, 300)
    },
    handleCusChannelChange (value) {
      this.selCustomerChannel = value
    },
    handleCusSourceChange (value) {
      this.selCustomerSource = value
    },
    handleIntermSearch (value) {
      if (value) {
        this.intermFetch(value, data => {
          this.interms = data && data.length > 0 ? data : this.interms
        })
      }
    },
    handleIntermChange (value) {
      this.selInterm = value
      this.intermFetch(value, data => {
        this.interms = data && data.length > 0 ? data : this.interms
      })
    },
    intermFetch (value, callback) {
      if (this.timeout1) {
        clearTimeout(this.timeout1)
        this.timeout1 = null
      }
      this.currentIntermValue = value
      let $this = this
      let userinfo = this.$utils.Store.get('userinfo')

      async function fake () {
        let result = await api.searchIntermediary({
          managerId: userinfo.id,
          iName: value,
          iContact: value,
          iContactPhone: value,
          isVerfiy: 1
        }, {
          load: false
        })

        if ($this.currentIntermValue === value) {
          let data = []
          result.result.list.forEach((r) => {
            data.push({
              value: `${r.id}`,
              text: `${r.iName}-${r.iContact}-${r.iContactPhone}`,
              iName: r.iName,
              iContact: r.iContact,
              iContactPhone: r.iContactPhone
            })
          })
          callback(data)
        }
      }

      this.timeout1 = setTimeout(fake, 300)
    },
    clear () {
      this.currentCusValue = ''
      this.customers = []
      this.selCustomer = undefined
      this.interms = []
      this.selInterm = undefined
      this.currentIntermValue = ''
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

      let cusInfo = this.customers.filter(c => {
        return c.value === `${this.selCustomer}`
      })

      if (!cusInfo || cusInfo.length === 0) {
        this.$message.error('请选择客户信息!')
        return
      }

      let intermInfo = this.interms.filter(i => {
        return i.value === `${this.selInterm}`
      })

      if (this.selCustomerSource.key === '中介' && (!intermInfo || intermInfo.length === 0)) {
        this.$message.error('请选择中介信息!')
        return
      }

      if (this.loanTime.unix() > this.shouldReturnTime.unix()) {
        this.$message.error('还款时间应大于借款时间!')
        return
      }

      // 将还款时间处理成23:59:59秒的时间戳
      let shouldReturnTime = this.shouldReturnTime.format('x')
      shouldReturnTime = parseInt(shouldReturnTime / 1000)
      shouldReturnTime = (shouldReturnTime - (shouldReturnTime + 8 * 3600) % 86400 + 24 * 3600) * 1000 - 1

      let result = await api.addLoanorder({
        userId: parseInt(this.selCustomer),
        userName: cusInfo[0].userName,
        userSex: cusInfo[0].userSex,
        userPhone: cusInfo[0].userPhone,
        userIdCard: cusInfo[0].userIdCard,
        userChannel: this.selCustomerChannel.key,
        userSource: this.selCustomerSource.key,
        userSourceName: this.selCustomerSource.key === '中介' ? intermInfo[0].iName : '',
        userSourceUserName: this.selCustomerSource.key === '中介' ? intermInfo[0].iContact : '',
        userSourcePhone: this.selCustomerSource.key === '中介' ? intermInfo[0].iContactPhone : '',
        loanPrice: parseFloat(this.loanPrice) * 100,
        loanInterest: parseFloat(this.loanInterest) * 100,
        loanServicePrice: parseFloat(this.loanServicePrice) * 100,
        loanTime: this.loanTime.unix() * 1000,
        shouldReturnTime: shouldReturnTime,
        remark: this.remark,
        state: 1
      })

      if (result && result.code === '000000') {
        this.clear()
        this.$message.success('新增订单成功，正在审核!')
      }
    }
  }
}
</script>
