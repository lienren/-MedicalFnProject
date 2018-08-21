<template>
  <div>
    <iTable :btns="buttons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal title="搜索条件" v-model="searchVisible" @ok="searchAction" :okText="searchConfirmText" cancelText="取消" :confirmLoading="searchConfirmLoading">
      <a-form>
        <a-row>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='添加时间'>
              <a-range-picker @change="onSearchTimeChange" format="YYYY-MM-DD" :placeholder="['开始时间', '结束时间']" />
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='页面名称'>
              <a-input placeholder='请输入页面名称' v-model="search.pageName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='事件名称'>
              <a-input placeholder='请输入事件名称' v-model="search.eventName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='操作名称'>
              <a-input placeholder='请输入操作名称' v-model="search.activeName"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/manage'
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
      pagination: {},
      buttons: [],
      searchVisible: false,
      searchConfirmText: '搜索',
      searchConfirmLoading: false,
      search: {
        pageName: '',
        eventName: '',
        activeName: '',
        startAddTime: 0,
        endAddTime: 0
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
        title: '页面名称',
        dataIndex: 'pageName',
        width: 50
      }, {
        title: '事件名称',
        dataIndex: 'eventName',
        width: 50
      }, {
        title: '操作名称',
        dataIndex: 'activeName',
        width: 50
      }, {
        title: '操作人姓名',
        dataIndex: 'managerRealName',
        width: 50
      }, {
        title: '操作人帐号',
        dataIndex: 'managerLoginName',
        width: 50
      }, {
        title: '添加时间',
        dataIndex: 'addTime',
        width: 100
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
      this.searchInit()
    },
    searchInit () {
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      this.search = {
        pageName: '',
        eventName: '',
        activeName: '',
        startAddTime: 0,
        endAddTime: 0
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async fetch (param = {}) {
      let result = await api.getLogs({
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
            id: item.id,
            pageName: item.pageName,
            pageUrl: item.pageUrl,
            actionName: item.actionName,
            eventName: item.eventName,
            activeName: item.activeName,
            managerId: item.managerId,
            managerRealName: item.managerRealName,
            managerLoginName: item.managerLoginName,
            managerPhone: item.managerPhone,
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
        ...this.pagination,
        ...this.search
      })
    },
    async onSearchTimeChange (date, dateString) {
      if (date.length === 0) {
        this.search.startAddTime = 0
        this.search.endAddTime = 0
        return
      }
      this.search.startAddTime = date[0].format('x')
      this.search.endAddTime = date[1].format('x')

      this.search.startAddTime = parseInt(this.search.startAddTime / 1000)
      this.search.endAddTime = parseInt(this.search.endAddTime / 1000)
      this.search.startAddTime = (this.search.startAddTime - (this.search.startAddTime + 8 * 3600) % 86400) * 1000
      this.search.endAddTime = (this.search.endAddTime - (this.search.endAddTime + 8 * 3600) % 86400 + 24 * 3600) * 1000 - 1
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
