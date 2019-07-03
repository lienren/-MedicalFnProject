<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
    <a-modal style="top: 20px;" width="80%" :title="cuTitle" v-model="cuVisible" @ok="addOrupdateAction" :okText="cuConfirmText" cancelText="取消" :confirmLoading="cuConfirmLoading">
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='类型'>
          <a-select style="width: 120px" v-model="info.clsId">
            <a-select-option value="1">办年会</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='业务人员'>
          <a-select style="width: 120px" v-model="info.busUserId">
            <a-select-option v-for="(item, index) in busUsers" :key="index" :value="item.id">{{item.busName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='标题'>
          <a-input placeholder='请输入标题' v-model="info.title"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='副标题'>
          <a-input placeholder='请输入副标题' v-model="info.subTitle">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='价格'>
          <a-input placeholder='请输入价格' v-model="info.price">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='行程天数'>
          <a-input-number :min="1" v-model="info.strokeDay" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='场地'>
          <a-input placeholder='请输入场地' v-model="info.site">
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='主图'>
          <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" action="//manage.youngplay.net/base/uploadfile" :beforeUpload="uploadImgBeforeUpload" @change="uploadImgHandleChange">
            <img v-if="info.masterImg" :src="info.masterImg" alt="avatar" style="height:100px;width:auto;" />
            <div v-else>
              <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传主图</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='描述'>
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="空间信息" key="1">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r1" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="场地介绍" key="2">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r2" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="设施服务" key="3">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r3" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="餐饮服务" key="4">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r4" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='属性'>
          <template v-for="(attr, index) in attrs">
            <div :key="index+'-div'" style="font-size:14px;font-weight:bold;">{{attr.attrName}}（{{attr.isCheck===1?'多选':'单选'}}）</div>
            <a-radio-group v-if="attr.isCheck===0" :key="index+'-radio'" :options="attr.options" :defaultValue="attr.defaultItems" v-model="attr.selectItems" @change="onAttrChange" />
            <a-checkbox-group v-if="attr.isCheck===1" :key="index+'-check'" :options="attr.options" :defaultValue="attr.defaultItems" v-model="attr.selectItems" @change="onAttrChange" />
          </template>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='关键字'>
          <a-input placeholder='请输入关键字' v-model="info.tags"></a-input>
          <p style="color:#ff0000;">*关键字之间用英文逗号分隔</p>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/youngplay'
import { iTable } from '../../components/'
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  components: {
    iTable,
    VueUeditorWrap
  },
  data () {
    return {
      myConfig: {
        serverUrl: '/ueditor/ue',
        initialFrameHeight: 400
      },
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 22
      },
      wrapperButtonCol: {
        span: 22, offset: 2
      },
      columns: [],
      data: [],
      pagination: {},
      buttons: [],
      actionButtons: [],
      cuVisible: false,
      cuTitle: '新增活动',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      info: {
        id: 0,
        title: '',
        subTitle: '',
        clsId: '',
        clsName: '',
        price: 0,
        strokeDay: 0,
        site: '',
        masterImg: '',
        subImg: '',
        r1: '',
        r2: '',
        r3: '',
        r4: '',
        attrs: '',
        tags: '',
        busUserId: ''
      },
      uploadImgLoading: false,
      attrs: [],
      busUsers: []
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
        title: '标题',
        dataIndex: 'title',
        width: 60
      }, {
        title: '价格',
        dataIndex: 'price',
        width: 80
      }, {
        title: '类型',
        dataIndex: 'clsName',
        width: 80
      }, {
        title: '天数',
        dataIndex: 'strokeDay',
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
              title: '',
              subTitle: '',
              clsId: '',
              clsName: '',
              price: 0,
              strokeDay: 0,
              site: '',
              masterImg: '',
              subImg: '',
              r1: '',
              r2: '',
              r3: '',
              r4: '',
              attrs: '',
              tags: '',
              busUserId: ''
            }

            this.attrs.forEach(f => {
              if (f.isCheck === 0) {
                f.selectItems = ''
              } else if (f.isCheck === 1) {
                f.selectItems = []
              }
            })

            this.cuVisible = true
            this.cuTitle = '新增活动'
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
            let result = await api.getPlayActivityDetail({
              id: e.id
            })

            if (result) {
              result = result.data
              this.info = {
                id: result.id,
                title: result.title,
                subTitle: result.subTitle,
                clsId: result.clsId,
                clsName: result.clsName,
                price: parseInt(result.price / 100),
                strokeDay: result.strokeDay,
                site: result.site,
                masterImg: result.masterImg,
                subImg: result.subImg,
                r1: result.r1,
                r2: result.r2,
                r3: result.r3,
                r4: result.r4,
                attrs: result.attrs ? JSON.parse(result.attrs) : [],
                tags: result.tags,
                busUserId: result.busUserId
              }

              if (this.info.attrs.length > 0) {
                this.attrs.forEach(f => {
                  if (f.isCheck === 0) {
                    f.selectItems = ''
                  } else if (f.isCheck === 1) {
                    f.selectItems = []
                  }
                })
                for (let i = 0, j = this.info.attrs.length; i < j; i++) {
                  let selAttr = this.info.attrs[i]
                  let findAttr = this.attrs.find(f => {
                    return f.id === selAttr.id
                  })
                  if (findAttr.isCheck === 0) {
                    findAttr.selectItems = selAttr.val
                  } else if (findAttr.isCheck === 1) {
                    findAttr.selectItems.push(selAttr.val)
                  }
                }
              }

              this.cuVisible = true
              this.cuTitle = '修改活动'
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
              let result = await api.delPlayActivity({
                id: e.id
              })
              if (result) {
                this.$message.success('活动删除成功！')
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
      this.getAttrs()
      this.getBusiness()
    },
    async getAttrs () {
      let result = await api.getAttr({
        attrType: 2
      })
      if (result) {
        result = result.data
        result.list.forEach(item => {
          this.attrs.push({
            id: item.id,
            attrName: item.attrName,
            isCheck: item.isCheck,
            options: item.attrValues ? item.attrValues.map(m => {
              return m.attrValue
            }) : [],
            selectItems: item.isCheck === 1 ? [] : '',
            defaultItems: item.isCheck === 1 ? [] : ''
          })
        })
      }
    },
    async getBusiness () {
      let result = await api.getBusinessUser({
        pageSize: 99999999,
        current: 1
      })
      if (result) {
        this.busUsers = result.data.list
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
      let result = await api.getPlayActivity({
        ...param
      })
      this.data = []
      if (result) {
        result = result.data
        result.list.forEach(item => {
          this.data.push({
            key: item.id,
            id: item.id,
            title: item.title,
            price: item.price / 100,
            clsName: item.clsName,
            strokeDay: item.strokeDay,
            site: item.site,
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

      this.info.price = parseInt(this.info.price) * 100
      this.info.clsName = '办年会'

      let result
      if (this.info.id > 0) {
        result = await api.editPlayActivity({
          ...this.info
        })
      } else {
        result = await api.addPlayActivity({
          ...this.info
        })
      }

      if (result) {
        this.info = {
          id: 0,
          title: '',
          subTitle: '',
          clsId: '',
          clsName: '',
          price: 0,
          strokeDay: 0,
          site: '',
          masterImg: '',
          subImg: '',
          r1: '',
          r2: '',
          r3: '',
          r4: '',
          attrs: '',
          tags: '',
          busUserId: ''
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
        this.info.masterImg = info.file.response.data.filePath
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
    },
    onAttrChange (changeValues) {
      let attrList = []
      let tagList = this.info.tags.split(',')
      this.attrs.forEach(f => {
        if (f.isCheck === 0) {
          if (f.selectItems !== '') {
            attrList.push({
              id: f.id,
              key: f.attrName,
              val: f.selectItems
            })
            tagList.push(f.selectItems)
          }
        } else if (f.isCheck === 1) {
          if (f.selectItems && f.selectItems.length > 0) {
            f.selectItems.forEach(f1 => {
              attrList.push({
                id: f.id,
                key: f.attrName,
                val: f1
              })
              tagList.push(f1)
            })
          }
        }
      })

      this.info.attrs = attrList
      this.info.tags = [...new Set(tagList)].toString()
    }
  }
}
</script>
