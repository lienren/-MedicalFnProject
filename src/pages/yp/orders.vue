<template>
  <div>
    <iTable
      :btns="buttons"
      :actionBtns="actionButtons"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :height="tableHeight"
      @on-change="handleTableChange"
    ></iTable>
    <a-modal
      style="top: 20px;"
      width="80%"
      :title="cuTitle"
      v-model="cuVisible"
      @ok="cuVisible=false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="cuVisible=false">关闭</a-button>
      </template>
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="订单号">
          <span class="ant-form-text">{{info.osn}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="订单类型">
          <span class="ant-form-text">{{info.otypeName}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="人数">
          <span class="ant-form-text">{{info.opeopleNum}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="价格">
          <span class="ant-form-text">{{info.oprice}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="日期">
          <span class="ant-form-text">{{info.oselectTime}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户手机号">
          <span class="ant-form-text">{{info.userPhone}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户姓名">
          <span class="ant-form-text">{{info.userName}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
          <span class="ant-form-text">{{info.oprojectName}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="套餐信息">
          <div>套餐标题：{{info.oprojectPageAge&&info.oprojectPageAge.title?info.oprojectPageAge.title:''}}</div>
          <div>套餐描述：{{info.oprojectPageAge&&info.oprojectPageAge.remark?info.oprojectPageAge.remark:''}}</div>
          <div>套餐价格：{{info.oprojectPageAge&&info.oprojectPageAge.price?info.oprojectPageAge.price:''}}</div>
          <div>套餐单位：{{info.oprojectPageAge&&info.oprojectPageAge.unit?info.oprojectPageAge.unit:''}}</div>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="业务代表">
          <span class="ant-form-text">{{info.oprojectBusUserName}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="当前状态">
          <span class="ant-form-text">{{info.ostateName}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="添加时间">
          <span class="ant-form-text">{{info.createTime}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="订单备注">
          <table style="width:100%;text-align:center;" border="1">
            <thead>
              <tr style="background:#1890ff;color:#fff;">
                <th style="width:10%;">编号</th>
                <th style="width:60%;">描述</th>
                <th style="width:10%;">添加人</th>
                <th style="width:20%;">添加时间</th>
              </tr>
            </thead>
            <tbody v-if="info.remarks">
              <tr v-for="(item, index) in info.remarks" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.remark}}</td>
                <td>{{item.manageName}}</td>
                <td>{{$utils.Date.format(item.createTime, 'yyyy-MM-dd hh:mm:ss')}}</td>
              </tr>
            </tbody>
          </table>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      width="80%"
      title="新增订单备注"
      v-model="showOrderRemark"
      @ok="addOrderRemark"
      okText="确认"
      cancelText="取消"
    >
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注信息">
          <a-input placeholder="请输入订单备注信息" v-model="orderRemark.remark"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/youngplay'
import { iTable } from '../../components/'

export default {
  components: {
    iTable
  },
  data () {
    return {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 22
      },
      wrapperButtonCol: {
        span: 22, offset: 2
      },
      columns: [],
      data: [],
      pagination: {},
      buttons: [],
      actionButtons: [],
      cuVisible: false,
      cuTitle: '订单详细',
      info: {},
      showOrderRemark: false,
      orderRemark: {
        orderId: 0,
        remark: ''
      }
    }
  },
  computed: {
    tableHeight () {
      return this.$utils.Common.getWidthHeight().height - 188
    }
  },
  created () { },
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
        title: '编号',
        dataIndex: 'osn',
        width: 100
      }, {
        title: '手机号',
        dataIndex: 'userPhone',
        width: 80
      }, {
        title: '类型',
        dataIndex: 'otypeName',
        width: 80
      }, {
        title: '人数',
        dataIndex: 'opeopleNum',
        width: 30
      }, {
        title: '时间',
        dataIndex: 'oselectTime',
        width: 80
      }, {
        title: '状态',
        dataIndex: 'ostateName',
        width: 60
      }, {
        title: '添加时间',
        dataIndex: 'createTime',
        width: 100
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
              ...this.pagination
            })
          }
        }
      ]
      // 操作按钮
      this.actionButtons = [
        {
          model: 'button',
          text: '详细',
          style: {},
          icon: 'edit',
          click: async (e) => {
            let result = this.data.find(f => {
              return f.id === e.id
            })

            if (result) {
              this.info = {
                ...result,
                oprojectPageAge: result.oprojectPageAge && result.oprojectPageAge.length > 0 ? JSON.parse(result.oprojectPageAge) : {}
              }

              let remarks = await api.getOrderRemark({
                orderId: e.id
              })

              if (remarks) {
                this.info.remarks = remarks.data
              }

              this.cuVisible = true
            }
          }
        },
        {
          model: 'button',
          text: '添加备注',
          style: {},
          icon: 'edit',
          click: async (e) => {
            this.orderRemark.orderId = e.id
            this.orderRemark.remark = ''
            this.showOrderRemark = true
          }
        },
        {
          model: 'button',
          text: '完成',
          style: {},
          icon: 'edit',
          click: async (e) => {
            if (e.ostate === 3) {
              this.$message.error('订单已经完成，不能再标记为完成！')
              return
            }
            let result = await api.updateOrderState({
              id: e.id,
              ostate: 3
            })

            if (result) {
              this.$message.success('标记成功！')
              this.fetch({
                ...this.pagination
              })
            }
          }
        }
      ]
      this.fetch({
        ...this.pagination
      })
    },
    searchInit () {
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      this.fetch({
        ...this.pagination
      })
    },
    async fetch (param = {}) {
      let result = await api.getOrder({
        ...param
      })
      this.data = []
      if (result) {
        result = result.data
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            ...item,
            oprice: parseFloat(item.oprice / 100).toFixed(2),
            createTime: this.$utils.Date.format(item.createTime, 'yyyy-MM-dd hh:mm:ss')
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
        ...this.pagination
      })
    },
    async addOrderRemark () {
      await api.addOrderRemark({
        orderId: this.orderRemark.orderId,
        remark: this.orderRemark.remark
      })

      this.orderRemark.orderId = 0
      this.orderRemark.remark = ''
      this.showOrderRemark = false
      this.$message.success('备注添加成功！')
    }
  }
}
</script>
