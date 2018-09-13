<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='医师姓名'>
          <a-input placeholder='请输入医师姓名' v-model="info.dorName">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='医师照片'>
          <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" action="http://localhost:8888/base/uploadfile" :beforeUpload="uploadBeforeUpload" @change="uploadHandleChange">
            <img v-if="info.dorHeadImg" :src="info.dorHeadImg" alt="avatar" style="width:128px;height:auto;" />
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传照片</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='所在诊所'>
          <a-select labelInValue :value="info.clId" @change="handleCLChange">
            <a-select-option v-for="cl in dataCLs" :key="cl.id" :value="cl.id">{{cl.clName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='个人擅长'>
          <a-input placeholder='请输入个人擅长' v-model="info.goodAt">
          </a-input>（控制在20字内）
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='职务'>
          <a-input placeholder='请输入职务' v-model="info.position">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='简介'>
          <a-input placeholder='请输入简介' v-model="info.remark">
          </a-input>（控制在50字内）
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='详细介绍'>
          <a-input placeholder='请输入详细介绍' v-model="info.detailRemark">
          </a-input>（控制在200字内）
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='所在科室'>
          <a-checkbox-group @change="onChangeDep" :value="info.dorDeps">
            <a-row>
              <a-col :span="8" v-for="dep in dataDeps" :key="dep.value">
                <a-checkbox :value="dep.value">{{dep.label}}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/bs'
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
      dataCLs: [],
      dataDeps: [],
      pagination: {},
      buttons: [],
      actionButtons: [],
      cuVisible: false,
      cuTitle: '新增医师',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      info: {
        id: 0,
        dorName: '',
        dorHeadImg: '',
        clId: 0,
        clName: '',
        goodAt: '',
        position: '',
        remark: '',
        detailRemark: '',
        dorDeps: []
      },
      uploadLoading: false
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
        dataIndex: 'dorName',
        width: 80
      }, {
        title: '所在诊所',
        dataIndex: 'clName',
        width: 150
      }, {
        title: '职务',
        dataIndex: 'position',
        width: 80
      }, {
        title: '添加时间',
        dataIndex: 'addTime',
        width: 100
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
              dorName: '',
              dorHeadImg: '',
              clId: 0,
              clName: '',
              goodAt: '',
              position: '',
              remark: '',
              detailRemark: '',
              dorDeps: []
            }
            this.cuVisible = true
            this.cuTitle = '新增医师'
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
            let result = await api.getDor({
              id: e.id
            })

            if (result) {
              result = result.result
              this.info = {
                id: result.dor.id,
                dorName: result.dor.dorName,
                dorHeadImg: result.dor.dorHeadImg,
                clId: result.dor.clId,
                clName: result.dor.clName,
                goodAt: result.dor.goodAt,
                position: result.dor.position,
                remark: result.dor.remark,
                detailRemark: result.dor.detailRemark,
                dorDeps: result.dordeps.map((dep) => {
                  return `${dep.depId}`
                })
              }
            }
            this.cuVisible = true
            this.cuTitle = '修改医师'
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
              let result = await api.delDor({
                id: e.id
              })
              if (result) {
                this.$message.success('删除成功！')
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
      this.clInit()
      this.depInit()
    },
    async clInit () {
      let result = await api.getCLs({
        pageSize: 9999
      })
      if (result) {
        result = result.result.list
        result.forEach(cl => {
          this.dataCLs.push({
            id: `${cl.id}`,
            clName: cl.clName
          })
        })
      }
    },
    async depInit () {
      let result = await api.getDepList({})
      if (result) {
        result = result.result
        result.forEach(dep => {
          this.dataDeps.push(
            { label: dep.depName, value: `${dep.id}` })
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
      this.fetch({
        ...this.pagination
      })
    },
    async fetch (param = {}) {
      let result = await api.getDors({
        ...param
      })
      this.data = []
      if (result) {
        result = result.result
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            dorName: item.dorName,
            dorHeadImg: item.dorHeadImg,
            clId: item.clId,
            clName: item.clName,
            goodAt: item.goodAt,
            position: item.position,
            remark: item.remark,
            detailRemark: item.detailRemark,
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
        ...this.pagination
      })
    },
    async addOrupdateAction () {
      this.cuConfirmLoading = true
      this.cuConfirmText = '保存中...'

      let result
      if (this.info.id > 0) {
        result = await api.editDor({
          ...this.info
        })
      } else {
        result = await api.addDor({
          ...this.info
        })
      }

      if (result) {
        this.info = {
          id: 0,
          dorName: '',
          dorHeadImg: '',
          clId: 0,
          clName: '',
          goodAt: '',
          position: '',
          remark: '',
          detailRemark: '',
          dorDeps: []
        }
        this.cuVisible = false
        this.searchInit()
      }

      this.cuConfirmLoading = false
      this.cuConfirmText = '确认并保存'
    },
    uploadHandleChange (info) {
      if (info.file.status === 'uploading') {
        this.uploadLoading = true
        return
      }
      if (info.file.status === 'done' &&
          info.file.response.code === '000000' &&
          info.file.response.result &&
          info.file.response.result.filePath) {
        this.info.clHeadImg = info.file.response.result.filePath
        this.uploadLoading = false
      }
    },
    uploadBeforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('只能上传jpg或jpeg文件！')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件只能小于2MB!')
      }
      return isJPG && isLt2M
    },
    onChangeDep (checkedValues) {
      this.info.clDeps = checkedValues
    },
    handleCLChange (value) {
      this.info.clId = parseInt(value.key)
      this.info.clName = value.label
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
