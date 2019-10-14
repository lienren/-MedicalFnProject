<template>
  <div>
    <iTable
      :btns="buttons"
      :actionBtns="actionButtons"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :height="tableHeight"
      @on-change="handleTableChange"
    ></iTable>
    <a-modal
      style="top: 20px;"
      width="80%"
      :title="cuTitle"
      v-model="cuVisible"
      @ok="addOrupdateAction"
      :okText="cuConfirmText"
      cancelText="取消"
      :confirmLoading="cuConfirmLoading"
    >
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="业务人员">
          <a-select style="width: 120px" v-model="info.busUserId">
            <a-select-option
              v-for="(item, index) in busUsers"
              :key="index"
              :value="item.id"
            >{{item.busName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="标题">
          <a-input placeholder="请输入标题" v-model="info.title"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="副标题">
          <a-input placeholder="请输入副标题" v-model="info.subTitle"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="价格">
          <a-input placeholder="请输入价格" v-model="info.price"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="分数">
          <a-input-number :min="1" v-model="info.score" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="推荐理由">
          <a-input placeholder="请输入推荐理由" v-model="info.reason"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="行程天数">
          <a-input-number :min="1" v-model="info.strokeDay" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="适合人数">
          最少
          <a-input-number :min="1" v-model="info.minPeopleNum" />&nbsp;&nbsp; 最多
          <a-input-number :min="1" v-model="info.maxPeopleNum" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主图">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action="//manage.youngplay.net/base/uploadfile"
            :beforeUpload="uploadImgBeforeUpload"
            @change="uploadImgHandleChange"
          >
            <img
              v-if="info.masterImg"
              :src="info.masterImg"
              alt="avatar"
              style="height:100px;width:auto;"
            />
            <div v-else>
              <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传主图</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="副图">
          <a-upload
            action="http://manage.youngplay.net/base/uploadfile"
            listType="picture-card"
            :fileList="uploadSubImgFileList"
            @preview="handleSubImgPreview"
            @change="handleSubImgChange"
          >
            <div v-if="uploadSubImgFileList.length < 5">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传副图</div>
            </div>
          </a-upload>
          <a-modal :visible="previewSubImgVisible" :footer="null" @cancel="handleSubImgCancel">
            <img alt="example" style="width: 100%" :src="previewSubImage" />
          </a-modal>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="套餐">
          <a-row type="flex" justify="start" :gutter="16">
            <a-col :span="6" v-for="(item, index) in info.packAge" :key="index">
              <a-card :title="item.title">
                <a href="#" slot="extra" title="删除" @click="delPackage(index)">－</a>
                <p>{{item.remark}}</p>
                <p>¥{{item.price}}{{item.unit}}</p>
              </a-card>
            </a-col>
          </a-row>
          <a-button type="primary" @click="showPackage=true">新增套餐</a-button>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="位置" key="1">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r1" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="产品说明" key="2">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r2" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="费用说明" key="3">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r3" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="行程安排" key="4">
              <div style="line-height:0;">
                <vue-ueditor-wrap v-model="info.r4" :config="myConfig"></vue-ueditor-wrap>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="属性">
          <template v-for="(attr, index) in attrs">
            <div
              :key="index+'-div'"
              style="font-size:14px;font-weight:bold;"
            >{{attr.attrName}}（{{attr.isCheck===1?'多选':'单选'}}）</div>
            <a-radio-group
              v-if="attr.isCheck===0"
              :key="index+'-radio'"
              :options="attr.options"
              :defaultValue="attr.defaultItems"
              v-model="attr.selectItems"
              @change="onAttrChange"
            />
            <a-checkbox-group
              v-if="attr.isCheck===1"
              :key="index+'-check'"
              :options="attr.options"
              :defaultValue="attr.defaultItems"
              v-model="attr.selectItems"
              @change="onAttrChange"
            />
          </template>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关键字">
          <a-input placeholder="请输入关键字" v-model="info.tags"></a-input>
          <p style="color:#ff0000;">*关键字之间用英文逗号分隔</p>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      width="80%"
      title="新增套餐"
      v-model="showPackage"
      @ok="addPackage"
      okText="确认"
      cancelText="取消"
    >
      <a-form>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="套餐标题">
          <a-input placeholder="请输入套餐标题" v-model="packAgeInfo.title"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="套餐描述">
          <a-input placeholder="请输入套餐描述" v-model="packAgeInfo.remark"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="套餐价格">
          <a-input placeholder="请输入套餐价格" v-model="packAgeInfo.price"></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="套餐单位">
          <a-input placeholder="请输入套餐单位" v-model="packAgeInfo.unit"></a-input>
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
      cuTitle: '新增陶冶户外',
      cuConfirmLoading: false,
      cuConfirmText: '确认并保存',
      info: {
        id: 0,
        title: '',
        subTitle: '',
        price: 0,
        score: 0,
        reason: '',
        strokeDay: 0,
        minPeopleNum: 0,
        maxPeopleNum: 0,
        masterImg: '',
        subImg: '',
        r1: '',
        r2: '',
        r3: '',
        r4: '',
        attrs: '',
        tags: '',
        busUserId: '',
        packAge: []
      },
      busUsers: [],
      uploadImgLoading: false,
      attrs: [],
      uploadSubImgFileList: [],
      previewSubImgVisible: false,
      previewSubImage: '',
      showPackage: false,
      packAgeInfo: {
        title: '',
        remark: '',
        price: 0,
        unit: '/人'
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
        title: '标题',
        dataIndex: 'title',
        width: 60
      }, {
        title: '价格',
        dataIndex: 'price',
        width: 80
      }, {
        title: '分数',
        dataIndex: 'score',
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
            this.uploadSubImgFileList = []
            this.info = {
              id: 0,
              title: '',
              subTitle: '',
              price: 0,
              score: 0,
              reason: '',
              strokeDay: 0,
              minPeopleNum: 0,
              maxPeopleNum: 0,
              masterImg: '',
              subImg: '',
              r1: '',
              r2: '',
              r3: '',
              r4: '',
              attrs: '',
              tags: '',
              busUserId: '',
              packAge: []
            }

            this.attrs.forEach(f => {
              if (f.isCheck === 0) {
                f.selectItems = ''
              } else if (f.isCheck === 1) {
                f.selectItems = []
              }
            })

            this.cuVisible = true
            this.cuTitle = '新增陶冶户外'
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
            this.uploadSubImgFileList = []
            let result = await api.getPlayTourYeDetail({
              id: e.id
            })

            if (result) {
              result = result.data
              this.info = {
                id: result.id,
                title: result.title,
                subTitle: result.subTitle,
                price: parseInt(result.price / 100),
                score: result.score,
                reason: result.reason,
                strokeDay: result.strokeDay,
                minPeopleNum: result.minPeopleNum,
                maxPeopleNum: result.maxPeopleNum,
                masterImg: result.masterImg,
                subImg: result.subImg,
                r1: result.r1,
                r2: result.r2,
                r3: result.r3,
                r4: result.r4,
                attrs: result.attrs ? JSON.parse(result.attrs) : [],
                tags: result.tags,
                busUserId: result.busUserId,
                packAge: result.packAge
              }

              if (this.info.subImg && this.info.subImg.length > 0) {
                this.info.subImg = JSON.parse(this.info.subImg)
                this.uploadSubImgFileList = this.info.subImg.map((m, i) => {
                  return {
                    uid: i.toString(),
                    name: m.substring(m.lastIndexOf('/')),
                    status: 'done',
                    url: m
                  }
                })
              }

              if (this.info.packAge && this.info.packAge.length > 0) {
                this.info.packAge = JSON.parse(this.info.packAge)
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
                  if (findAttr) {
                    if (findAttr.isCheck === 0) {
                      findAttr.selectItems = selAttr.val
                    } else if (findAttr.isCheck === 1) {
                      findAttr.selectItems.push(selAttr.val)
                    }
                  }
                }
              }

              this.cuVisible = true
              this.cuTitle = '修改陶冶户外'
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
              let result = await api.delPlayTourYe({
                id: e.id
              })
              if (result) {
                this.$message.success('陶冶户外删除成功！')
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
        attrType: 6
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
      let result = await api.getPlayTourYe({
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
            score: item.score,
            strokeDay: item.strokeDay,
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

      // 保存副图
      if (this.uploadSubImgFileList) {
        if (this.uploadSubImgFileList.length > 0) {
          this.info.subImg = this.uploadSubImgFileList.map(m => {
            return m.url || m.response.data.filePath
          })
          this.info.subImg = JSON.stringify(this.info.subImg)
        } else {
          this.info.subImg = '[]'
        }
      }

      let result
      if (this.info.id > 0) {
        result = await api.editPlayTourYe({
          ...this.info
        })
      } else {
        result = await api.addPlayTourYe({
          ...this.info
        })
      }

      if (result) {
        this.info = {
          id: 0,
          title: '',
          subTitle: '',
          price: 0,
          score: 0,
          reason: '',
          strokeDay: 0,
          minPeopleNum: 0,
          maxPeopleNum: 0,
          masterImg: '',
          subImg: '',
          r1: '',
          r2: '',
          r3: '',
          r4: '',
          attrs: '',
          tags: '',
          busUserId: '',
          packAge: []
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
    handleSubImgCancel () {
      this.previewSubImgVisible = false
    },
    handleSubImgPreview (file) {
      this.previewSubImage = file.url || file.thumbUrl
      this.previewSubImgVisible = true
    },
    handleSubImgChange ({ fileList }) {
      console.log('fileList:', fileList)
      this.uploadSubImgFileList = fileList
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
    },
    addPackage () {
      this.info.packAge.push({
        ...this.packAgeInfo
      })

      this.packAgeInfo = {
        title: '',
        remark: '',
        price: 0,
        unit: '/人'
      }

      this.showPackage = false
    },
    delPackage (index) {
      if (this.info.packAge.length > 0) {
        this.info.packAge.splice(index, 1)
      }
    }
  }
}
</script>
