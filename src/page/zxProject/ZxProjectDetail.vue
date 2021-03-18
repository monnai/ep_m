<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="纵向项目详情"
        left-text="返回"
        right-text="首页"
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

      <div class="detail-title">南开大学</div>
    </van-sticky>
    <van-tabs sticky offset-top="124">
      <ep-detail-base :request="getBase" :callback="callBackBase"/>
      <ep-detail-member :request="getMember" :callback="callBackMember"/>
      <ep-detail-budget :request="getBudget" :callback="callBackBudget"/>
      <ep-detail-document :request="getDocument" :callback="callBackDocument"/>
    </van-tabs>
    <ep-work-flow-panel ref="flowPanel"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import EpDetailBase from '@/components/EpDetailBase'
import EpDetailMember from '@/components/EpDetailMember'
import EpDetailBudget from '@/components/EpDetailBudget'
import EpDetailDocument from '@/components/EpDetailDocument'
import EpWorkFlowPanel from '@/components/EpWorkFlowPanel'
import { ref } from 'vue'
import { base, member, budget, document } from '@/request/api'

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
      return base('2c908ae873e019360173e0891fd60003')
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
      return member('2c908ae873e019360173e0891fd60003')
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
      return budget('2c908ae873e019360173e0891fd60003')
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
      return document('2c908ae873e019360173e0891fd60003')
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
      callBackDocument
    }
  }
}
</script>

<style scoped>
.detail-title {
  font-size: 18px;
  text-align: center;
  height: 40px;
  background: white
}
</style>
