<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='菜单编号'>
          <a-input placeholder='请输入菜单编号' v-model="info.id"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='菜单名称'>
          <a-input placeholder='请输入菜单名称' v-model="info.menuName"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='菜单链接'>
          <a-input placeholder='请输入菜单链接' v-model="info.menuLink"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='菜单图标'>
          <a-select labelInValue @change="handleIconChange">
            <a-select-option v-for="icon in icons" :key="icon.name" :value="icon.name">
              <a-icon :type="icon.name" />&nbsp;{{icon.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='菜单父级'>
          <a-select labelInValue :defaultValue="defaultMenuData" @change="handleMenuParentChange">
            <a-select-option v-for="menu in parentMenuData" :key="menu.menuId" :value="menu.menuId">{{menu.menuName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='菜单顺序'>
          <a-input placeholder='请输入菜单顺序' v-model="info.sort"></a-input>
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
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='菜单名称'>
              <a-input placeholder='请输入菜单名称' v-model="search.menuName"></a-input>
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
import icons from './icons.json'

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
      parentMenuData: [],
      defaultMenuData: { key: '0' },
      icons,
      info: {
        id: 0,
        menuName: '',
        menuLink: '',
        menuIcon: '',
        parentId: 0,
        sort: 0
      },
      search: {
        menuName: '',
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
        title: '菜单名称',
        dataIndex: 'menuName',
        width: 50
      }, {
        title: '菜单地址',
        dataIndex: 'menuLink',
        width: 50
      }, {
        title: '菜单图标',
        dataIndex: 'menuIcon',
        width: 50
      }, {
        title: '父菜单',
        dataIndex: 'parentName',
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
              menuName: '',
              menuLink: '',
              menuIcon: this.info.menuIcon,
              parentId: this.info.parentId,
              sort: 0
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
          text: '删除',
          style: { color: '#ff0000' },
          icon: 'edit',
          confirm: {
            title: '确认要删除吗？',
            confirm: async (e) => {
              let result = await api.delMenu({
                id: e.id
              })
              if (result) {
                this.$message.success('菜单删除成功！')
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
      this.initParentMenu()
    },
    searchInit () {
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      this.search = {
        menuName: '',
        startAddTime: 0,
        endAddTime: 0
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async initParentMenu () {
      this.parentMenuData.push({
        menuId: '0',
        menuName: '无父级'
      })
      let result = await api.getMenus()
      if (result) {
        result.result.forEach(val => {
          this.parentMenuData.push({
            menuId: val.key,
            menuName: val.title
          })
        })
      }
    },
    async fetch (param = {}) {
      let result = await api.getMenuList({
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
            menuName: item.menuName,
            menuLink: item.menuLink,
            menuIcon: item.menuIcon,
            parentName: item.parentName,
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

      let result = await api.addMenu({
        ...this.info
      })

      if (result) {
        this.info = {
          id: 0,
          menuName: '',
          menuLink: '',
          menuIcon: this.info.menuIcon,
          parentId: this.info.parentId,
          sort: 0
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
    handleMenuParentChange (value) {
      this.info.parentId = parseInt(value.key)
    },
    handleIconChange (value) {
      this.info.menuIcon = value.key
    }
  }
}
</script>
