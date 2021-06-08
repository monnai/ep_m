<template>
  <div>
    <van-sticky>
      <van-nav-bar title="我的">
        <template #left>
          <van-icon :name="require('../../../public/static/image/icon_ep.png')" size="18"/>
        </template>
        <template #right>
          <van-icon :name="require('../../../public/static/image/mine/mine_setting.png')" size=".5rem"
                    @click="state.popShow = true"/>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="mine-wrapper">
      <!--用户基础信息-->
      <div class="user-info">
        <div>
          <van-image
            round
            class="user-photo"
            :src="state.photoPath"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
            </template>
          </van-image>
          <div class="user-info-content">
            <span>{{state.personName}} </span><span><van-badge :content="state.unitName"/></span>
            <span>{{state.title}}</span>
          </div>
        </div>
        <div class="fee">
          <span>{{state.incomeFeeSum}}</span>
          <span>科研到款（万元）</span>
        </div>
      </div>
      <div class="charts-info">
        <div id="project">
        </div>
        <div id="product">
        </div>
      </div>
    </div>
  </div>
  <div>
    <van-popup
      v-model:show="state.popShow"
      closeable
      position="right"
      :style="{ height: '100%', width:'70%' }">
      <div class="pop-cloud-wrap">
        <div class="pop-cloud" v-if="state.roleShow">
          <div class="pop-cloud-title">角色切换</div>
          <div class="pop-cloud-content">
            <template v-for="(val, key, i) in state.roleList" :key="i">
              <van-cell :title="val" is-link @click="doSelectRole(key)"/>
            </template>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
  <van-tabbar route>
    <van-tabbar-item icon="wap-home-o" to="/index">首页</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { reactive, onMounted, inject } from 'vue'
import '@/assets/js/echarts_style'
import { getPersonDetail, selectRole } from '@/request/api'
import { Toast, Dialog } from 'vant'
import { useRouter } from 'vue-router'
import { mobileResultCode } from '@/assets/js/common'

export default {
  setup () {
    const echarts = inject('echarts')
    const state = reactive({
      popShow: false,
      roleShow: !!sessionStorage.getItem('roleList'),
      roleList: JSON.parse(sessionStorage.getItem('roleList')),
      personName: '',
      unitName: '',
      incomeFeeSum: '',
      photoPath: '',
      product: {
        names: [],
        object: [],
        total: 0,
        title: '科研成果'
      },
      project: {
        names: ['主持', '参与'],
        object: [],
        total: 0,
        title: '科研项目'
      }
    })
    const doSelectRole = function (roleId) {
      selectRole({
        switchGroupId: roleId,
        refreshToken: sessionStorage.getItem('session_key')
      }).then(result => {
        if (result.body.code === mobileResultCode.SUCCESS) {
          Toast('角色切换成功')
          sessionStorage.setItem('session_model_authority', result.body.data.item.joinCheckModules)
          setTimeout(() => {
            router.push('/index')
          }, 500)
        }
      })
    }
    onMounted(() => {
      // 请求用户信息接口，并进行数据处理
      getPersonDetail().then(res => {
        const resultData = res.body.data.item.resultData
        state.personName = resultData.personName
        state.unitName = resultData.unitName
        state.incomeFeeSum = resultData.incomeFeeSum
        state.photoPath = resultData.photoPath
        state.title = resultData.title
        // 科研成果
        state.product.names = resultData.productBeans
        state.product.object = resultData.productCount
        let productTotal = 0
        for (const index in resultData.productCount) {
          productTotal += resultData.productCount[index].value
        }
        state.product.total = productTotal
        // 科研项目
        state.project.object = [{
          name: '主持',
          value: resultData.projectCount.preside
        }, {
          name: '参与',
          value: resultData.projectCount.join
        }]
        state.project.total = resultData.projectCount.preside + resultData.projectCount.join
        renderProductCharts()
        renderProjectCharts()
      })
      const renderProductCharts = () => {
        document.getElementById('product').setAttribute('_echarts_instance_', '')
        ecInit(document.getElementById('product'), 'product')
      }
      const renderProjectCharts = () => {
        document.getElementById('project').setAttribute('_echarts_instance_', '')
        ecInit(document.getElementById('project'), 'project')
      }
      const ecInit = (dom, modelId) => {
        let index
        const TrendCharts = echarts.init(dom, 'macarons')
        const chartsData = state[modelId]
        const option = {
          title: {
            text: chartsData.title,
            x: 12,
            y: 33,
            textStyle: {
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 'bold'
            },
            subtextStyle: {
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 'bold'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            extraCssText: 'background: white'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 40,
            top: 60,
            data: chartsData.names
          },
          series: [
            {
              name: chartsData.title,
              type: 'pie',
              radius: ['50%', '70%'],
              left: 60,
              top: 25,
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                formatter: function (data) { // 设置圆饼图中间文字排版
                  return '共' + chartsData.total + '项'
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold',
                  color: '#333'
                }
              },
              labelLine: {
                show: false
              },
              data: chartsData.object
            }
          ]
        }
        TrendCharts.showLoading({
          text: '加载中',
          color: 'rgba(145,213,255,0.85)', // 设置转圈圈字体颜色
          textColor: 'rgba(145,213,255,0.85)', // 设置文字字体颜色
          maskColor: 'rgba(36, 102, 175, 0.05)',
          zlevel: 0
        })
        TrendCharts.setOption(option)
        TrendCharts.dispatchAction(
          {
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
        TrendCharts.hideLoading()
        TrendCharts.on('mouseover', function (e) {
          TrendCharts.dispatchAction(
            {
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: 0
            })
          if (e.dataIndex !== index) {
            TrendCharts.dispatchAction(
              {
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: index
              })
          }
          if (e.dataIndex === 0) {
            TrendCharts.dispatchAction(
              {
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: e.dataIndex
              })
          }
        })

        // 当鼠标离开时，把当前项置为选中
        TrendCharts.on('mouseout', function (e) {
          index = e.dataIndex
          TrendCharts.dispatchAction(
            {
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: e.dataIndex
            })
        })
      }
    })
    const router = useRouter()
    const logout = () => {
      Dialog.confirm({
        title: '注销',
        message: '确认注销登录信息并返回登录页面'
      }).then(() => {
        sessionStorage.setItem('session_model_authority', '')
        sessionStorage.setItem('session_key', '')
        sessionStorage.setItem('roleList', '')
        Toast('注销成功')
        router.push('/login')
      }).catch(() => {
      })
    }
    return {
      state,
      logout,
      doSelectRole
    }
  }
}
</script>

<style scoped>
.user-info {
  height: 200px;
  position: relative;
  width: 100%;
  background-image: url("../../../public/static/image/mine/mine_bg.png");
  background-position: center;
}

.user-photo {
  width: 77px;
  height: 77px;
  position: absolute;
  left: 24px;
  top: 28px;
  background-position: center;
  border-radius: 50%;
  background-repeat: no-repeat;
  box-shadow: 0 0 0 4px rgb(228 228 228);
}

.fee {
  bottom: 0;
  position: absolute;
  width: 90%;
  margin-left: 5%;
  border-radius: 12px 12px 0 0;
  height: 70px;
  display: block;
  background-position: center;
  background-image: url("../../../public/static/image/mine/mine_fee_bg.png");
}

.user-info-content {
  display: block;
  position: absolute;
  left: 118px;
  top: 33px;
  text-align: left;
}

.user-info-content > span {
  vertical-align: middle;
}

.fee > span {
  display: block;
  color: #ffffff;
  text-align: left;
  padding-left: 32px;
  padding-top: 6px;
}

.fee > span:nth-child(1) {
  font-size: 22px;
  font-weight: bold;
}

.user-info-content > span {
  padding: 5px;
}

.user-info-content > span:nth-child(1) {
  font-size: 22px;
  font-weight: bold;
  color: #222222FF;
}

.user-info-content > span:nth-child(2) {
  font-size: 13px;
  color: #C6C6C6;
}

::v-deep(.van-badge) {
  font-size: 14px;
}

.charts-info > div {
  width: 100%;
  height: 220px;
}

.charts-info {
  margin-bottom: 51px;
}

.user-info-content > span:nth-child(3) {
  color: #b3b5b5;
  display: block;
  font-size: 13px;
  margin-right: 12px;
}

/*右侧弹出层*/
::v-deep(.van-popup) {
  background-color: #F5F5F5;
}
.pop-cloud-wrap{
  display: block;
  margin-top: 50px;
  height: 100%;
  overflow: scroll;
}
.pop-cloud{
  margin: 12px 12px 12px 12px;
}
.pop-cloud-title {
  height: auto;
  background: #fff;
  border-radius: 9px 9px 0 0;
  line-height: 36px;
  color: #A1A1A1;
  font-size: 14px;
  text-align: left;
  text-indent: 23px;
}
::v-deep(.van-cell__title) {
  text-align: left;
}

.pop-cloud-content {
  max-height: 400px;
  overflow: scroll;
}

::v-deep(.van-cell--clickable) {
  cursor: pointer;
  text-indent: 8px;
}
</style>
