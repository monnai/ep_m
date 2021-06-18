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
      <ep-detail-base :request="getBase" :callback="callBackBase" ref="epBase"/>
      <ep-detail-member :request="getMember" :callback="callBackMember"/>
      <ep-detail-budget :request="getBudget" :callback="callBackBudget"/>
      <ep-detail-document :request="getDocument" :callback="callBackDocument"/>
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
import { provide, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { base, member, budget, document, workflow, workflowLog } from '@/request/api'
import { fileTypeFormat } from '@/util/formatUtil'
import EpNoticeBar from '@/components/EpNoticeBar'
import EpDetailBase from '@/components/EpDetailBase'
import EpDetailMember from '@/components/EpDetailMember'
import EpDetailBudget from '@/components/EpDetailBudget'
import EpDetailDocument from '@/components/EpDetailDocument'
import EpWorkFlowPanel from '@/components/EpWorkFlowPanel'
import EpAuditBar from '@/components/EpAuditBar'

export default {
  components: {
    EpNoticeBar,
    EpDetailBase,
    EpDetailMember,
    EpDetailBudget,
    EpDetailDocument,
    EpWorkFlowPanel,
    EpAuditBar
  },
  setup () {
    const title = ref()
    const flowPanel = ref()
    const checkStatus = ref()
    const router = useRouter()
    const auditShow = ref(false)
    const header = sessionStorage.getItem('modelName') + '详情'
    const onClickLeft = function () {
      router.push('xjProject')
    }
    const onClickRight = function () {
      router.push('/index')
    }
    const openAuditFlow = function () {
      flowPanel.value.show()
    }
    const epBase = ref()
    const offsetTop = ref()
    // 基本
    const getBase = function () {
      return base()
    }
    const callBackBase = (res, resObj) => {
      // 根据业务模块对结果进行分类处理后放入数组
      const resData = res.body.data.item
      title.value = res.body.data.title
      nextTick(() => {
        offsetTop.value = offTop.value.$el.offsetHeight
      }
      )
      auditShow.value = res.body.data.isCanCheck
      checkStatus.value = res.body.data.checkstatus
      for (const k in resData) {
        const current = resData[k + '']
        const currentArray = []
        for (let i = 0; i < current.length; i++) {
          const node = {
            key: '',
            value: ''
          }
          node.key = current[i].key
          node.value = current[i].value
          currentArray.push(node)
        }
        resObj[k + ''] = currentArray
      }
    }

    // 成员
    const getMember = () => {
      return member()
    }
    const callBackMember = (res, resArray) => {
      const item = res.body.data.item
      for (let i = 0; i < item.length; i++) {
        resArray.push({
          v1: item[i].personName,
          v2: item[i].personCode,
          v3: item[i].titleId,
          v4: item[i].bearTypeId,
          v5: item[i].sexId
        })
      }
    }

    // 预算
    const getBudget = () => {
      return budget()
    }
    const callBackBudget = (res, resArray) => {
      const item = res.body.data.item
      for (let i = 0; i < item.length; i++) {
        resArray.push({
          v1: item[i].subjectName,
          v2: item[i].totalFee
        })
      }
    }

    // 文档
    const getDocument = () => {
      return document()
    }

    const callBackDocument = (res, resArray) => {
      const item = res.body.data.item
      for (let i = 0; i < item.length; i++) {
        resArray.push({
          v0: item[i].fileId,
          v1: item[i].fileName,
          v2: item[i].lastEditDate,
          v3: fileTypeFormat(item[i].fileName)
        })
      }
    }

    const getWorkFlow = () => {
      return workflow()
    }
    const callBackWorkFlow = (res, dataArray) => {
      const resArray = JSON.parse(res.body.data.item)
      for (let i = 0; i < resArray.length; i++) {
        dataArray.push({
          name: resArray[i].role,
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
      epBase.value.refresh()
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
      getBase,
      callBackBase,
      getMember,
      callBackMember,
      getBudget,
      callBackBudget,
      getDocument,
      callBackDocument,
      getWorkFlow,
      callBackWorkFlow,
      getWorkFlowLog,
      callBackWorkFlowLog,
      auditShow,
      callbackAudit,
      epBase,
      offTop,
      offsetTop
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
</style>
