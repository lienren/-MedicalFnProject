<template>
  <div>
    <a-form>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='类型'>
        <a-radio-group @change="onChange" v-model="ruleType">
          <a-radio-button value="fix">按固定金额</a-radio-button>
          <a-radio-button value="scale">按借款金额比例</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="ruleType==='fix'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='值'>
        <a-input placeholder='请输入固定金额' v-model="ruleVal" style="width:100px;"></a-input>&nbsp;元
      </a-form-item>
      <a-form-item v-if="ruleType==='scale'" :labelCol="labelCol" :wrapperCol="wrapperCol" label='值'>
        <a-input placeholder='请输入借款金额比例' v-model="ruleVal" style="width:100px;"></a-input>&nbsp;%
      </a-form-item>
      <a-form-item :wrapperCol="wrapperButtonCol">
        <a-row>
          <a-col :span="4">
            <a-button icon="to-top" @click="clear">清空</a-button>
          </a-col>
          <a-col :span="4">
            <a-button icon="save" type="primary" @click="setConfig">确认保存</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import api from '../../api/proof'

export default {
  components: {},
  data () {
    return {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 }
      },
      wrapperButtonCol: {
        xs: { span: 14, offset: 2 },
        sm: { span: 14, offset: 2 }
      },
      ruleType: '',
      ruleVal: ''
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
    async init () {
      let result = await api.getProofConfig({
        tpName: 'serviceMoney'
      })
      if (result) {
        result = result.result
        if (result.tpValue) {
          result.tpValue = JSON.parse(result.tpValue)
          this.ruleType = result.tpValue.ruleType
          this.ruleVal = result.tpValue.ruleVal / 100
        }
      }
    },
    clear () {
      this.ruleType = ''
      this.ruleVal = ''
    },
    async setConfig () {
      let result = await api.setProofConfig({
        tpName: 'serviceMoney',
        tpValue: {
          ruleType: this.ruleType,
          ruleVal: parseInt(this.ruleVal * 100)
        }
      })

      if (result) {
        this.$message.success('服务费更新成功!')
      }
    }
  }
}
</script>
