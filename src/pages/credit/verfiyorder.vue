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
      search: {}
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
        text: '通过',
        style: {color: '#1890ff'},
        icon: '',
        click: async (e) => {
          let result = await api.verfiyLoanOrder({
            id: e.id,
            isVerfiy: 1
          })

          if (result) {
            this.$message.success('审核成功！')
            this.fetch({
              ...this.pagination,
              ...this.search
            })
          }
        }
      },
      {
        model: 'button',
        text: '不通过',
        style: {color: '#ff0000'},
        icon: 'edit',
        click: async (e) => {
          let result = await api.verfiyLoanOrder({
            id: e.id,
            isVerfiy: 2
          })

          if (result) {
            this.$message.success('审核成功！')
            this.fetch({
              ...this.pagination,
              ...this.search
            })
          }
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
      this.search = {}
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async fetch (param = {}) {
      let result = await api.getLoanorder({
        ...param,
        isVerfiy: [0]
      })
      this.data = []
      if (result) {
        result = result.result
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            ...item,
            stateName: item.state === 2 ? `${item.stateName}${item.extCount}` : item.stateName,
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
            userChannelSource: `${item.userChannel}-${item.userSource}`,
            addTime: this.$utils.Date.format(item.addTime, 'yyyy-MM-dd hh:mm:ss'),
            loanTime: this.$utils.Date.format(item.loanTime, 'yyyy-MM-dd hh:mm:ss'),
            updateTime: this.$utils.Date.format(item.updateTime, 'yyyy-MM-dd hh:mm:ss'),
            shouldReturnTime: this.$utils.Date.format(item.shouldReturnTime, 'yyyy-MM-dd hh:mm:ss')
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
