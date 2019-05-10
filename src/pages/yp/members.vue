<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
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
      columns: [],
      data: [],
      pagination: {},
      buttons: [],
      actionButtons: []
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
        width: 30
      }, {
        title: '姓名',
        dataIndex: 'userName',
        width: 60
      }, {
        title: '手机号',
        dataIndex: 'userPhone',
        width: 80
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
          text: '删除',
          style: { color: '#ff0000' },
          icon: 'edit',
          confirm: {
            title: '确认要删除吗？',
            confirm: async (e) => {
              let result = await api.delUser({
                id: e.id
              })
              if (result) {
                this.$message.success('会员删除成功！')
                this.fetch({
                  ...this.pagination
                })
              }
            },
            cancel: (e) => { }
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
      let result = await api.getUser({
        ...param
      })
      this.data = []
      if (result) {
        result = result.data
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            id: item.id,
            userPhone: item.userPhone,
            userName: item.userName,
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
    }
  }
}
</script>
