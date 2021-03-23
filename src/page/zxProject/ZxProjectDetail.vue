<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="纵向项目详情"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon name="wap-home-o" size="18"/>
        </template>
      </van-nav-bar>
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" @click="openAuditFlow">
        审核通过
      </van-notice-bar>
      <div class="detail-title-wrap">
        <div class="detail-title">南开大学</div>
      </div>
    </van-sticky>
    <van-tabs sticky offset-top="2.293339rem" animated swipeable>
      <ep-detail-base :request="getBase" :callback="callBackBase"/>
      <ep-detail-member :request="getMember" :callback="callBackMember"/>
      <ep-detail-budget :request="getBudget" :callback="callBackBudget"/>
      <ep-detail-document :request="getDocument" :callback="callBackDocument"/>
    </van-tabs>
    <!--请求的zxProject接口名能够本地存储或者传递参数，可是因为数据不规范需要特殊处理-->
    <ep-work-flow-panel ref="flowPanel" :request="getWorkFlow" :callback="callBackWorkFlow"
                        :request-log="getWorkFlowLog"
                        :callback-log="callBackWorkFlowLog"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import EpDetailBase from '@/components/EpDetailBase'
import EpDetailMember from '@/components/EpDetailMember'
import EpDetailBudget from '@/components/EpDetailBudget'
import EpDetailDocument from '@/components/EpDetailDocument'
import EpWorkFlowPanel from '@/components/EpWorkFlowPanel'
import { provide, ref } from 'vue'
import { base, member, budget, document, workflow, workflowLog } from '@/request/api'

export default {
  components: {
    EpDetailBase,
    EpDetailMember,
    EpDetailBudget,
    EpDetailDocument,
    EpWorkFlowPanel
  },
  setup () {
    const flowPanel = ref()
    const router = useRouter()
    const onClickLeft = function () {
      router.go(-1)
    }
    const onClickRight = function () {
      router.push('/index')
    }
    const openAuditFlow = function () {
      flowPanel.value.show()
    }
    // 基本
    const getBase = function () {
      return base()
    }
    const callBackBase = (res, resObj) => {
      // 根据业务模块对结果进行分类处理后放入数组
      const resData = res.body.data.dataMap
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
      const items = res.body.data.items
      for (let i = 0; i < items.length; i++) {
        resArray.push({
          v1: items[i].personName,
          v2: items[i].personCode,
          v3: items[i].titleId,
          v4: items[i].bearTypeId
        })
      }
    }

    // 预算
    const getBudget = () => {
      return budget()
    }
    const callBackBudget = (res, resArray) => {
      const items = res.body.data
      for (let i = 0; i < items.length; i++) {
        resArray.push({
          v1: items[i].subjectName,
          v2: items[i].totalFee
        })
      }
    }

    // 文档
    const getDocument = () => {
      return document()
    }

    const callBackDocument = (res, resArray) => {
      const items = res.body.data.items
      for (let i = 0; i < items.length; i++) {
        resArray.push({
          v1: items[i].fileName,
          v2: items[i].lastEditDate,
          v3: items[i].fileId
        })
      }
    }

    const getWorkFlow = () => {
      return workflow()
    }
    const callBackWorkFlow = (res, dataArray) => {
      const resArray = JSON.parse(res.body.data)
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
      const resArray = res.body.data
      for (let i = 0; i < resArray.length; i++) {
        dataArray.push({
          // 结果
          v0: resArray[i].id,
          v1: resArray[i].checkState,
          v2: '审核人:' + resArray[i].checker,
          v3: resArray[i].checkDate,
          v4: resArray[i].checkInfo ? '审核意见：' + resArray[i].checkInfo : '无'
        })
      }
    }
    provide('log', getWorkFlowLog)
    provide('logCallback', callBackWorkFlowLog)
    return {
      onClickLeft,
      onClickRight,
      openAuditFlow,
      flowPanel,
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
      callBackWorkFlowLog
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
</style>
