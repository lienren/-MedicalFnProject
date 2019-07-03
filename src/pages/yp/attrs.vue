<template>
  <div>
    <a-tabs defaultActiveKey="1" tabPosition="left"  @change="changeAttrType">
      <a-tab-pane tab="团建" key="1">
        <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
      </a-tab-pane>
      <a-tab-pane tab="活动" key="2">
        <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
      </a-tab-pane>
      <a-tab-pane tab="场地" key="3">
        <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
      </a-tab-pane>
      <a-tab-pane tab="亲子汇" key="4">
        <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
      </a-tab-pane>
      <a-tab-pane tab="案例" key="5">
        <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
      </a-tab-pane>
    </a-tabs>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='属性名称'>
          <a-input placeholder='请输入属性名称' v-model="info.attrName"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='是否多选'>
          <a-switch checkedChildren="多选" unCheckedChildren="单选" v-model="info.isCheckSwitch" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="修改属性值" v-model="editAttrValueVisible" @ok="addOrupdateAttrValueAction">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='属性编号'>
          {{info.id}}
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='属性名称'>
          {{info.attrName}}
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='属性值'>
          <a-textarea placeholder="请输入属性值（英文逗号分隔）" v-model="info.attrValues" autosize />
          <p style="color:#ff0000;">*属性值之间用英文逗号分隔</p>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/youngplay'
import { iTable } from '../../components/'

let attrTypeList = {
  '1': '团建',
  '2': '活动',
  '3': '场地',
  '4': '亲子汇',
  '5': '案例'
}

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
      selAttrType: 1,
      cuVisible: false,
      cuTitle: '新增属性',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      editAttrValueVisible: false,
      info: {
        id: 0,
        attrName: '',
        attrValues: '',
        isCheckSwitch: false
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
        title: '属性名',
        dataIndex: 'attrName',
        width: 60
      }, {
        title: '选择',
        dataIndex: 'isCheckName',
        width: 60
      }, {
        title: '属性值',
        dataIndex: 'attrValues',
        width: '35%'
      }, {
        title: '创建时间',
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
        },
        {
          model: 'button',
          icon: 'edit',
          text: '新增',
          click: () => {
            this.info = {
              id: 0,
              attrName: '',
              attrValues: '',
              isCheckSwitch: false
            }
            this.cuVisible = true
            this.cuTitle = '新增属性'
          }
        }
      ]
      // 操作按钮
      this.actionButtons = [
        {
          model: 'button',
          text: '修改属性值',
          style: {},
          icon: 'edit',
          click: (e) => {
            this.info = {
              id: e.id,
              attrName: e.attrName,
              attrValues: e.attrValues,
              isCheckSwitch: e.isCheck === 1
            }
            this.editAttrValueVisible = true
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
              let result = await api.delAttr({
                id: e.id
              })
              if (result) {
                this.$message.success('属性删除成功！')
                this.fetch({
                  ...this.pagination
                })
              }
            },
            cancel: (e) => { }
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
      this.fetch({
        ...this.pagination
      })
    },
    async changeAttrType (val) {
      this.data = []
      this.selAttrType = val
      this.fetch({})
    },
    async fetch (param = {}) {
      param = {
        ...param,
        attrType: this.selAttrType
      }
      let result = await api.getAttr({
        ...param
      })
      this.data = []
      if (result) {
        result = result.data
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            id: item.id,
            attrName: item.attrName,
            attrType: attrTypeList[`${item.attrType}`],
            isCheck: item.isCheck,
            isCheckName: item.isCheck === 1 ? '多选' : '单选',
            attrValues: item.attrValues ? item.attrValues.map(m => {
              return m.attrValue
            }).join(',') : '',
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
    async addOrupdateAction () {
      this.cuConfirmLoading = true
      this.cuConfirmText = '保存中...'
      this.info.isCheck = this.info.isCheckSwitch ? 1 : 0

      let result = await api.addAttr({
        ...this.info,
        attrType: this.selAttrType
      })

      if (result) {
        this.cuVisible = false
        this.searchInit()
      }

      this.cuConfirmLoading = false
      this.cuConfirmText = '确认并保存'
    },
    async addOrupdateAttrValueAction () {
      if (this.info.attrValues === '') {
        this.$message.error('属性值不能为空！')
        return
      }

      await api.delAttrValue({
        attrId: this.info.id
      })
      await api.addAttrValue({
        attrId: this.info.id,
        attrValues: this.info.attrValues.split(',')
      })
      this.editAttrValueVisible = false
      this.searchInit()
    }
  }
}
</script>
