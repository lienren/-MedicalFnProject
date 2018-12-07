<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal title="搜索条件" v-model="searchVisible" @ok="searchAction" :okText="searchConfirmText" cancelText="取消" :confirmLoading="searchConfirmLoading">
      <a-form>
        <a-row>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='添加时间'>
              <a-range-picker @change="onSearchTimeChange" format="YYYY-MM-DD" :placeholder="['开始时间', '结束时间']" />
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='姓名'>
              <a-input placeholder='请输入姓名' v-model="search.userRealName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='手机号'>
              <a-input placeholder='请输入手机号' v-model="search.userPhone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='身份证'>
              <a-input placeholder='请输入身份证号' v-model="search.userIdCard"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='状态'>
              <a-select mode="multiple" placeholder="请选择状态" :defaultValue="search.state" @change="handleSelectOrderStateChange">
                <a-select-option value="1">开启</a-select-option>
                <a-select-option value="2">禁用</a-select-option>
                <a-select-option value="3">删除</a-select-option>
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
      searchVisible: false,
      searchConfirmText: '搜索',
      searchConfirmLoading: false,
      search: {
        stime: 0,
        etime: 0,
        userRealName: '',
        userPhone: '',
        userIdCard: '',
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
        title: '姓名',
        dataIndex: 'userRealName',
        width: 100
      }, {
        title: '手机号',
        dataIndex: 'userPhone',
        width: 100
      }, {
        title: '身份证',
        dataIndex: 'userIdCard',
        width: 120
      }, {
        title: '状态',
        dataIndex: 'stateName',
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
            let result = await api.setUserState({
              id: e.id,
              state: 3
            })

            if (result && result.code === '000000') {
              this.$message.success('用户删除成功!')
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
        userRealName: '',
        userPhone: '',
        userIdCard: '',
        state: []
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async fetch (param = {}) {
      let result = await api.getUsers({
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
