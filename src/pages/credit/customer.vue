<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='姓名'>
          <a-input placeholder='请输入姓名' v-model="info.userName">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='性别'>
          <a-input placeholder='请输入性别' v-model="info.userSex">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='电话'>
          <a-input placeholder='请输入电话' v-model="info.userPhone">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='身份证号'>
          <a-input placeholder='请输入身份证号' v-model="info.userIdCard">
          </a-input>
        </a-form-item>
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
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      wrapperButtonCol: {
        span: 14, offset: 4
      },
      columns: [],
      data: [],
      dataDeps: [],
      pagination: {},
      buttons: [],
      actionButtons: [],
      cuVisible: false,
      cuTitle: '新增客户',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      info: {
        id: 0,
        userName: '',
        userPhone: '',
        userSex: '',
        userIdCard: ''
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
        dataIndex: 'id',
        width: 50
      }, {
        title: '姓名',
        dataIndex: 'userName',
        width: 80
      }, {
        title: '性别',
        dataIndex: 'userSex',
        width: 50
      }, {
        title: '电话',
        dataIndex: 'userPhone',
        width: 100
      }, {
        title: '身份证',
        dataIndex: 'userIdCard',
        width: 150
      }, {
        title: '审核状态',
        dataIndex: 'verfiyStateName',
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
          icon: 'reload',
          text: '刷新',
          click: () => {
            this.fetch({
              ...this.pagination
            })
          }
        },
        {
          model: 'button',
          icon: 'edit',
          text: '新增',
          click: () => {
            this.info = {
              id: 0,
              userName: '',
              userPhone: '',
              userSex: '',
              userIdCard: ''
            }
            this.cuVisible = true
            this.cuTitle = '新增客户'
          }
        }
      ]
      // 操作按钮
      this.actionButtons = [
        {
          model: 'button',
          text: '修改',
          style: {},
          icon: 'edit',
          click: async (e) => {
            this.info = {
              id: e.id,
              userName: e.userName,
              userPhone: e.userPhone,
              userSex: e.userSex,
              userIdCard: e.userIdCard
            }
            this.cuVisible = true
            this.cuTitle = '修改客户'
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
      let userinfo = this.$utils.Store.get('userinfo')
      let result = await api.getLoanuser({
        ...param,
        managerId: userinfo.id,
        isVerfiy: -1
      })
      this.data = []
      if (result) {
        result = result.result
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            id: item.id,
            userName: item.userName,
            userPhone: item.userPhone,
            userSex: item.userSex,
            userIdCard: item.userIdCard,
            isVerfiy: item.isVerfiy,
            verfiyStateName: item.isVerfiy === 1 ? '审核通过' : (item.isVerfiy === 0 ? '审核中' : '审核不通过'),
            addTime: this.$utils.Date.format(item.addTime, 'yyyy-MM-dd hh:mm:ss')
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
    async addOrupdateAction () {
      this.cuConfirmLoading = true
      this.cuConfirmText = '保存中...'

      let result
      if (this.info.id > 0) {
        result = await api.editLoanuser({
          ...this.info
        })
      } else {
        result = await api.addLoanuser({
          ...this.info
        })
      }

      if (result) {
        this.info = {
          id: 0,
          userName: '',
          userPhone: '',
          userSex: '',
          userIdCard: ''
        }
        this.cuVisible = false
        this.searchInit()
      }

      this.cuConfirmLoading = false
      this.cuConfirmText = '确认并保存'
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
