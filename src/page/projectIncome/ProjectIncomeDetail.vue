<!--详情页页面-->
<template>
  <div>
    <!--吸顶操作：页头、审核提示、标题进行吸顶-->
    <van-sticky ref="offTop">
      <!--页头-->
      <van-nav-bar
        :title="header"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <!--页头-右侧按钮点击-->
        <template #right>
          <van-icon name="wap-home-o" size="18"/>
        </template>
      </van-nav-bar>
      <!--审核状态提示栏-->
      <ep-notice-bar v-model:check-status="checkStatus" :click="openAuditFlow"/>
      <!--标题栏-->
      <div class="detail-title-wrap">
        <div class="detail-title">{{title}}</div>
      </div>
    </van-sticky>
    <!--详情页信息展示：分为基础信息、人员信息、预算信息、档案信息-->
    <van-tabs sticky animated swipeable :offset-top="offsetTop">
      <div class="ep-detail-panel-wrapper main-wrap">
        <van-tab title="项目入账信息">
            <van-cell-group title="入账信息">
                <van-cell title="内冲号" :value="state.cwIncome.dch"></van-cell>
                <van-cell title="来款单位" :value="state.cwIncome.incomeUnit"></van-cell>
                <van-cell title="来款时间" :value="state.cwIncome.incomeDate"></van-cell>
                <van-cell title="来款金额" :value="state.cwIncome.feeValue"></van-cell>
                <van-cell title="可认金额" :value="state.cwIncome.notClaimFee"></van-cell>
            </van-cell-group>
            <van-cell-group title="项目信息">
                <van-cell title="项目名称" :value="state.vProject.name"></van-cell>
                <van-cell title="负责人" :value="state.vProject.chargerName"></van-cell>
                <van-cell title="项目性质" :value="state.vProject.projectType"></van-cell>
                <van-cell title="项目分类" :value="state.vProject.projectClass"></van-cell>
                <van-cell title="合同金额" :value="state.vProject.feeValue"></van-cell>
                <van-cell title="入账信息" :value="state.vProject.availableFee"></van-cell>
                <van-cell title="所属单位" :value="state.vProject.unitId"></van-cell>
            </van-cell-group>
            <van-cell-group title="认领信息">
              <van-cell title="经办人" :value="state.transactor"></van-cell>
              <van-cell title="经办人手机" :value="state.transactorPhone"></van-cell>
              <van-cell title="认领金额" :value="state.claimFee"></van-cell>
              <van-cell title="来款类型" :value="state.incomeType"></van-cell>
              <van-cell title="是否外拨" :value="state.haveOutBoundFee"></van-cell>
            </van-cell-group>
          <div>
          </div>
        </van-tab>
      </div>
    </van-tabs>
    <!--审核流程弹出层-->
    <template @click="openAuditFlow">
      <ep-work-flow-panel ref="flowPanel" :request="getWorkFlow" :callback="callBackWorkFlow"
                          :check-status="checkStatus"/>
    </template>
    <!--页脚-审核操作栏-->
    <ep-audit-bar :callback="callbackAudit" :show="auditShow"/>
  </div>
</template>

<script>
import { provide, ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { base, workflow, workflowLog } from '@/request/api'
import EpNoticeBar from '@/components/EpNoticeBar'
import EpWorkFlowPanel from '@/components/EpWorkFlowPanel'
import EpAuditBar from '@/components/EpAuditBar'

export default {
  components: {
    EpNoticeBar,
    EpWorkFlowPanel,
    EpAuditBar
  },
  setup () {
    const title = ref()
    const flowPanel = ref()
    const checkStatus = ref()
    const router = useRouter()
    const auditShow = ref(false)
    const state = reactive({
      claimFee: '-',
      cwIncome: {},
      vProject: {
        name: '',
        chargerName: '',
        projectType: '',
        projectClass: '',
        feeValue: '',
        availableFee: '',
        unitId: ''
      },
      incomeType: '',
      transactor: '',
      transactorPhone: '',
      haveOutBoundFee: ''
    })
    const header = sessionStorage.getItem('modelName') + '详情'
    const onClickLeft = function () {
      router.go(-1)
    }
    const onClickRight = function () {
      router.push('/index')
    }
    const openAuditFlow = function () {
      flowPanel.value.show()
    }
    const offsetTop = ref()

    onMounted(() => {
      basic()
    })
    const basic = () => {
      base().then(res => {
        const data = res.body.data
        title.value = data.title
        nextTick(() => {
          offsetTop.value = offTop.value.$el.offsetHeight
        })
        auditShow.value = data.isCanCheck
        checkStatus.value = data.checkstatus
        const item = data.item
        state.claimFee = item.claimFee
        state.haveOutBoundFee = item.haveOutBoundFee
        state.incomeType = item.incomeType
        state.cwIncome = item.cwIncome
        state.incomeType = item.cwIncome === 'indirect' ? '间接经费' : item.cwIncome === 'direct' ? '直接经费' : '混合经费'
        state.transactor = item.transactor
        state.transactorPhone = item.transactorPhone
        state.vProject = item.vProject
      })
    }
    const getWorkFlow = () => {
      return workflow()
    }
    const callBackWorkFlow = (res, dataArray) => {
      const resArray = JSON.parse(res.body.data.item)
      for (let i = 0; i < resArray.length; i++) {
        dataArray.push({
          name: resArray[i].name,
          checkStatus: resArray[i].type
        })
      }
    }
    const getWorkFlowLog = () => {
      return workflowLog()
    }
    const callBackWorkFlowLog = (res, dataArray) => {
      const resArray = res.body.data.item
      for (let i = 0; i < resArray.length; i++) {
        dataArray.push({
          // 结果
          v0: resArray[i].id,
          v1: resArray[i].checkStatus,
          v2: '审核人:' + resArray[i].checker,
          v3: resArray[i].checkDate,
          v4: resArray[i].checkInfo
        })
      }
    }
    provide('log', getWorkFlowLog)
    provide('logCallback', callBackWorkFlowLog)

    const callbackAudit = () => {
      basic()
      flowPanel.value.refresh()
    }
    const offTop = ref()
    return {
      header,
      title,
      onClickLeft,
      onClickRight,
      openAuditFlow,
      flowPanel,
      checkStatus,
      getWorkFlow,
      callBackWorkFlow,
      getWorkFlowLog,
      callBackWorkFlowLog,
      auditShow,
      callbackAudit,
      offTop,
      offsetTop,
      state
    }
  }
}
</script>

<style scoped>
.detail-title {
  font-size: 18px;
  font-weight: bold;
  display: table-cell;
  vertical-align: middle;
  height: 40px;
  background: white
}

.detail-title-wrap {
  width: 100%;
  display: table;
}

::v-deep(span.van-tab__text.van-tab__text--ellipsis) {
  font-weight: bold;
  font-size: 14px;
  color: #222222;
}

::v-deep(.van-tabs__line) {
  background-color: #2494f2;
  width: 20%;
}

::v-deep(.van-tab--active > span ) {
  color: #2494F2 !important;
}

::v-deep(.van-cell-group__title) {
  padding: 12px;
  text-align: left;
  font-weight: bold;
  color: #999999;
  background: #F7F7F7;
}

::v-deep(.van-cell__title) {
  text-align: left;
  color: #222222;
  font-weight: bold;
}

::v-deep(.van-cell__value) {
  color: #222222;
  font-size: 14px;
}

::v-deep(.van-tabbar-item__text) {
  width: 100%;
}

::v-deep(.van-swipe__track) {
  display: flex;
  height: 100%;
  margin-bottom: 58px;
}
</style>
