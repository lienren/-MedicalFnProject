<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal title="订单详细" v-model="orderDetailVisible" @ok="closeOrderDetailDialog" okText="关闭" cancelText="取消">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='单据号'>{{orderDetail.loanSn}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='单据类型'>{{orderDetail.loanTypeName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款人姓名'>{{orderDetail.loanUserRealName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款人电话'>{{orderDetail.loanUserPhone}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款人身份证'>{{orderDetail.loanUserIdCard}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='放款人姓名'>{{orderDetail.masterUserRealName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='放款人电话'>{{orderDetail.masterUserPhone}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='放款人身份证'>{{orderDetail.masterUserIdCard}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款金额'>{{orderDetail.loanMoney}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款时间'>{{orderDetail.loanTime}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='还款时间'>{{orderDetail.repayTime}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='年化利率'>{{orderDetail.rate}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='借款用途'>{{orderDetail.loanUseName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='单据状态'>{{orderDetail.stateName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='服务费'>{{orderDetail.serviceMoney}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='支付渠道'>{{orderDetail.payMentTypeName}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='支付状态'>{{orderDetail.isPay}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='支付时间'>{{orderDetail.payTime}}</a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='备注'>{{orderDetail.remark}}</a-form-item>
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
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='单据号'>
              <a-input placeholder='请输入单据号' v-model="search.loanSn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='借款人姓名'>
              <a-input placeholder='请输入借款人姓名' v-model="search.loanUserRealName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='借款人手机号'>
              <a-input placeholder='请输入借款人手机号' v-model="search.loanUserPhone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='借款人身份证'>
              <a-input placeholder='请输入借款人身份证号' v-model="search.loanUserIdCard"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='放款人姓名'>
              <a-input placeholder='请输入放款人姓名' v-model="search.masterUserRealName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='放款人手机号'>
              <a-input placeholder='请输入放款人手机号' v-model="search.masterUserPhone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='放款人身份证'>
              <a-input placeholder='请输入放款人身份证号' v-model="search.masterUserIdCard"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='单据状态'>
              <a-select mode="multiple" placeholder="请选择单据状态" :defaultValue="search.state" @change="handleSelectOrderStateChange">
                <a-select-option value="1">待付款</a-select-option>
                <a-select-option value="2">待确认</a-select-option>
                <a-select-option value="3">已生效</a-select-option>
                <a-select-option value="4">已还款</a-select-option>
                <a-select-option value="5">已完成</a-select-option>
                <a-select-option value="999">已删除</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/proof'
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
      searchVisible: false,
      searchConfirmText: '搜索',
      searchConfirmLoading: false,
      search: {
        stime: 0,
        etime: 0,
        loanSn: '',
        loanUserRealName: '',
        loanUserPhone: '',
        loanUserIdCard: '',
        masterUserRealName: '',
        masterUserPhone: '',
        masterUserIdCard: '',
        state: []
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
        title: '单据号',
        dataIndex: 'loanSn',
        width: 130
      }, {
        title: '借款人',
        dataIndex: 'loanUserRealName',
        width: 100
      }, {
        title: '放款人',
        dataIndex: 'masterUserRealName',
        width: 100
      }, {
        title: '状态',
        dataIndex: 'stateName',
        width: 80
      }, {
        title: '贷款金额',
        dataIndex: 'loanMoney',
        width: 80
      }, {
        title: '服务费',
        dataIndex: 'serviceMoney',
        width: 80
      }, {
        title: '支付',
        dataIndex: 'isPay',
        width: 80
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
        text: '删除',
        style: { color: '#ff0000' },
        icon: '',
        confirm: {
          title: '确认要删除吗？',
          confirm: async (e) => {
            if (e.state !== 1) {
              this.$message.error('订单已支付，无法删除!')
              return
            }
            let result = await api.setAllLoanState({
              id: e.id,
              state: 999
            })

            if (result && result.code === '000000') {
              this.$message.success('订单删除成功!')
              this.fetch({
                ...this.pagination,
                ...this.search
              })
            }
          },
          cancel: (e) => { }
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
        loanSn: '',
        loanUserRealName: '',
        loanUserPhone: '',
        loanUserIdCard: '',
        masterUserRealName: '',
        masterUserPhone: '',
        masterUserIdCard: '',
        state: []
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async fetch (param = {}) {
      let result = await api.getLoans({
        ...param
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
            isPay: item.isPay && item.isPay === 1 ? '已支付' : '未支付',
            loanUserRealName: item.loanUserRealName ? item.loanUserRealName : '借款人',
            masterUserRealName: item.masterUserRealName ? item.masterUserRealName : '放款人',
            loanMoney: item.loanMoney ? item.loanMoney / 100 : item.loanMoney,
            loanTime: item.loanTime && item.loanTime > 0 ? this.$utils.Date.format(item.loanTime, 'yyyy-MM-dd') : '',
            repayTime: item.repayTime && item.repayTime > 0 ? this.$utils.Date.format(item.repayTime, 'yyyy-MM-dd') : '',
            rate: item.rate && item.rate > 0 ? `${item.rate / 100}%` : '',
            serviceMoney: item.serviceMoney && item.serviceMoney > 0 ? item.serviceMoney / 100 : item.serviceMoney,
            payTime: item.payTime && item.payTime > 0 ? this.$utils.Date.format(item.payTime, 'yyyy-MM-dd hh:mm:ss') : '',
            addTime: this.$utils.Date.format(item.addTime, 'yyyy-MM-dd hh:mm:ss'),
            updateTime: this.$utils.Date.format(item.updateTime, 'yyyy-MM-dd hh:mm:ss')
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
