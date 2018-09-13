<template>
  <div>
    <a-form>

      <a-form-item :wrapperCol="wrapperUEditCol">
        <div style="line-height:0;">
          <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="wrapperButtonCol">
        <a-button-group>
          <a-button @click="clearContent">清空</a-button>
          <a-button type='primary' @click="saveContent">确认保存</a-button>
        </a-button-group>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>

import VueUeditorWrap from 'vue-ueditor-wrap'
import api from '../../api/bs'

export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      myConfig: {
        serverUrl: '/ueditor/ue',
        initialFrameHeight: 400
      },
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 }
      },
      wrapperUEditCol: {
        span: 14,
        offset: 4
      },
      wrapperButtonCol: {
        xs: { span: 14, offset: 4 },
        sm: { span: 14, offset: 4 }
      },
      msg: ''
    }
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      let _this = this
      setTimeout(function () {
        _this.loadContent()
      }, 500)
    },
    async loadContent () {
      let result = await api.getWebSiteConfig({ id: 6 })

      if (result) {
        this.msg = result.result.webConfigContent
      }
    },
    clearContent () {
      this.msg = ''
    },
    async saveContent () {
      let result = await api.saveWebSiteConfig({
        id: 6,
        content: this.msg
      })

      if (result) {
        this.$message.success('更新成功！')
      }
    }
  }
}
</script>
