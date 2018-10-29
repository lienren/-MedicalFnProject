<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='中介名称'>
          <a-input placeholder='请输入中介名称' v-model="info.iName">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='联系人'>
          <a-input placeholder='请输入联系人' v-model="info.iContact">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='联系电话'>
          <a-input placeholder='请输入联系电话' v-model="info.iContactPhone">
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
      cuTitle: '新增中介',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      info: {
        id: 0,
        iName: '',
        iContact: '',
        iContactPhone: ''
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
        title: '中介名称',
        dataIndex: 'iName',
        width: 150
      }, {
        title: '联系人',
        dataIndex: 'iContact',
        width: 100
      }, {
        title: '联系电话',
        dataIndex: 'iContactPhone',
        width: 100
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
        }
      ]
      // 操作按钮
      this.actionButtons = [
        {
          model: 'button',
          text: '通过',
          style: {color: '#1890ff'},
          icon: 'edit',
          click: async (e) => {
            let result = await api.verfiyIntermediary({
              id: e.id,
              isVerfiy: 1
            })

            if (result) {
              this.$message.success('审核成功！')
              this.fetch({
                ...this.pagination
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
            let result = await api.verfiyIntermediary({
              id: e.id,
              isVerfiy: 2
            })

            if (result) {
              this.$message.success('审核成功！')
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
      let result = await api.getIntermediary({
        ...param,
        isVerfiy: 0
      })
      this.data = []
      if (result) {
        result = result.result
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            id: item.id,
            iName: item.iName,
            iContact: item.iContact,
            iContactPhone: item.iContactPhone,
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
        result = await api.editIntermediary({
          ...this.info
        })
      } else {
        result = await api.addIntermediary({
          ...this.info
        })
      }

      if (result) {
        this.info = {
          id: 0,
          iName: '',
          iContact: '',
          iContactPhone: ''
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
