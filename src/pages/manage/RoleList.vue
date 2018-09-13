<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='角色名称'>
          <a-input placeholder='请输入角色名称' v-model="info.roleName"></a-input>
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
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='角色名称'>
              <a-input placeholder='请输入角色名称' v-model="info.roleName"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal title="设置菜单" v-model="setMenuVisible" @ok="setMenuAction" :okText="setMenuConfirmText" cancelText="取消" :confirmLoading="setMenuConfirmLoading">
      <a-tree checkable v-model="info.menuIds" :treeNodes="menuData" />
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
      actionButtons: [],
      cuVisible: false,
      cuTitle: '新增角色',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      searchVisible: false,
      searchConfirmText: '搜索',
      searchConfirmLoading: false,
      setMenuVisible: false,
      setMenuConfirmText: '确认并保存',
      setMenuConfirmLoading: false,
      menuData: [],
      info: {
        id: 0,
        roleName: '',
        menuIds: []
      },
      search: {
        roleName: '',
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
        title: '角色名称',
        dataIndex: 'roleName',
        width: 50
      }, {
        title: '添加时间',
        dataIndex: 'addTime',
        width: 100
      }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
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
        },
        {
          model: 'button',
          icon: 'edit',
          text: '新增',
          click: () => {
            this.info = {
              id: 0,
              roleName: ''
            }
            this.cuVisible = true
            this.cuTitle = '新增角色'
          }
        }
      ]
      // 操作按钮
      this.actionButtons = [
        {
          model: 'button',
          text: '设置菜单',
          style: {},
          icon: 'edit',
          click: async (e) => {
            this.info.id = e.id
            let result = await api.getRoleMenu({ id: e.id })

            if (result) {
              this.info.menuIds = result.result
              this.setMenuVisible = true
            }
          }
        },
        {
          model: 'button',
          text: '删除',
          style: { color: '#ff0000' },
          icon: 'edit',
          confirm: {
            title: '确认要删除吗？',
            confirm: async (e) => {
              if (e.id === 1) {
                this.$message.error('超级角色禁止更新！')
                return
              }
              let result = await api.delRole({
                id: e.id
              })
              if (result) {
                this.$message.success('角色删除成功！')
                this.fetch({
                  ...this.pagination,
                  ...this.search
                })
              }
            },
            cancel: (e) => { }
          }
        }
      ]
      this.fetch({
        ...this.pagination,
        ...this.search
      })
      this.initMenu()
    },
    searchInit () {
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      this.search = {
        roleName: '',
        startAddTime: 0,
        endAddTime: 0
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async initMenu () {
      let result = await api.getMenus({})

      if (result) {
        this.menuData = result.result
      }
    },
    async fetch (param = {}) {
      let result = await api.getRoles({
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
            roleName: item.roleName,
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
    async addOrupdateAction () {
      this.cuConfirmLoading = true
      this.cuConfirmText = '保存中...'

      let result = await api.addRole({
        ...this.info
      })

      if (result) {
        this.info = {
          id: 0,
          roleName: ''
        }
        this.cuVisible = false
        this.searchInit()
      }

      this.cuConfirmLoading = false
      this.cuConfirmText = '确认并保存'
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
    },
    async setMenuAction () {
      if (this.info.menuIds.length === 0) {
        this.$message.error('请选择菜单！')
        return
      }

      this.setMenuConfirmText = '保存中...'
      this.setMenuConfirmLoading = true

      let result = await api.setRoleMenu({
        ...this.info
      })

      if (result) {
        this.checkedMenuKeys = []
        this.setMenuVisible = false
        this.setMenuConfirmText = '确认并保存'
        this.setMenuConfirmLoading = false
      }
    }
  }
}
</script>
