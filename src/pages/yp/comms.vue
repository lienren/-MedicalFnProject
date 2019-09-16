<template>
  <div>
    <a-tabs defaultActiveKey="1" tabPosition="left">
      <a-tab-pane tab="首页大图" key="1">
        <p style="color:#ff0000;">*横幅尺寸1920*500，只能是jpg或png格式</p>
        <a-form>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅1图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadBigImgHandleChange1"
            >
              <img
                v-if="bigBannerLink.length>0&&bigBannerLink[0].imgUrl"
                :src="bigBannerLink[0].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅1链接地址">
            <a-input
              v-if="bigBannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bigBannerLink[0].url"
            ></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅2图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadBigImgHandleChange2"
            >
              <img
                v-if="bigBannerLink.length>0&&bigBannerLink[1].imgUrl"
                :src="bigBannerLink[1].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅2链接地址">
            <a-input
              v-if="bigBannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bigBannerLink[1].url"
            ></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅3图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadBigImgHandleChange3"
            >
              <img
                v-if="bigBannerLink.length>0&&bigBannerLink[2].imgUrl"
                :src="bigBannerLink[2].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅3链接地址">
            <a-input
              v-if="bigBannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bigBannerLink[2].url"
            ></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅4图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadBigImgHandleChange4"
            >
              <img
                v-if="bigBannerLink.length>0&&bigBannerLink[3].imgUrl"
                :src="bigBannerLink[3].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅4链接地址">
            <a-input
              v-if="bigBannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bigBannerLink[3].url"
            ></a-input>
          </a-form-item>
          <a-form-item :wrapperCol="wrapperButtonCol">
            <a-button-group>
              <a-button @click="clearIndexBigBanner">清空</a-button>
              <a-button type="primary" @click="saveIndexBigBanner">确认保存</a-button>
            </a-button-group>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="首页Banner" key="2">
        <p style="color:#ff0000;">*横幅尺寸740*232，只能是jpg或png格式</p>
        <a-form>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅1图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadImgHandleChange1"
            >
              <img
                v-if="bannerLink.length>0&&bannerLink[0].imgUrl"
                :src="bannerLink[0].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅1链接地址">
            <a-input
              v-if="bannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bannerLink[0].url"
            ></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅2图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadImgHandleChange2"
            >
              <img
                v-if="bannerLink.length>0&&bannerLink[1].imgUrl"
                :src="bannerLink[1].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅2链接地址">
            <a-input
              v-if="bannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bannerLink[1].url"
            ></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅3图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadImgHandleChange3"
            >
              <img
                v-if="bannerLink.length>0&&bannerLink[2].imgUrl"
                :src="bannerLink[2].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅3链接地址">
            <a-input
              v-if="bannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bannerLink[2].url"
            ></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅4图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//manage.youngplay.net/base/uploadfile"
              :beforeUpload="uploadImgBeforeUpload"
              @change="uploadImgHandleChange4"
            >
              <img
                v-if="bannerLink.length>0&&bannerLink[3].imgUrl"
                :src="bannerLink[3].imgUrl"
                alt="avatar"
                style="width:200px;height:auto;"
              />
              <div v-else>
                <a-icon :type="uploadImgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传横幅</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="横幅4链接地址">
            <a-input
              v-if="bannerLink.length>0"
              placeholder="请输入链接地址，需要包含http或https"
              v-model="bannerLink[3].url"
            ></a-input>
          </a-form-item>
          <a-form-item :wrapperCol="wrapperButtonCol">
            <a-button-group>
              <a-button @click="clearIndexBanner">清空</a-button>
              <a-button type="primary" @click="saveIndexBanner">确认保存</a-button>
            </a-button-group>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import api from '../../api/youngplay'

export default {
  components: {

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
      uploadImgLoading: false,
      bannerLink: [],
      bigBannerLink: []
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
      this.getIndexBannerLink()
      this.getIndexBigBannerLink()
    },
    async getIndexBannerLink () {
      let result = await api.getIndexBannerLink()

      if (result && result.data) {
        this.bannerLink = result.data
      }
    },
    async getIndexBigBannerLink () {
      let result = await api.getIndexBigBannerLink()

      if (result && result.data) {
        this.bigBannerLink = result.data
      }
    },
    uploadImgHandleChange1 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bannerLink[0].imgUrl = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadImgHandleChange2 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bannerLink[1].imgUrl = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadImgHandleChange3 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bannerLink[2].imgUrl = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadImgHandleChange4 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bannerLink[3].imgUrl = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadBigImgHandleChange1 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bigBannerLink[0].imgUrl = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadBigImgHandleChange2 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bigBannerLink[1].imgUrl = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadBigImgHandleChange3 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bigBannerLink[2].imgUrl = info.file.response.data.filePath
        this.uploadImgLoading = false
      }
    },
    uploadBigImgHandleChange4 (info) {
      if (info.file.status === 'uploading') {
        this.uploadImgLoading = true
        return
      }
      if (info.file.status === 'done') {
        this.bigBannerLink[3].imgUrl = info.file.response.data.filePath
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
    clearIndexBanner () {
      this.bannerLink = [
        {
          url: '',
          imgUrl: ''
        },
        {
          url: '',
          imgUrl: ''
        },
        {
          url: '',
          imgUrl: ''
        },
        {
          url: '',
          imgUrl: ''
        }
      ]
    },
    async saveIndexBanner () {
      await api.setIndexBannerLink({
        bannerLink: this.bannerLink
      })
      this.$message.success('保存成功!')
    },
    clearIndexBigBanner () {
      this.bigBannerLink = [
        {
          url: '',
          imgUrl: ''
        },
        {
          url: '',
          imgUrl: ''
        },
        {
          url: '',
          imgUrl: ''
        },
        {
          url: '',
          imgUrl: ''
        }
      ]
    },
    async saveIndexBigBanner () {
      await api.setIndexBigBannerLink({
        bannerLink: this.bigBannerLink
      })
      this.$message.success('保存成功!')
    }
  }
}
</script>
