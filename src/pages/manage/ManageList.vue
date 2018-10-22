<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='登录名'>
          <a-input placeholder='请输入登录名' v-model="info.loginName" :readOnly="info.id>0"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='登录密码'>
          <a-input placeholder='请输入登录密码' v-model="info.loginPwd" type="password">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='真实姓名'>
          <a-input placeholder='请输入真实姓名' v-model="info.realName" :readOnly="info.id===1">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='手机号'>
          <a-input placeholder='请输入手机号' v-model="info.phone">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='性别'>
          <a-switch checkedChildren="男" unCheckedChildren="女" v-model="info.sexSwitch" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='部门名称'>
          <a-input placeholder='请输入部门名称' v-model="info.depName">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='状态'>
          <a-switch checkedChildren="开启" unCheckedChildren="关闭" v-model="info.stateSwitch" :disabled="info.id===1" />
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
          <a-col :span="12" style="display:block;">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 14}" label='登录名'>
              <a-input placeholder='请输入登录名' v-model="search.loginName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12" style="display:block;">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 14}" label='真实姓名'>
              <a-input placeholder='请输入真实姓名' v-model="search.realName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12" style="display:block;">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 14}" label='手机号'>
              <a-input placeholder='请输入手机号' v-model="search.phone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display:block;">
            <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label='状态'>
              <a-radio-group @change="(e)=>{search.state=parseInt(e.target.value)}" :defaultValue="`${search.state}`">
                <a-radio-button value="-1">全部</a-radio-button>
                <a-radio-button value="1">已开启</a-radio-button>
                <a-radio-button value="0">已关闭</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal title="设置角色" v-model="setRoleVisible" @ok="setRoleAction" :okText="setRoleConfirmText" cancelText="取消" :confirmLoading="setRoleConfirmLoading">
      <a-transfer :dataSource="roleData" :targetKeys="targetRoleData" :titles="['角色清单', '已选择角色']" :render="item=>item.title" @change="selectRoleChange"></a-transfer>
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
      cuTitle: '新增管理员',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      searchVisible: false,
      searchConfirmText: '搜索',
      searchConfirmLoading: false,
      roleData: [],
      targetRoleData: [],
      setRoleVisible: false,
      setRoleConfirmText: '确认并保存',
      setRoleConfirmLoading: false,
      info: {
        id: 0,
        loginName: '',
        loginPwd: '',
        realName: '',
        phone: '',
        state: 1,
        sex: 1,
        stateSwitch: true,
        sexSwitch: true,
        depName: ''
      },
      search: {
        loginName: '',
        realName: '',
        phone: '',
        state: -1,
        startAddTime: 0,
        endAddTime: 0,
        depName: ''
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
        width: 30
      }, {
        title: '登录名',
        dataIndex: 'loginName',
        width: 60
      }, {
        title: '真实姓名',
        dataIndex: 'realName',
        width: 80
      }, {
        title: '部门名称',
        dataIndex: 'depName',
        width: 80
      }, {
        title: '手机号',
        dataIndex: 'phone',
        width: 80
      }, {
        title: '性别',
        dataIndex: 'sexName',
        width: 30
      }, {
        title: '状态',
        dataIndex: 'stateName',
        width: 30
      }, {
        title: '最后修改时间',
        dataIndex: 'lastTime',
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
              loginName: '',
              loginPwd: '',
              realName: '',
              phone: '',
              state: 1,
              sex: 1,
              stateSwitch: true,
              sexSwitch: true,
              depName: ''
            }
            this.cuVisible = true
            this.cuTitle = '新增管理员'
          }
        },
        {
          model: 'dropdown',
          text: '选择条件',
          menus: [
            {
              key: '-1',
              text: '全部'
            },
            {
              key: '1',
              text: '已开启'
            },
            {
              key: '0',
              text: '已关闭'
            }
          ],
          click: (e) => {
            this.search.state = parseInt(e.key)
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
      ]
      // 操作按钮
      this.actionButtons = [
        {
          model: 'button',
          text: '设置角色',
          icon: 'edit',
          click: async (e) => {
            if (e.id === 1) {
              this.$message.error('超级管理员禁止更新！')
              return
            }
            let result = await api.getManagerRole({
              id: e.id
            })
            if (result) {
              result = result.result
              this.info.id = e.id
              this.targetRoleData = result.map((val) => {
                return `${val.id}`
              })
              this.setRoleVisible = true
            }
          }
        },
        {
          model: 'button',
          text: '开启',
          style: {},
          icon: 'edit',
          dynamicText: (e) => {
            return e.state === 1 ? '关闭' : '开启'
          },
          confirm: {
            title: '确认要更改吗？',
            confirm: async (e) => {
              if (e.id === 1) {
                this.$message.error('超级管理员禁止更新！')
                return
              }
              let result = await api.editManagerState({
                id: e.id,
                state: e.state === 1 ? 0 : 1
              })
              if (result) {
                this.$message.success('管理员状态更新成功！')
                this.fetch({
                  ...this.pagination,
                  ...this.search
                })
              }
            },
            cancel: (e) => { }
          }
        },
        {
          model: 'button',
          text: '修改',
          style: {},
          icon: 'edit',
          click: (e) => {
            if (e.id === 1) {
              this.$message.error('超级管理员禁止更新！')
              return
            }
            this.info = {
              id: e.id,
              loginName: e.loginName,
              loginPwd: '',
              realName: e.realName,
              phone: e.phone,
              state: e.state,
              sex: e.sex,
              stateSwitch: e.state === 1,
              sexSwitch: e.sex === 1,
              depName: e.depName
            }
            this.cuVisible = true
            this.cuTitle = '修改管理员'
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
                this.$message.error('超级管理员禁止更新！')
                return
              }
              let result = await api.delManager({
                id: e.id
              })
              if (result) {
                this.$message.success('管理员删除成功！')
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
      this.roleInit()
    },
    async roleInit () {
      let result = await api.getRoles({
        pageSize: 9999
      })
      if (result) {
        result = result.result.list
        result.forEach(role => {
          this.roleData.push({
            key: `${role.id}`,
            title: role.roleName,
            description: role.roleName
          })
        })
      }
    },
    searchInit () {
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 0
      }
      this.search = {
        loginName: '',
        realName: '',
        phone: '',
        state: -1,
        startAddTime: 0,
        endAddTime: 0,
        depName: ''
      }
      this.fetch({
        ...this.pagination,
        ...this.search
      })
    },
    async fetch (param = {}) {
      let result = await api.getManagers({
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
            loginName: item.loginName,
            realName: item.realName,
            state: item.state,
            stateName: (item.state === 1 ? '开启' : '关闭'),
            sex: item.sex,
            sexName: (item.sex === 1 ? '男' : '女'),
            depName: item.depName,
            phone: item.phone,
            addTime: this.$utils.Date.format(item.addTime, 'yyyy-MM-dd hh:mm:ss'),
            lastTime: this.$utils.Date.format(item.lastTime, 'yyyy-MM-dd hh:mm:ss')
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
      this.info.state = this.info.stateSwitch ? 1 : 0
      this.info.sex = this.info.sexSwitch ? 1 : 0

      let result
      if (this.info.id > 0) {
        result = await api.editManager({
          ...this.info
        })
      } else {
        result = await api.addManager({
          ...this.info
        })
      }

      if (result) {
        this.info = {
          id: 0,
          loginName: '',
          loginPwd: '',
          realName: '',
          phone: '',
          state: 1,
          sex: 1,
          stateSwitch: true,
          sexSwitch: true,
          depName: ''
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
    selectRoleChange (nextTargetKeys, direction, moveKeys) {
      this.targetRoleData = nextTargetKeys
    },
    async setRoleAction () {
      if (this.targetRoleData.length === 0) {
        this.$message.error('请选择角色！')
        return
      }
      this.setRoleConfirmText = '保存中...'
      this.setRoleConfirmLoading = true
      let result = await api.setManagerRole({ id: this.info.id, roleIds: this.targetRoleData })
      if (result) {
        this.setRoleConfirmText = '确认并保存'
        this.setRoleConfirmLoading = false
      }
    }
  }
}
</script>
