<template>
  <van-popup teleport="body" v-model:show="state">
    <div class="ep-workflow-panel-wrapper">
      <div class="ep-workflow-panel-title">
        <div style="color: white">学校通过</div>
      </div>
      <div class="ep-workflow-panel-content">
        <div class="van-steps van-steps--vertical">
          <template v-for="flow in flowDataArray" :key="flow.name">
            <div class="van-hairline van-step van-step--vertical van-step--finish">
              <div class="van-step__title"><h3>{{flow.name}}</h3>
                <!--              <p>2016-07-12 12:40</p>-->
              </div>
              <div class="van-step__circle-container"><i class="van-step__circle"></i></div>
              <div class="van-step__line"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="ep-workflow-panel-footer">
        <div class="log-btn-wrapper">
          <van-button type="primary" block @click="openAuditLog()">查看审核记录</van-button>
        </div>
      </div>
    </div>
    <ep-work-flow-log-panel ref="logPanel"/>
  </van-popup>
</template>

<script>
import { ref } from 'vue'
import EpWorkFlowLogPanel from '@/components/EpWorkFlowLogPanel'

export default {
  components: {
    EpWorkFlowLogPanel
  },
  props: {
    request: Function,
    callback: Function
  },
  setup (props) {
    const state = ref(false)
    const show = () => {
      state.value = true
    }
    const logPanel = ref()
    const openAuditLog = () => {
      logPanel.value.show()
    }
    const flowDataArray = ref([])
    const load = () => {
      props.request('2c908ae873e019360173e0891fd60003').then(res => {
        props.callback(res, flowDataArray.value)
      })
    }
    load()
    return {
      state,
      show,
      openAuditLog,
      logPanel,
      flowDataArray
    }
  }
}
</script>

<style scoped>
.ep-workflow-panel-title {
  width: 297px;
  height: 186px;
  background-image: url('../../public/static/image/workflow/bg-blue-audit.png');
}

.ep-workflow-panel-content {
  width: 297px;
  height: 245px;
  overflow: scroll;
}

.ep-workflow-panel-footer {
  width: 297px;
  height: 40px;
}

.ep-workflow-panel-wrapper {
  width: 297px;
  height: 475px;
}
</style>
