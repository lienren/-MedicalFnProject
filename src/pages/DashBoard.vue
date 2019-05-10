<template>
  <div style="padding:20px;">
    <div style="margin-bottom: 20px;">
      <h2>您好，{{managerName}}</h2>
      <div>{{todayCalendar}} 农历{{lunarCalendar}}</div>
    </div>
    <div style="background-color: #ececec; padding: 20px; margin-bottom: 20px;">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card hoverable title="用户总访问量" :bordered="false" class="sts-card sts-card-1">
            <iNumberGrow :value="87694" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="用户总注册量" :bordered="false" class="sts-card sts-card-2">
            <iNumberGrow :value="3546" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="用户总点击量" :bordered="false" class="sts-card sts-card-3">
            <iNumberGrow :value="9876" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="需求总订单量" :bordered="false" class="sts-card sts-card-4">
            <iNumberGrow :value="4234" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div style="margin-bottom: 20px;">
      <a-card style="height:300px;">
        <div slot="title">
          <span style="color:#f56c6c;font-weight:bold;">30天</span> 用户访问量/用户注册量/用户点击量/需求订单量</div>
        <ve-line v-if="chartVisible" :data="chartData" height="252px"></ve-line>
      </a-card>
    </div>
  </div>
</template>

<script>

import { iNumberGrow } from '../components/'

export default {
  components: {
    iNumberGrow
  },
  data () {
    return {
      chartData: {},
      chartVisible: false
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
    init () {
      this.chartData = {
        columns: ['日期', '用户访问量', '用户注册量', '用户点击量', '需求订单量'],
        rows: [
          { '日期': '1/1', '用户访问量': 1393, '用户注册量': 1093, '用户点击量': 0.32, '需求订单量': 193 },
          { '日期': '1/2', '用户访问量': 3530, '用户注册量': 3230, '用户点击量': 0.26, '需求订单量': 230 },
          { '日期': '1/3', '用户访问量': 2923, '用户注册量': 2623, '用户点击量': 0.76, '需求订单量': 623 },
          { '日期': '1/4', '用户访问量': 1723, '用户注册量': 1423, '用户点击量': 0.49, '需求订单量': 423 },
          { '日期': '1/5', '用户访问量': 3792, '用户注册量': 3492, '用户点击量': 0.32, '需求订单量': 492 },
          { '日期': '1/6', '用户访问量': 4593, '用户注册量': 4293, '用户点击量': 0.78, '需求订单量': 293 },
          { '日期': '1/7', '用户访问量': 1393, '用户注册量': 1093, '用户点击量': 0.32, '需求订单量': 193 },
          { '日期': '1/8', '用户访问量': 3530, '用户注册量': 3230, '用户点击量': 0.26, '需求订单量': 230 },
          { '日期': '1/9', '用户访问量': 2923, '用户注册量': 2623, '用户点击量': 0.76, '需求订单量': 623 },
          { '日期': '1/10', '用户访问量': 1393, '用户注册量': 1093, '用户点击量': 0.32, '需求订单量': 193 },
          { '日期': '1/11', '用户访问量': 3530, '用户注册量': 3230, '用户点击量': 0.26, '需求订单量': 230 },
          { '日期': '1/12', '用户访问量': 2923, '用户注册量': 2623, '用户点击量': 0.76, '需求订单量': 623 },
          { '日期': '1/13', '用户访问量': 1723, '用户注册量': 1423, '用户点击量': 0.49, '需求订单量': 423 },
          { '日期': '1/14', '用户访问量': 3792, '用户注册量': 3492, '用户点击量': 0.32, '需求订单量': 492 },
          { '日期': '1/15', '用户访问量': 4593, '用户注册量': 4293, '用户点击量': 0.78, '需求订单量': 293 },
          { '日期': '1/16', '用户访问量': 1393, '用户注册量': 1093, '用户点击量': 0.32, '需求订单量': 193 },
          { '日期': '1/17', '用户访问量': 3530, '用户注册量': 3230, '用户点击量': 0.26, '需求订单量': 230 },
          { '日期': '1/18', '用户访问量': 2923, '用户注册量': 2623, '用户点击量': 0.76, '需求订单量': 623 },
          { '日期': '1/19', '用户访问量': 1393, '用户注册量': 1093, '用户点击量': 0.32, '需求订单量': 193 },
          { '日期': '1/20', '用户访问量': 3530, '用户注册量': 3230, '用户点击量': 0.26, '需求订单量': 230 },
          { '日期': '1/21', '用户访问量': 2923, '用户注册量': 2623, '用户点击量': 0.76, '需求订单量': 623 },
          { '日期': '1/22', '用户访问量': 1723, '用户注册量': 1423, '用户点击量': 0.49, '需求订单量': 423 },
          { '日期': '1/23', '用户访问量': 3792, '用户注册量': 3492, '用户点击量': 0.32, '需求订单量': 492 },
          { '日期': '1/24', '用户访问量': 4593, '用户注册量': 4293, '用户点击量': 0.78, '需求订单量': 293 },
          { '日期': '1/25', '用户访问量': 1393, '用户注册量': 1093, '用户点击量': 0.32, '需求订单量': 193 },
          { '日期': '1/26', '用户访问量': 3530, '用户注册量': 3230, '用户点击量': 0.26, '需求订单量': 230 },
          { '日期': '1/27', '用户访问量': 2923, '用户注册量': 2623, '用户点击量': 0.76, '需求订单量': 623 },
          { '日期': '1/28', '用户访问量': 1393, '用户注册量': 1093, '用户点击量': 0.32, '需求订单量': 193 },
          { '日期': '1/29', '用户访问量': 3530, '用户注册量': 3230, '用户点击量': 0.26, '需求订单量': 230 },
          { '日期': '1/30', '用户访问量': 2923, '用户注册量': 2623, '用户点击量': 0.76, '需求订单量': 623 },
          { '日期': '1/31', '用户访问量': 1723, '用户注册量': 1423, '用户点击量': 0.49, '需求订单量': 423 }
        ]
      }

      this.chartVisible = true
      this.mapVisible = true
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
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
