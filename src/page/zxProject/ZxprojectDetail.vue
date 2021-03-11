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
        技术是开发它的人的共同灵魂。
      </van-notice-bar>

      <div style="text-align: center">南开大学</div>
    </van-sticky>
    <!--    https://vant-contrib.gitee.io/vant/v3/#/zh-CN/tab-->
    <van-tabs sticky offset-top="106">
      <ep-detail-base/>
      <ep-detail-member/>
      <ep-detail-budget/>
      <ep-detail-document/>
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
    return {
      onClickLeft,
      onClickRight,
      openAuditFlow,
      flowPanel
    }
  }
}
</script>

<style></style>
