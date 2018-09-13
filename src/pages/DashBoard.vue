<template>
  <div style="padding:20px;">
    <div style="margin-bottom: 20px;">
      <h2>您好，{{managerName}}</h2>
      <div>{{todayCalendar}} 农历{{lunarCalendar}}</div>
    </div>
    <div style="background-color: #ececec; padding: 20px; margin-bottom: 20px;">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card hoverable title="公众号总关注量" :bordered="false" class="sts-card sts-card-1">
            <iNumberGrow :value="9876" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="用户总注册量" :bordered="false" class="sts-card sts-card-2">
            <iNumberGrow :value="3546" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="用户总访问量" :bordered="false" class="sts-card sts-card-3">
            <iNumberGrow :value="87694" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card hoverable title="健康知识总浏览量" :bordered="false" class="sts-card sts-card-4">
            <iNumberGrow :value="4234" style="letter-spacing:2px;"></iNumberGrow>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div style="margin-bottom: 20px;">
      <a-card style="height:300px;">
        <div slot="title">
          <span style="color:#f56c6c;font-weight:bold;">30天</span> 公众号关注量/用户注册量/用户访问量/健康知识阅读量</div>
        <ve-line v-if="chartVisible" :data="chartData" height="252px"></ve-line>
      </a-card>
    </div>
    <div>
      <a-row :gutter="10">
        <a-col :span="8">
          <a-card hoverable title="投诉与建议" class="cs-items">
            <a-card :bordered="false" class="cs-item">
              <div slot="title">
                <h4>贤心</h4>
                <div style="font-size:10px;color:#999;">2018-08-22 23:54:00</div>
              </div>
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
            </a-card>
            <a-card :bordered="false" class="cs-item">
              <div slot="title">
                <h4>贤心</h4>
                <div style="font-size:10px;color:#999;">2018-08-22 23:54:00</div>
              </div>
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
            </a-card>
            <a-card :bordered="false" class="cs-item">
              <div slot="title">
                <h4>贤心</h4>
                <div style="font-size:10px;color:#999;">2018-08-22 23:54:00</div>
              </div>
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
            </a-card>
            <a-card :bordered="false" class="cs-item">
              <div slot="title">
                <h4>贤心</h4>
                <div style="font-size:10px;color:#999;">2018-08-22 23:54:00</div>
              </div>
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
            </a-card>
            <a-card :bordered="false" class="cs-item">
              <div slot="title">
                <h4>贤心</h4>
                <div style="font-size:10px;color:#999;">2018-08-22 23:54:00</div>
              </div>
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
            </a-card>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable title="热门健康话题" class="cs-items">
            <a-card :bordered="false" class="cs-item">
              <div slot="title">
                <h4>贤心</h4>
                <div style="font-size:10px;color:#999;">2018-08-22 23:54:00</div>
              </div>
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步...</div>
              <div>
                <span style="font-size:10px;color:#999;margin-right:5px;" title="浏览量">
                  <a-icon type="eye-o" />&nbsp;1845</span>
                <span style="font-size:10px;color:#999;" title="点赞量">
                  <a-icon type="like-o" />&nbsp;10</span>
              </div>
            </a-card>
            <a-card title="贤心" :bordered="false" class="cs-item">
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
              <div style="color:#999;">5月30日 00:00</div>
            </a-card>
            <a-card title="贤心" :bordered="false" class="cs-item">
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
              <div style="color:#999;">5月30日 00:00</div>
            </a-card>
            <a-card title="贤心" :bordered="false" class="cs-item">
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
              <div style="color:#999;">5月30日 00:00</div>
            </a-card>
            <a-card title="贤心" :bordered="false" class="cs-item">
              <div style="margin-bottom:10px;">作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。</div>
              <div style="color:#999;">5月30日 00:00</div>
            </a-card>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable title="全国用户分布">
            <ve-map v-if="mapVisible" :data="mapData" :settings="mapSettings"></ve-map>
            <a-table size="small" :pagination="false" :bordered="false" :columns="columns" :dataSource="data"></a-table>
          </a-card>
        </a-col>
      </a-row>
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
      mapData: {
        columns: ['位置', '人数'],
        rows: [
          { '位置': '安徽', '人数': 123 }
        ]
      },
      chartVisible: false,
      mapVisible: false,
      mapSettings: {
        mapURLProfix: '/mpApi/data/',
        position: 'china',
        label: {
          normal: {
            show: false,
            textStyle: {
              color: 'rgba(0,0,0,0.4)'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
            areaColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      columns: [{
        title: '排名',
        dataIndex: 'sort'
      }, {
        title: '地区',
        dataIndex: 'area'
      }, {
        title: '人数',
        dataIndex: 'num'
      }],
      data: [{
        sort: 1,
        area: '安徽',
        num: '123'
      }, {
        sort: 2,
        area: '江苏',
        num: '120'
      }]
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
        columns: ['日期', '公众号关注量', '用户注册量', '用户访问量', '健康知识阅读量'],
        rows: [
          { '日期': '1/1', '公众号关注量': 1393, '用户注册量': 1093, '用户访问量': 0.32, '健康知识阅读量': 193 },
          { '日期': '1/2', '公众号关注量': 3530, '用户注册量': 3230, '用户访问量': 0.26, '健康知识阅读量': 230 },
          { '日期': '1/3', '公众号关注量': 2923, '用户注册量': 2623, '用户访问量': 0.76, '健康知识阅读量': 623 },
          { '日期': '1/4', '公众号关注量': 1723, '用户注册量': 1423, '用户访问量': 0.49, '健康知识阅读量': 423 },
          { '日期': '1/5', '公众号关注量': 3792, '用户注册量': 3492, '用户访问量': 0.32, '健康知识阅读量': 492 },
          { '日期': '1/6', '公众号关注量': 4593, '用户注册量': 4293, '用户访问量': 0.78, '健康知识阅读量': 293 },
          { '日期': '1/7', '公众号关注量': 1393, '用户注册量': 1093, '用户访问量': 0.32, '健康知识阅读量': 193 },
          { '日期': '1/8', '公众号关注量': 3530, '用户注册量': 3230, '用户访问量': 0.26, '健康知识阅读量': 230 },
          { '日期': '1/9', '公众号关注量': 2923, '用户注册量': 2623, '用户访问量': 0.76, '健康知识阅读量': 623 },
          { '日期': '1/10', '公众号关注量': 1393, '用户注册量': 1093, '用户访问量': 0.32, '健康知识阅读量': 193 },
          { '日期': '1/11', '公众号关注量': 3530, '用户注册量': 3230, '用户访问量': 0.26, '健康知识阅读量': 230 },
          { '日期': '1/12', '公众号关注量': 2923, '用户注册量': 2623, '用户访问量': 0.76, '健康知识阅读量': 623 },
          { '日期': '1/13', '公众号关注量': 1723, '用户注册量': 1423, '用户访问量': 0.49, '健康知识阅读量': 423 },
          { '日期': '1/14', '公众号关注量': 3792, '用户注册量': 3492, '用户访问量': 0.32, '健康知识阅读量': 492 },
          { '日期': '1/15', '公众号关注量': 4593, '用户注册量': 4293, '用户访问量': 0.78, '健康知识阅读量': 293 },
          { '日期': '1/16', '公众号关注量': 1393, '用户注册量': 1093, '用户访问量': 0.32, '健康知识阅读量': 193 },
          { '日期': '1/17', '公众号关注量': 3530, '用户注册量': 3230, '用户访问量': 0.26, '健康知识阅读量': 230 },
          { '日期': '1/18', '公众号关注量': 2923, '用户注册量': 2623, '用户访问量': 0.76, '健康知识阅读量': 623 },
          { '日期': '1/19', '公众号关注量': 1393, '用户注册量': 1093, '用户访问量': 0.32, '健康知识阅读量': 193 },
          { '日期': '1/20', '公众号关注量': 3530, '用户注册量': 3230, '用户访问量': 0.26, '健康知识阅读量': 230 },
          { '日期': '1/21', '公众号关注量': 2923, '用户注册量': 2623, '用户访问量': 0.76, '健康知识阅读量': 623 },
          { '日期': '1/22', '公众号关注量': 1723, '用户注册量': 1423, '用户访问量': 0.49, '健康知识阅读量': 423 },
          { '日期': '1/23', '公众号关注量': 3792, '用户注册量': 3492, '用户访问量': 0.32, '健康知识阅读量': 492 },
          { '日期': '1/24', '公众号关注量': 4593, '用户注册量': 4293, '用户访问量': 0.78, '健康知识阅读量': 293 },
          { '日期': '1/25', '公众号关注量': 1393, '用户注册量': 1093, '用户访问量': 0.32, '健康知识阅读量': 193 },
          { '日期': '1/26', '公众号关注量': 3530, '用户注册量': 3230, '用户访问量': 0.26, '健康知识阅读量': 230 },
          { '日期': '1/27', '公众号关注量': 2923, '用户注册量': 2623, '用户访问量': 0.76, '健康知识阅读量': 623 },
          { '日期': '1/28', '公众号关注量': 1393, '用户注册量': 1093, '用户访问量': 0.32, '健康知识阅读量': 193 },
          { '日期': '1/29', '公众号关注量': 3530, '用户注册量': 3230, '用户访问量': 0.26, '健康知识阅读量': 230 },
          { '日期': '1/30', '公众号关注量': 2923, '用户注册量': 2623, '用户访问量': 0.76, '健康知识阅读量': 623 },
          { '日期': '1/31', '公众号关注量': 1723, '用户注册量': 1423, '用户访问量': 0.49, '健康知识阅读量': 423 }
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
