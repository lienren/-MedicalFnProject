<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='姓名'>
          <a-input placeholder='请输入姓名' v-model="info.busName"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='手机号'>
          <a-input placeholder='请输入手机号' v-model="info.busPhone">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='职位'>
          <a-input placeholder='请输入职位' v-model="info.busTitle">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='描述'>
          <a-input placeholder='请输入描述' v-model="info.busContent">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='头像'>
          <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" action="//47.99.159.167:20000/base/uploadfile" :beforeUpload="uploadImgBeforeUpload" @change="uploadImgHandleChange">
            <img v-if="info.busHeadImg" :src="info.busHeadImg" alt="avatar" />
            <div v-else>
              <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传头像</div>
            </div>
          </a-upload>
          <p style="color:#ff0000;">*头像尺寸128*128，只能是jpg或png格式</p>
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
      cuTitle: '新增业务员',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      info: {
        id: 0,
        busName: '',
        busPhone: '',
        busTitle: '',
        busContent: '',
        busHeadImg: ''
      },
      uploadImgLoading: false
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
        dataIndex: 'busName',
        width: 60
      }, {
        title: '手机号',
        dataIndex: 'busPhone',
        width: 80
      }, {
        title: '职称',
        dataIndex: 'busTitle',
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
        },
        {
          model: 'button',
          icon: 'edit',
          text: '新增',
          click: () => {
            this.info = {
              id: 0,
              busName: '',
              busPhone: '',
              busTitle: '',
              busContent: '',
              busHeadImg: ''
            }
            this.cuVisible = true
            this.cuTitle = '新增业务员'
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
          click: (e) => {
            this.info = {
              id: e.id,
              busName: e.busName,
              busPhone: e.busPhone,
              busTitle: e.busTitle,
              busContent: e.busContent,
              busHeadImg: e.busHeadImg
            }
            this.cuVisible = true
            this.cuTitle = '修改业务员'
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
              let result = await api.delBusinessUser({
                id: e.id
              })
              if (result) {
                this.$message.success('业务员删除成功！')
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
      let result = await api.getBusinessUser({
        ...param
      })
      this.data = []
      if (result) {
        result = result.data
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            id: item.id,
            busName: item.busName,
            busPhone: item.busPhone,
            busTitle: item.busTitle,
            busContent: item.busContent,
            busHeadImg: item.busHeadImg,
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

      let result
      if (this.info.id > 0) {
        result = await api.editBusinessUser({
          ...this.info
        })
      } else {
        result = await api.addBusinessUser({
          ...this.info
        })
      }

      if (result) {
        this.info = {
          id: 0,
          busName: '',
          busPhone: '',
          busTitle: '',
          busContent: '',
          busHeadImg: ''
        }
        this.cuVisible = false
        this.searchInit()
      }

      this.cuConfirmLoading = false
      this.cuConfirmText = '确认并保存'
    },
    uploadImgHandleChange (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.info.busHeadImg = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadImgBeforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('只能上传jpg或png图片!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('头像不能大于2M!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
