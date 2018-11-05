<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal title="订单详细" v-model="orderDetailVisible" @ok="closeOrderDetailDialog" okText="关闭" cancelText="取消">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='订单号'>{{orderDetail.orderSn}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户姓名'>{{orderDetail.userName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户电话'>{{orderDetail.userPhone}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户性别'>{{orderDetail.userSex}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户身份证'>{{orderDetail.userIdCard}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户渠道'>{{orderDetail.userChannel}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='客户来源'>{{orderDetail.userSource}}</a-form-item>
        <a-form-item v-if="orderDetail.userSource==='中介'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='中介名称'>{{orderDetail.userSourceName}}</a-form-item>
        <a-form-item v-if="orderDetail.userSource==='中介'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='中介联系人'>{{orderDetail.userSourceUserName}}</a-form-item>
        <a-form-item v-if="orderDetail.userSource==='中介'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='中介联系电话'>{{orderDetail.userSourcePhone}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='贷款金额'>{{orderDetail.loanPrice}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='贷款利息'>{{orderDetail.loanInterest}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='贷款本金'>{{orderDetail.loanServicePrice}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='贷款时间'>{{orderDetail.loanTime}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='还款时间'>{{orderDetail.shouldReturnTime}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='审核员'>{{orderDetail.managerName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='备注'>{{orderDetail.remark}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='订单状态'>{{orderDetail.stateName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终贷款金额'>{{orderDetail.lastloanPrice}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终贷款利息'>{{orderDetail.lastloanInterest}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终贷款本金'>{{orderDetail.lastloanServicePrice}}</a-form-item>
        <!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='展期总次数'>{{orderDetail.extCount}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='展期总金额'>{{orderDetail.extPrice}}</a-form-item>-->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终还款时间'>{{orderDetail.extReturnTime}}</a-form-item>
        <a-form-item v-if="orderDetail.state===3" :labelCol="labelCol" :wrapperCol="wrapperCol" label='实际还款金额'>{{orderDetail.realReturnPrice}}</a-form-item>
        <a-form-item v-if="orderDetail.state===3" :labelCol="labelCol" :wrapperCol="wrapperCol" label='实际还款时间'>{{orderDetail.realReturnTime}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终备注'>{{orderDetail.lastRemark}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='下单时间'>{{orderDetail.addTime}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='最后更新时间'>{{orderDetail.updateTime}}</a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="处理订单" v-model="handleOrderVisible" @ok="handleOrder" okText="确认无误" cancelText="取消">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='订单状态'>
          <a-select labelInValue :defaultValue="selOrderState" style="width: 120px" @change="handleOrderStateChange">
            <a-select-option value="3">已还款</a-select-option>
            <a-select-option value="5">需催收</a-select-option>
            <a-select-option value="2">展期</a-select-option>
          </a-select>
        </a-form-item>
        <!--<a-form-item v-if="selOrderState.key==='2'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='展期金额'>
          <a-input placeholder='请输入展期金额' v-model="extPrice" />
        </a-form-item>-->
        <a-form-item v-if="selOrderState.key==='2'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款时间'>
          <a-date-picker v-model="extLoanTime" placeholder="请选择借款日期" />
        </a-form-item>

        <a-form-item v-if="selOrderState.key==='2'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终还款时间'>
          <a-date-picker v-model="extReturnTime" placeholder="请选择还款日期" />
        </a-form-item>

        <a-form-item v-if="selOrderState.key==='2'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终贷款金额'>
          <a-input placeholder='请输入贷款金额' v-model="lastloanPrice" />
        </a-form-item>

        <a-form-item v-if="selOrderState.key==='2'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终贷款利息'>
          <a-input placeholder='请输入贷款利息' v-model="lastloanInterest" />
        </a-form-item>

        <a-form-item v-if="selOrderState.key==='2'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='最终本金'>
          <a-input placeholder='请输入本金' v-model="lastloanServicePrice" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='订单备注'>
          <a-input placeholder='请输入订单备注' v-model="remark" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="搜索条件" v-model="searchVisible" @ok="searchAction" :okText="searchConfirmText" cancelText="取消" :confirmLoading="searchConfirmLoading">
      <a-form>
        <a-row>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='添加时间'>
              <a-range-picker @change="onSearchTimeChange" format="YYYY-MM-DD" :placeholder="['开始时间', '结束时间']" />
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='到期时间'>
              <a-range-picker @change="onSearchOverTimeChange" format="YYYY-MM-DD" :placeholder="['开始时间', '结束时间']" />
            </a-form-item>
          </a-col>
          <a-col :span="12" style="display:block;">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 14}" label='订单号'>
              <a-input placeholder='请输入订单号' v-model="search.orderSn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12" style="display:block;">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 14}" label='客户姓名'>
              <a-input placeholder='请输入客户姓名' v-model="search.userName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12" style="display:block;">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 14}" label='客户手机号'>
              <a-input placeholder='请输入客户手机号' v-model="search.userPhone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12" style="display:block;">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 14}" label='客户身份证号'>
              <a-input placeholder='请输入客户身份证号' v-model="search.userIdCard"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='订单状态'>
              <a-select
                mode="multiple"
                placeholder="请选择订单状态"
                :defaultValue="search.state"
                @change="handleSelectOrderStateChange">
                <a-select-option value="1">待还款</a-select-option>
                <a-select-option value="2">展期</a-select-option>
                <a-select-option value="3">已还款</a-select-option>
                <a-select-option value="4">已逾期</a-select-option>
                <a-select-option value="5">需催收</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/credit'
import { iTable } from '../../components/'

export default {
  components: {
    iTable
  },
  data () {
    return {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
      wrapperButtonCol: {
        span: 14, offset: 4
      },
      columns: [],
      data: [],
      pagination: {},
      buttons: [],
      actionButtons: [],
      orderDetailVisible: false,
      orderDetail: {},
      handleOrderVisible: false,
      selOrderState: { key: '3', label: '已还款' },
      extPrice: '',
      extLoanTime: undefined,
      extReturnTime: undefined,
      lastloanPrice: '',
      lastloanInterest: '',
      lastloanServicePrice: '',
      remark: '',
      searchVisible: false,
      searchConfirmText: '搜索',
      searchConfirmLoading: false,
      search: {
        stime: 0,
        etime: 0,
        orderSn: '',
        userName: '',
        userPhone: '',
        userIdCard: '',
        returnSTime: 0,
        returnETime: 0,
        state: ['1', '2', '4', '5']
      }
    }
  },
  computed: {
    tableHeight () {
      return this.$utils.Common.getWidthHeight().height - 188
    }
  },
  created () {
    this.search = {
      ...this.search,
      ...this.$route.query
    }
  },
  beforeDestroy () { },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      // 列头
      this.columns = [{
        title: '订单号',
        dataIndex: 'orderSn',
        width: 120
      }, {
        title: '客户信息',
        dataIndex: 'userNamePhone',
        width: 120
      }, {
        title: '订单状态',
        dataIndex: 'stateName',
        width: 80
      }, {
        title: '贷款金额',
        dataIndex: 'lastloanPrice',
        width: 80
      }, {
        title: '贷款利息',
        dataIndex: 'lastloanInterest',
        width: 80
      }, {
        title: '本金',
        dataIndex: 'lastloanServicePrice',
        width: 80
      }, {
        title: '渠道来源',
        dataIndex: 'userChannelSource',
        width: 100
      }, {
        title: '添加时间',
        dataIndex: 'addTime',
        width: 150
      }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
        width: 150
      }]
      // 功能按钮
      this.buttons = [
        {
          model: 'button',
          type: 'primary',
          icon: 'search',
          text: '搜索',
          click: (e) => {
            this.searchVisible = true
          }
        },
        {
          model: 'button',
          icon: 'reload',
          text: '刷新',
          click: () => {
            this.fetch({
              ...this.pagination,
              ...this.search
            })
          }
        }
      ]
      // 操作按钮
      this.actionButtons = [{
        model: 'button',
        text: '详细',
        style: {},
        icon: '',
        click: async (e) => {
          this.orderDetailVisible = true
          this.orderDetail = e
        }
      }, {
        model: 'button',
        text: '处理',
        style: {},
        icon: '',
        click: async (e) => {
          if (e.state === 3) {
            this.$message.error('订单已还款，无法处理!')
            return
          }
          this.handleOrderVisible = true
          this.orderDetail = e
          this.lastloanPrice = e.lastloanPrice
          this.lastloanInterest = e.lastloanInterest
          this.lastloanServicePrice = e.lastloanServicePrice
        }
      }, {
        model: 'button',
        text: '修改',
        style: {},
        icon: '',
        click: async (e) => {
          if (e.isVerfiy === 1) {
            this.$message.error('订单审核已通过，无法修改!')
            return
          }
          if (e.state === 3) {
            this.$message.error('订单已还款，无法处理!')
            return
          }
          this.$router.push({ path: '/editorder', query: {id: e.id} })
        }
      }]
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    searchInit () {
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      this.search = {
        stime: 0,
        etime: 0,
        orderSn: '',
        userName: '',
        userPhone: '',
        userIdCard: '',
        returnSTime: 0,
        returnETime: 0,
        state: []
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async fetch (param = {}) {
      let userinfo = this.$utils.Store.get('userinfo')
      let result = await api.getLoanorder({
        ...param,
        managerId: userinfo.id,
        isVerfiy: [1, 2]
      })
      this.searchVisible = false
      this.searchConfirmText = '搜索'
      this.searchConfirmLoading = false
      this.data = []
      if (result) {
        result = result.result
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            ...item,
            stateName: item.isVerfiy === 1 ? item.state === 2 ? `${item.stateName}${item.extCount}` : item.stateName : '审核不通过',
            loanPrice: item.loanPrice / 100,
            loanInterest: item.loanInterest / 100,
            loanServicePrice: item.loanServicePrice / 100,
            extPrice: item.extPrice ? item.extPrice / 100 : 0,
            extReturnTime: item.extReturnTime ? this.$utils.Date.format(item.extReturnTime, 'yyyy-MM-dd hh:mm:ss') : 0,
            realReturnPrice: item.realReturnPrice ? item.realReturnPrice / 100 : 0,
            realReturnTime: item.realReturnTime ? this.$utils.Date.format(item.realReturnTime, 'yyyy-MM-dd hh:mm:ss') : 0,
            lastloanPrice: item.lastloanPrice / 100,
            lastloanInterest: item.lastloanInterest / 100,
            lastloanServicePrice: item.lastloanServicePrice / 100,
            userNamePhone: `${item.userName}-${item.userPhone}`,
            // userChannelSource: `${item.userChannel}-${item.userSource}`,
            userChannelSource: `${item.userChannel}`,
            addTime: this.$utils.Date.format(item.addTime, 'yyyy-MM-dd hh:mm:ss'),
            loanTime: this.$utils.Date.format(item.loanTime, 'yyyy-MM-dd hh:mm:ss'),
            updateTime: this.$utils.Date.format(item.updateTime, 'yyyy-MM-dd hh:mm:ss'),
            shouldReturnTime: this.$utils.Date.format(item.shouldReturnTime, 'yyyy-MM-dd hh:mm:ss'),
            verfiyStateName: item.isVerfiy === 1 ? '审核通过' : (item.isVerfiy === 0 ? '审核中' : '审核不通过')
          })
        })
        this.pagination = {
          current: result.current,
          pageSize: result.pageSize,
          total: result.total
        }
      }
    },
    handleTableChange (val) {
      this.pagination = val.pagination
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    closeOrderDetailDialog () {
      this.orderDetailVisible = false
    },
    handleOrderStateChange (value) {
      this.selOrderState = value
    },
    async handleOrder () {
      if (this.selOrderState.key === '2') {
        // 展期
        if (!this.extLoanTime) {
          this.$message.error('请输入借款时间!')
          return
        }
        if (!this.extReturnTime) {
          this.$message.error('请输入最终还款时间!')
          return
        }
        if (!this.lastloanPrice) {
          this.$message.error('请输入最终贷款金额!')
          return
        }
        if (!this.lastloanInterest) {
          this.$message.error('请输入最终贷款利息!')
          return
        }
        if (!this.lastloanServicePrice) {
          this.$message.error('请输入最终本金!')
          return
        }
      }
      let result = await api.addLoanorderState({
        id: this.orderDetail.id,
        state: parseInt(this.selOrderState.key),
        loanPrice: parseFloat(this.lastloanPrice) * 100,
        loanInterest: parseFloat(this.lastloanInterest) * 100,
        loanServicePrice: parseFloat(this.lastloanServicePrice) * 100,
        extPrice: this.extPrice ? parseFloat(this.extPrice) * 100 : 0,
        extLoanTime: this.extLoanTime ? this.extLoanTime.unix() * 1000 : 0,
        extReturnTime: this.extReturnTime ? this.extReturnTime.unix() * 1000 : 0,
        remark: this.remark
      })

      if (result && result.code === '000000') {
        this.handleOrderVisible = false
        this.extPrice = ''
        this.extLoanTime = undefined
        this.extReturnTime = undefined
        this.lastloanPrice = ''
        this.lastloanInterest = ''
        this.lastloanServicePrice = ''
        this.remark = ''

        this.$message.success('订单处理成功!')
        this.fetch({
          ...this.pagination,
          ...this.search
        })
      }
    },
    onSearchTimeChange (date, dateString) {
      if (date.length === 0) {
        this.search.stime = 0
        this.search.etime = 0
        return
      }
      this.search.stime = date[0].format('x')
      this.search.etime = date[1].format('x')

      this.search.stime = parseInt(this.search.stime / 1000)
      this.search.etime = parseInt(this.search.etime / 1000)
      this.search.stime = (this.search.stime - (this.search.stime + 8 * 3600) % 86400) * 1000
      this.search.etime = (this.search.etime - (this.search.etime + 8 * 3600) % 86400 + 24 * 3600) * 1000 - 1
    },
    onSearchOverTimeChange (date, dateString) {
      if (date.length === 0) {
        this.search.returnSTime = 0
        this.search.returnETime = 0
        return
      }
      this.search.returnSTime = date[0].format('x')
      this.search.returnETime = date[1].format('x')

      this.search.returnSTime = parseInt(this.search.returnSTime / 1000)
      this.search.returnETime = parseInt(this.search.returnETime / 1000)
      this.search.returnSTime = (this.search.returnSTime - (this.search.returnSTime + 8 * 3600) % 86400) * 1000
      this.search.returnETime = (this.search.returnETime - (this.search.returnETime + 8 * 3600) % 86400 + 24 * 3600) * 1000 - 1
    },
    handleSelectOrderStateChange (value) {
      this.search.state = value
    },
    async searchAction () {
      this.searchConfirmLoading = true
      this.searchConfirmText = '搜索中...'
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    }
  }
}
</script>
<style>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
