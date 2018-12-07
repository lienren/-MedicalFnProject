<template>
  <div style="padding:20px;">
    <div style="margin-bottom: 20px;">
      <h2>您好，{{managerName}}</h2>
      <div>{{todayCalendar}} 农历{{lunarCalendar}}</div>
    </div>
    <div v-if="isShowDataBox" style="background-color: #ececec; padding: 20px; margin-bottom: 20px;">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card hoverable title="今日下单量" :bordered="false" class="sts-card sts-card-1">
            <iNumberGrow :value="todayLoanCount" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="今日收入金额" :bordered="false" class="sts-card sts-card-2">
            <iNumberGrow :value="todayServiceMoney" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="累计下单量" :bordered="false" class="sts-card sts-card-3">
            <iNumberGrow :value="loanCount" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="累计收入金额" :bordered="false" class="sts-card sts-card-4">
            <iNumberGrow :value="serviceMoney" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div style="margin-bottom: 20px;">
      <a-card style="height:300px;">
        <div slot="title">
          <span style="color:#f56c6c;font-weight:bold;">30天</span> 服务费总金额</div>
        <ve-line v-if="chartVisible" :data="chartData" height="252px"></ve-line>
      </a-card>
    </div>
  </div>
</template>

<script>

import api from '../api/proof'
import { iNumberGrow, iTable } from '../components/'

export default {
  components: {
    iNumberGrow,
    iTable
  },
  data () {
    return {
      chartData: {},
      chartVisible: false,
      isShowDataBox: false,
      todayLoanCount: 0,
      todayServiceMoney: 0,
      loanCount: 0,
      serviceMoney: 0,
      columns: [],
      buttons: [],
      actionButtons: [],
      actionButtonsSort: [],
      pagination: {}
    }
  },
  computed: {
    managerName () {
      let userinfo = this.$utils.Store.get('userinfo')
      return userinfo ? userinfo.realName : ''
    },
    todayCalendar () {
      return this.$utils.Date.format(new Date(), 'yyyy年M月d日') + ' ' + this.$utils.Date.getWeek()
    },
    lunarCalendar () {
      return this.$utils.Date.getLunarCalendar()
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
    async init () {
      this.getStsOrders()
    },
    async getStsOrders () {
      this.chartData = {
        columns: ['日期', '下单数', '服务费总金额'],
        rows: []
      }

      let result = await api.getStsOrdersAll({})

      if (result) {
        this.todayLoanCount = result.result.todayLoanCount ? parseInt(result.result.todayLoanCount) : 0
        this.todayServiceMoney = result.result.todayServiceMoney ? parseInt(result.result.todayServiceMoney) : 0
        this.loanCount = result.result.loanCount ? parseInt(result.result.loanCount) : 0
        this.serviceMoney = result.result.serviceMoney ? parseInt(result.result.serviceMoney) : 0
        this.chartData.rows = result.result.month
        this.isShowDataBox = true
        this.chartVisible = true
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .dashboard_body {
    width: 100%;
    display: flex;
    .left {
      flex: 1;
      padding: 0 10px 0 0;
    }
    .right {
      width: 200px;
      min-width: 200px;
      max-width: 200px;
    }
  }
  .sts-card {
    cursor: inherit;
    .ant-card-head {
      border: 0;
      padding: 0 0 0 12px;
    }
    .ant-card-head-title {
      color: #fff;
    }
  }
  .cs-items {
    cursor: inherit;
    .ant-card-body {
      padding: 12px;
    }
    .cs-item {
      border-bottom: 1px solid #eee;
      .ant-card-head {
        min-height: 32px;
        border: 0;
        padding: 12px 0 0 12px;
        .ant-card-head-title {
          padding: 0;
        }
      }
      &:last-child {
        border: 0;
      }
    }
  }
  .sts-card-1 {
    .ant-card-head {
      background-color: #409eff;
    }
  }
  .sts-card-2 {
    .ant-card-head {
      background-color: #67c23a;
    }
  }
  .sts-card-3 {
    .ant-card-head {
      background-color: #e6a23c;
    }
  }
  .sts-card-4 {
    .ant-card-head {
      background-color: #009688;
    }
  }
</style>
