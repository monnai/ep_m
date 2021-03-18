<template>
  <van-popup teleport="body" v-model:show="state">
    <div class="ep-workflow-panel-wrapper">
      <div class="ep-workflow-panel-icon">
        <img src="xx"/>
        <div>{{学校通过}}</div>
      </div>
      <!--      <div class="ep-workflow-panel-content">-->
      <!--        <van-steps direction="vertical" :active="3">-->
      <!--          <van-step>-->
      <!--            <h3>【城市】物流状态1</h3>-->
      <!--            <p>2016-07-12 12:40</p>-->
      <!--          </van-step>-->
      <!--          <van-step>-->
      <!--            <h3>【城市】物流状态2</h3>-->
      <!--            <p>2016-07-11 10:00</p>-->
      <!--          </van-step>-->
      <!--          <van-step>-->
      <!--            <h3>快件已发货</h3>-->
      <!--            <p>2016-07-10 09:30</p>-->
      <!--          </van-step>-->
      <!--        </van-steps>-->
      <!--      </div>-->
      <div class="van-steps van-steps--vertical">
        <div class="van-steps__items">
          <div class="van-hairline van-step van-step--vertical van-step--finish">
            <div class="van-step__title"><h3>【城市】物流状态1</h3>
              <p>2016-07-12 12:40</p></div>
            <div class="van-step__circle-container"><i class="van-step__circle"></i></div>
            <div class="van-step__line"></div>
          </div>
          <div class="van-hairline van-step van-step--vertical van-step--finish">
            <div class="van-step__title"><h3>【城市】物流状态2</h3>
              <p>2016-07-11 10:00</p></div>
            <div class="van-step__circle-container"><i class="van-step__circle"></i></div>
            <div class="van-step__line"></div>
          </div>
          <div class="van-hairline van-step van-step--vertical van-step--finish">
            <div class="van-step__title"><h3>快件已发货</h3>
              <p>2016-07-10 09:30</p></div>
            <div class="van-step__circle-container"><i class="van-step__circle"></i></div>
            <div class="van-step__line"></div>
          </div>
        </div>
      </div>
      <div class="log-btn-wrapper">
        <van-button type="primary" block @click="openAuditLog()">登录</van-button>
      </div>
    </div>
    <ep-work-flow-log-panel ref="logPanel"/>
  </van-popup>
</template>

<script>
import { ref } from 'vue'
import EpWorkFlowLogPanel from '@/components/EpWorkFlowLogPanel'
import { workflow } from '@/request/api'

export default {
  components: {
    EpWorkFlowLogPanel
  },
  setup () {
    const state = ref(false)
    const show = () => {
      state.value = true
    }
    const logPanel = ref()
    const openAuditLog = () => {
      logPanel.value.show()
    }
    const load = () => {
      workflow('2c908ae873e019360173e0891fd60003').then(res => {
        console.log(res)
      })
    }
    load()
    return {
      state,
      show,
      openAuditLog,
      logPanel
    }
  }
}
</script>

<style>
.ep-workflow-panel-wrapper {
  width: 297px;
  height: 475px;
}
</style>
